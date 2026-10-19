# Manual deployment and rollback

This runbook deploys the already-built GHCR images to the Lightsail host. It does not build images, change AWS settings, or delete/recreate PostgreSQL or Caddy volumes.

## Before deploying

1. Confirm GitHub Actions passed for the target commit on `master` and that both public GHCR images exist with the exact full commit SHA tag.
2. Record the currently deployed full SHA as `PREVIOUS_SHA` in your private notes. The currently verified release is `ca5994c44dae0427ea08e03cae5ed0c08cc664bb`; verify the actual running release before relying on it as rollback target.
3. Update the server checkout to the reviewed repository revision containing `scripts/deploy.sh` and this runbook. In the server terminal:

   ```bash
   cd /home/ubuntu/industrial-trend-explorer
   git status --short
   git pull --ff-only origin master
   ```

   Stop if the working tree is not clean or the pull cannot fast-forward. Do not overwrite local changes.
4. Confirm `.env.production` exists in this directory, is owned by `ubuntu`, writable only as appropriate, and remains private/untracked. The script requires exactly one `APP_VERSION` entry and validates the required `DB_PASSWORD` and `SITE_DOMAIN` values through Compose without printing resolved configuration or secrets. It prepares a mode-600 temporary copy that changes only `APP_VERSION`; the original env file is not changed unless the deployment and readiness checks succeed. `LLM_MODE` defaults to `mock` as defined by Compose if it is absent.
5. If GHCR packages are private, authenticate before deployment using your approved credentials without putting a token in shell history. Public packages need no registry login.
6. Write down the current SHA before proceeding. Do not deploy during an unplanned database migration.
7. The script asks `sudo` to authenticate once, then runs only Docker commands through `sudo`. It does not require adding `ubuntu` to the Docker group or running the whole script as root.

## Deploy a release

Replace the example SHA with the exact full SHA whose CI and GHCR tags you verified:

```bash
cd /home/ubuntu/industrial-trend-explorer
./scripts/deploy.sh 0123456789abcdef0123456789abcdef01234567
```

The script checks the SHA format, required files, Docker Compose, and the production Compose configuration. It then pulls only the backend and frontend images tagged with that SHA, and starts those services with `docker compose up -d --no-build`. Compose starts dependencies as needed. The script confirms `db`, `backend`, and `web` are running and checks that PostgreSQL accepts connections.

The script runs `sudo -v` once so you can enter your Ubuntu password if prompted, then invokes each Docker command with `sudo`. You do not need to run the script itself with `sudo`, and you should not add your account to the Docker group just for this script.

`--no-build` prevents building application images on Lightsail. Docker Compose receives the requested SHA explicitly, so it selects the matching `ghcr.io/mrrrxiii/industrial-trend-api:<SHA>` and `ghcr.io/mrrrxiii/industrial-trend-web:<SHA>` images even if the existing `.env.production` still records the previous version. Only after Compose reports all services running and PostgreSQL is ready does the script atomically replace `APP_VERSION` in `.env.production`. All other environment lines are copied unchanged; the replacement file is restricted to mode 600. Later Compose commands should continue to use `--env-file .env.production` to select the recorded version.

The script does not run `docker compose down`, `docker compose down -v`, `docker volume rm`, or any migration command. The named `postgres_data`, `caddy_data`, and `caddy_config` volumes remain in place.

After the script succeeds, run the public read-only acceptance test from a trusted computer that has Node.js installed:

```bash
node scripts/production-smoke-test.mjs https://industrial-trend-explorer.duckdns.org
```

Check that the script reports no failures. If the public smoke test fails, use the rollback procedure below and rerun the same test. The smoke test intentionally does not invoke the explanation endpoint.

## Roll back to a known-good release

Use only the full SHA recorded before deployment. For the currently verified version, the supplied SHA is `ca5994c44dae0427ea08e03cae5ed0c08cc664bb`; confirm it is still the intended known-good release before use.

```bash
cd /home/ubuntu/industrial-trend-explorer
./scripts/deploy.sh ca5994c44dae0427ea08e03cae5ed0c08cc664bb
```

The same script pulls and starts the old backend and frontend images, and after its readiness checks saves that rollback SHA into `.env.production`. Thus later Compose commands using the env file continue to select the restored version. If the new deployment failed before those checks, the original env file still records the previous SHA; explicitly run the rollback command to restore the old containers as well. PostgreSQL and Caddy volumes are not removed. Then rerun the public smoke test and inspect service status:

```bash
sudo docker compose --env-file .env.production -f compose.prod.yaml ps
```

If rollback does not restore service, stop and inspect logs before making further changes:

```bash
sudo docker compose --env-file .env.production -f compose.prod.yaml logs --tail=100 backend web db
```

## Important database limitation

An image rollback only changes application containers. It does **not** reverse a database schema migration or restore deleted/changed database data. The current Compose seed/schema scripts run when PostgreSQL first initializes its data directory; future application changes may introduce other schema changes. Before any release that changes schema, make and verify a database backup and plan a compatible migration/rollback. Never delete the PostgreSQL volume as a rollback step.
