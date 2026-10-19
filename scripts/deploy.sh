#!/usr/bin/env bash
set -Eeuo pipefail

usage() {
  echo "Usage: $0 <full-40-character-lowercase-git-sha>" >&2
  exit 2
}

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

[[ $# -eq 1 ]] || usage
version=$1
[[ "$version" =~ ^[0-9a-f]{40}$ ]] || fail "Provide a full 40-character lowercase Git commit SHA."

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repo_root=$(cd -- "$script_dir/.." && pwd)
cd "$repo_root"

compose_file="$repo_root/compose.prod.yaml"
env_file="$repo_root/.env.production"
staged_env_file=""

[[ -f "$compose_file" ]] || fail "compose.prod.yaml was not found."
[[ -f "$env_file" && ! -L "$env_file" && -r "$env_file" && -w "$env_file" && -O "$env_file" ]] \
  || fail ".env.production must be a readable, writable regular file owned by the current user."
[[ -w "$repo_root" ]] || fail "The repository directory must be writable to update .env.production safely."
git check-ignore -q .env.production \
  || fail ".env.production is not protected by a Git ignore rule."
if git ls-files --error-unmatch .env.production >/dev/null 2>&1; then
  fail ".env.production is tracked by Git; stop and protect the environment file."
fi
app_version_count=$(awk '/^APP_VERSION=/ { count++ } END { print count + 0 }' "$env_file")
[[ "$app_version_count" -eq 1 ]] || fail ".env.production must contain exactly one APP_VERSION entry."
command -v docker >/dev/null 2>&1 || fail "Docker is not installed or is not on PATH."
command -v sudo >/dev/null 2>&1 || fail "sudo is not installed or is not on PATH."

staged_env_file=$(mktemp "$env_file.tmp.XXXXXX") \
  || fail "Could not prepare a private environment file for this deployment."
cleanup() {
  if [[ -n "$staged_env_file" && -e "$staged_env_file" ]]; then
    rm -f -- "$staged_env_file"
  fi
}
trap cleanup EXIT

if ! awk -v version="$version" '
  /^APP_VERSION=/ {
    count++
    print "APP_VERSION=" version
    next
  }
  { print }
  END {
    if (count != 1) exit 1
  }
' "$env_file" > "$staged_env_file"; then
  fail "Could not prepare the requested APP_VERSION."
fi
chmod 600 "$staged_env_file"

sudo -n env APP_VERSION="$version" docker compose version >/dev/null \
  || fail "Non-interactive sudo access to Docker Compose is unavailable; no containers were changed."

compose() {
  sudo -n env APP_VERSION="$version" docker compose \
    --env-file "$staged_env_file" -f "$compose_file" "$@"
}

echo "Validating production Compose configuration for image SHA $version..."
compose config --quiet || fail "Compose configuration is invalid; no containers were changed."

echo "Pulling the matching backend and frontend images..."
compose pull backend web || fail "Image pull failed; running containers were not updated."

echo "Starting backend and frontend with prebuilt images..."
compose up -d --no-build backend web || fail "Compose could not start the requested services."

echo "Checking that all production services are running..."
compose ps
running_services=$(compose ps --status running --services)
for service in db backend web; do
  if ! grep -Fqx -- "$service" <<<"$running_services"; then
    fail "Service '$service' is not running. Review 'docker compose ps' and logs."
  fi
done

echo "Checking PostgreSQL readiness..."
compose exec -T db pg_isready -U app -d industrial_trends >/dev/null \
  || fail "PostgreSQL is not accepting connections."

echo "Saving the deployed SHA to .env.production..."
mv -- "$staged_env_file" "$env_file" \
  || fail "Services are running, but .env.production could not be updated; rerun with the intended SHA."
staged_env_file=""

echo "Deployment containers are running for image SHA $version."
echo "APP_VERSION has been saved in .env.production."
echo "From a trusted computer, run:"
echo "  node scripts/production-smoke-test.mjs https://industrial-trend-explorer.duckdns.org"
