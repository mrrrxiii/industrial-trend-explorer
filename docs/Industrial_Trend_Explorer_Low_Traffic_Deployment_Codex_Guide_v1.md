# Industrial Trend Explorer: Low-Traffic Portfolio Deployment Guide

**Version:** 1.0  
**Prepared:** 2026-10-18  
**Project:** https://github.com/mrrrxiii/industrial-trend-explorer  
**Target branch:** `master`  
**Audience:** A backend engineer learning to deploy a React/TypeScript + Spring Boot + PostgreSQL portfolio project.  
**Use case:** Very few visits; public, dependable demo link for recruiters and hiring managers.  
**Approach:** Tutorial first; Codex implements one small lesson at a time, with explanation and verification.

> **Goal:** A recruiter can open an HTTPS URL, use the existing dashboard without an account, switch the 1H/6H/24H time range, and see a functioning backend/database. Keep the site modest, inexpensive, safe, and explainable in interviews.
>
> **Not the goal:** A scalable industrial monitoring product, a production SLA, high availability, streaming data, or deep platform engineering.

---

## 0. Decisions you should not revisit during this guide

| Decision | Choice | Why |
|---|---|---|
| Compute | **One AWS Lightsail Linux VM, 2 GB RAM / 60 GB SSD, public IPv4** | Approximately **US$12/month** (before tax / other charges), simple and always on. |
| Platform | Ubuntu LTS, Docker Engine + Docker Compose plugin | Familiar Linux skills, reproducible containers. |
| Application | Existing React/TypeScript + Spring Boot (Java 25) | No rewrite. |
| Database | Existing PostgreSQL 17, container and named Docker volume on the same VM | Very small seeded dataset; no managed database required. |
| Web | Caddy container serving compiled Vite assets and forwarding `/api/*` to Spring Boot | One origin, HTTPS handled automatically. |
| Hostname | **A free DuckDNS subdomain** pointing to Lightsail static IPv4 | No domain purchase required; exact name chosen by owner at setup. |
| AI | `LLM_MODE=mock` for the public site | No surprise Gemini billing, no exposed key. Existing labeled mock behavior remains honest. |
| Build | GitHub Actions produces backend and frontend images, uploads to GHCR | Avoid resource-intensive Java/Node builds on a 2 GB VM. |
| Release | **Manual, repeatable server deploy** after CI passes; optional gated automated CD later | Smallest safe first version; no globally exposed GitHub Actions SSH deployment key necessary. |
| Data | Synthetic fixed sample readings; PostgreSQL initialization on first volume creation | No personal/user data or real sensors. |
| Operations | Container restart policies, logs, basic health check, AWS cost alert | Enough for a showcase. |

**Do not add:** Kubernetes/EKS, Redis, Kafka, load balancer, RDS, Terraform, CloudWatch dashboards, Prometheus/Grafana, monitoring subscriptions, custom login, payment flow, dynamic sensor ingestion, heavy UI features. These would increase cost and implementation time without strengthening this specific use case enough.

### Real cost expectations

- AWS lists **$12 USD/month** for the 2 GB Linux public-IPv4 Lightsail instance bundle. This is *not* a guaranteed total bill. Taxes, backups/snapshots, excess usage and other optional resources may add charges.
- One **attached** Lightsail static IP has no extra charge, but detached static IPs can be charged.
- DuckDNS is free; Caddy's normal public HTTPS certificates are free.
- You must create an AWS billing budget/alert. **An alert does not stop resources or hard-cap spending.**
- **RAM fit is not yet proven.** The 2 GB plan is a cost-conscious starting point, not a performance guarantee. If measured memory shows instability, adjust container/JVM limits based on logs; only consider the 4 GB plan after evidence.
- Do not stop the instance just to avoid a charge without checking Lightsail billing rules; **delete the instance and other billable resources** when you permanently retire the demo.

Official pricing: https://aws.amazon.com/lightsail/pricing/  
Lightsail static IP docs: https://docs.aws.amazon.com/lightsail/latest/userguide/understanding-static-ip-addresses-in-amazon-lightsail.html  
Caddy HTTPS: https://caddyserver.com/docs/automatic-https  
DuckDNS: https://www.duckdns.org/

---

## 1. What exists in the repository now (verified on 2026-10-18)

| Existing path | Verified responsibility | What deployment changes |
|---|---|---|
| `compose.yaml` | Local PostgreSQL 17; DB is mapped to **127.0.0.1:55432**; dev-only password. | **Keep unchanged** for local development. Create a separate `compose.prod.yaml`. |
| `backend/pom.xml` | Spring Boot **4.1.1**, Java **25**, JDBC PostgreSQL, web MVC, Gemini SDK. | Add a backend Dockerfile; do not downgrade Java. |
| `backend/src/main/resources/application.properties` | `DB_URL`, `DB_USER`, `DB_PASSWORD`; mock LLM by default. | Production variables are injected through Compose. No hardcoded prod password. |
| `frontend/package.json` | React 19, TypeScript 6, Vite 8, Recharts; `npm run build`, `npm test`, `npm run lint`. | Add multi-stage frontend Dockerfile; serve built `dist` with Caddy, **not** `vite dev`. |
| `frontend/vite.config.ts` | `/api` proxy to localhost:8080 **only for the Vite dev server**. | Preserve dev behavior; production web server proxies `/api` to the backend container. |
| `db/schema.sql`, `db/seed.sql` | Two sensors and historical, synthetic sample data, idempotent inserts. | Mount as `01-schema.sql` and `02-seed.sql` in PostgreSQL's first-run init directory. |
| `.github/workflows/ci.yml` | Java 25 backend test; Node 24 lint/test/build on pushes/PRs. | Preserve checks; add a separate image publication workflow gated to `master`, or carefully extend CI with correct dependencies. |
| `README.md` | Existing usage, synthetic-data disclosure, time-window details, Gemini mock/live labels. | Add live URL, architecture, deployment notes, limitations and screenshot. |

The README currently records 13 passing backend tests and 14 frontend tests. These are **historical repo claims**, not evidence that a new cloud deployment is already working; rerun them.

**Do not invent routes, package names, method signatures, or secrets.** Codex must inspect current files and tests before implementing, and use only paths/endpoints actually found.

---

## 2. Target architecture and request flow

```text
A hiring manager's browser
          |
          | HTTPS (443)
          v
Free DuckDNS name  ->  Lightsail static IPv4
          |
          v
AWS Lightsail: Ubuntu, 2 GB RAM
  |
  +-- Docker: Caddy + compiled React/TypeScript assets
  |       |-- GET /          -> React static files
  |       |-- GET /assets/*  -> JS and CSS files
  |       `-- /api/*        -> Spring Boot backend:8080
  |
  +-- Docker: Java 25 + Spring Boot (internal port 8080)
  |       `-- JDBC -> PostgreSQL on internal network
  |
  `-- Docker: PostgreSQL 17 (internal port 5432)
          `-- Docker named volume, initialized with schema + seed

GitHub Actions (remote build machine)
  -> Java/Node tests
  -> Docker build for backend and web
  -> GitHub Container Registry (GHCR)

You (first deployment and upgrades)
  -> SSH to Lightsail
  -> pull approved image tags
  -> docker compose up -d
  -> live smoke test
```

**Important networking rule:** Only **80 and 443** are public for the web. Port **5432** and **8080** must not be exposed via Lightsail firewall or Docker host `ports:` mappings. Restrict port **22** to your own IP for manual administration.

**Request principle:** React calls relative paths such as `/api/...`. The Caddy reverse proxy forwards them to `backend:8080` on Docker's private network. No public CORS configuration is necessary for this one-origin design.

---

## 3. Codex working contract (paste first in a new Codex session)

```text
Work in https://github.com/mrrrxiii/industrial-trend-explorer, branch master.
Your assignment is ONLY the low-traffic portfolio deployment described by this guide.

Rules:
1. First inspect the real code and existing tests. Never assume file paths,
   endpoints, dependency versions, or behavior.
2. Work on exactly ONE lesson from this guide per request; do not implement
   later lessons on your own.
3. Before coding, explain (a) current behavior, (b) why this lesson is needed,
   (c) a minimal implementation plan, and (d) what I will learn.
4. Make the smallest correct change. Keep local development working.
5. After coding, show exact changed files, run appropriate checks, report
   actual outputs, and explain the result to a cloud-deployment beginner.
6. If you cannot run a check, say NOT VERIFIED. Do not claim success.
7. Never create real cloud resources, spend money, change AWS billing,
   register DNS, or publish anything without me doing/approving the action.
8. Do not commit secrets, private SSH keys, access tokens, or real .env files.
9. Preserve Spring Boot 4.1.1 / Java 25 / React/TypeScript / PostgreSQL 17
   unless an observed problem requires a narrowly scoped change.
10. Do not introduce Kubernetes, Terraform, RDS, user authentication,
    monitoring platforms, or extra application features.
11. End every lesson with: explanation, files changed, verification results,
    one key concept, and STOP. Wait for my next lesson number.
```

**Workflow:** Copy one lesson prompt below, run it in Codex, inspect the diff, run its acceptance checks, and only then move to the next lesson. Keep commits small and meaningful.

---

## 4. Lessons and checkpoints

### Phase A: Prepare a reproducible production build (local work, no AWS spending)

### Lesson 01 — Inventory and local baseline

**Learn:** Local development vs production, what CI proves, how environment variables work.

**Codex prompt:**

```text
Lesson 01. Read README.md, compose.yaml, .env.example, backend/pom.xml,
backend/src/main/resources/application.properties, frontend/package.json,
frontend/vite.config.ts, db/*.sql, .github/workflows/ci.yml, and relevant API
controllers/tests. Do NOT modify files. Give me:
(a) the actual current architecture,
(b) real API paths used by the frontend,
(c) exact existing checks and commands,
(d) a deployment risk list for a 2 GB Lightsail server,
(e) any differences from this guide. STOP.
```

**Verify:** On your own machine, run `cd backend && ./mvnw test`, then from root run `npm --prefix frontend run lint`, `npm --prefix frontend test`, `npm --prefix frontend run build`. Record actual outputs. If tests fail, fix the existing issue before deployment.

**Exit condition:** Current app and CI behavior are understood; no production changes made.

### Lesson 02 — Backend Dockerfile

**Learn:** Container image, multi-stage build, build-time versus runtime JDK/JRE, Spring Boot fat JAR.

**Codex prompt:**

```text
Lesson 02. Create the smallest backend Dockerfile for the verified Java 25
Spring Boot Maven project. Build the JAR in a builder stage and copy only
runtime artifacts to a Java 25 JRE image. Do not compile on Lightsail.
Create a useful .dockerignore for the backend. Do not modify Java business
logic. Build the image locally, inspect image size, and show how to run it
with temporary local DB environment values. Explain each Dockerfile line.
Stop when done.
```

**Checks:** Backend Docker build succeeds; actual startup is verified against the development Postgres when feasible. Never use `localhost` inside the backend container to reach a different container. Docker images can be built on GitHub Actions if local tools are missing.

### Lesson 03 — Frontend production image with Caddy

**Learn:** `npm ci`, static asset compilation, why `vite dev` is not production, reverse proxy.

**Codex prompt:**

```text
Lesson 03. Create a minimal multi-stage frontend Dockerfile: Node 24 builds
Vite/TypeScript, Caddy serves the compiled assets. Add a Caddyfile that
serves React as a single-page application AND forwards existing /api paths
to backend:8080 without stripping the /api prefix. Inspect the actual
frontend API calls first. Add a frontend .dockerignore. Preserve vite.config.ts
for local development. Explain why React's Vite proxy is not used in a
compiled production site. Show build and Caddy configuration checks. STOP.
```

**Routing acceptance:** `/` loads the app; `/assets/...` returns assets; actual `/api/...` routes reach backend; non-API frontend routes fall back to `index.html` if needed. API requests must **not** be rewritten into HTML.

### Lesson 04 — Separate production Docker Compose

**Learn:** Private container network, service names, named volumes, `depends_on`, health checks, restart policy, secrets.

**Codex prompt:**

```text
Lesson 04. Keep compose.yaml untouched. Add compose.prod.yaml for exactly
three services: db (postgres:17), backend (Java image), web (Caddy image).
Use only image tags as deploy inputs, never build from source on Lightsail.
Expose 80/443 only on web; no host ports for db or backend. Use a named
Postgres data volume and persistent Caddy data/config volumes. Supply
DB_URL=jdbc:postgresql://db:5432/industrial_trends, DB_USER=app,
DB_PASSWORD from a required non-committed environment variable, and
LLM_MODE=mock. Add a db readiness probe and reasonable restart policies.
Add .env.production.example containing variable names and descriptions,
not real secrets. Explain every field and run docker compose config.
Do not start cloud resources. STOP.
```

**Resource budget starting point, not a proven fit:** consider `-Xms128m -Xmx512m` for Java, about 900 MB container memory ceiling for backend, ~512 MB for Postgres, ~128 MB for Caddy, leaving room for Ubuntu/Docker. Codex must confirm the selected Compose resource options work and explain that Java heap is only part of process memory. Do not claim 2 GB is adequate before measuring.

**Important:** Do not use the existing development password `local_dev_only` on the server. Generate a real random secret on the server (`openssl rand -hex 32`) and store it only in a `chmod 600` environment file ignored by Git.

### Lesson 05 — First-boot database initialization

**Learn:** Initialization scripts vs normal startup, idempotence, Docker volume lifecycle.

**Codex prompt:**

```text
Lesson 05. Inspect db/schema.sql and db/seed.sql. In compose.prod.yaml,
mount them read-only under /docker-entrypoint-initdb.d/ with numeric
prefixes so schema executes before seed on a BRAND NEW PostgreSQL data
volume. Confirm both scripts are idempotent. Document the crucial fact:
Postgres entrypoint runs them only when the data directory is empty.
Do not run destructive commands against existing volumes. Verify on a
throwaway local test volume and document the real row counts. STOP.
```

**Safety:** `docker compose down -v` deletes volumes and must **never** be in normal release instructions. This app's current data is synthetic; destructive test resets are permitted only against explicitly disposable local test volumes.

### Lesson 06 — Local production-shaped smoke test

**Learn:** End-to-end networking, readiness, HTTP response checking, browser validation.

**Codex prompt:**

```text
Lesson 06. Add the smallest documented way to run the production-shaped
Compose stack on my local machine in HTTP mode (no real public certificate)
without modifying dev compose.yaml. Choose the minimal safe config override
if needed. Use local environment values that cannot be confused with
production secrets. Test Caddy -> backend -> Postgres with the ACTUAL
existing endpoints, validate 1H/6H/24H and an invalid range (HTTP 400),
check the frontend and Gemini mock label. Report actual results. STOP.
```

**Exit condition for Phase A:** Backend and frontend images build; tests pass; DB initializes and persists across restarts; API works through Caddy; `.env` is not in Git.

---

### Phase B: Get an inexpensive always-on public URL

### Lesson 07 — AWS cost/safety checklist (manual browser steps)

**Learn:** Cloud billing, region, Lightsail instance, minimal public ports.

**User performs in AWS console:**

1. Create/verify AWS account security, including MFA.
2. Set up an AWS monthly budget and email alert **before launching**. Choose the budget amount based on your own maximum comfortable spend; do not treat the budget as a hard cap.
3. Open https://lightsail.aws.amazon.com/ and select a region. Choose one near your expected audience, noting that prices and resource availability can vary by region.
4. Create **one Ubuntu LTS Lightsail Linux instance**, 2 GB / 60 GB, **public IPv4** package. Do not select a Windows image, database service, container service, load balancer, snapshot schedule, or extra VM.
5. Connect using Lightsail's browser SSH client; verify OS and free memory (`lsb_release -a`, `free -h`, `df -h`).
6. Create and **attach** one Lightsail static IPv4 address to the instance.
7. Configure Lightsail IPv4 firewall: TCP 80 to public; TCP 443 to public; TCP 22 only from your current trusted IP when using direct SSH; do not open TCP 8080 or 5432. Review any IPv6 rules too.
8. Record actual region, VM plan, static IP, and monthly estimated cost locally. Do not put personal AWS account information in the public README.

**Codex prompt:**

```text
Lesson 07. I will operate AWS manually. Do not use AWS APIs or create
resources. Explain the exact console steps to establish one Lightsail
Ubuntu 2 GB VM, one attached static IPv4, a billing alert, and minimal
firewall rules. Check my pasted observations and explain any discrepancy.
Do not invent my public IP or account settings. STOP.
```

**Exit condition:** VM is running; you can access it via Lightsail console SSH; cost and firewall are understood.

References:  
https://docs.aws.amazon.com/lightsail/latest/userguide/lightsail-create-static-ip.html  
https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-firewall-rules-reference.html

### Lesson 08 — Docker and host basics

**Learn:** OS packages, Docker Engine, Compose plugin, daemon, least-privilege operations.

**Codex prompt:**

```text
Lesson 08. My host is a newly created Ubuntu Lightsail VM. Show the current
official Docker Engine + Compose-plugin installation steps for its ACTUAL
Ubuntu version (verify before recommending a repository). Use official Docker
documentation, not a random install script. Explain commands and have me
run them one by one. Confirm docker --version, docker compose version,
free -h and df -h. Explain Docker group security (effectively root access).
Do not install Java or Node on this VM. STOP.
```

**Required result:** Docker Engine and `docker compose` work. The server must **pull built images**, never run `mvn package` / `npm build` during deployment.

Official docs: https://docs.docker.com/engine/install/ubuntu/

### Lesson 09 — Free hostname and HTTPS

**Learn:** Public IPv4, DNS A records, HTTPS certificates, TLS termination.

**User performs:**

1. Visit https://www.duckdns.org/ and register an **available** subdomain. No fixed name is assumed.
2. Set its IPv4 address to the **actual attached Lightsail static IP**. No repeated updater is necessary while that static IP remains unchanged.
3. Confirm its DNS A record resolves to your static IP using `dig` or `nslookup`.
4. Store the **actual hostname** in the VM's private `.env` file, under `SITE_DOMAIN`.
5. Ensure both 80 and 443 are reachable from the internet before asking Caddy to issue a certificate.

**Codex prompt:**

```text
Lesson 09. Explain free DuckDNS name setup, DNS A lookup, Caddy automatic
HTTPS, and the Caddy data volume used to retain certificates. Inspect my
actual selected hostname and DNS result; do not invent a domain. Make sure
the Caddyfile receives SITE_DOMAIN as an environment variable and that the
production Compose uses it. Explain how to verify HTTPS without bypassing
certificate checks. STOP.
```

**Success:** Visiting the actual `https://` domain works with a browser-trusted certificate, without using `-k` or ignoring TLS validation. Certificate issuance may fail until DNS propagation, firewall and ACME restrictions are resolved; report these transparently.

### Lesson 10 — Publish two release images to GitHub Container Registry

**Learn:** CI vs CD, container registries, immutable tags, software supply chain basics.

**Codex prompt:**

```text
Lesson 10. Preserve the existing .github/workflows/ci.yml checks.
Add the smallest safe GitHub Actions workflow (or gated extension) that,
ONLY for master after successful backend and frontend checks, builds two
Linux amd64 images from the backend and frontend Dockerfiles and publishes
them to GHCR using GITHUB_TOKEN with least-required packages:write.
Tag images by Git commit SHA; do not rely on 'latest' for deployment.
Use repo-scoped metadata and GitHub's documented Docker Actions. Do not
publish secrets inside image layers or Git logs. Explain how to inspect
package visibility; if the packages are private, explain authentication
required before the server can pull. Show completed Actions checks. STOP.
```

**Specific edge case:** Lightsail architecture matters. If VM is x86_64/amd64, publish `linux/amd64` images. If Arm64 is selected, choose matching image architecture or a correctly configured multi-architecture build. **Check** `uname -m` rather than guessing.

**User confirms manually:** GitHub Actions shows green checks; images exist under `ghcr.io/...`, tags match the commit SHA; choose public package visibility only if you intentionally want unauthenticated pulls (no sensitive image contents). Public GitHub source does not automatically make package visibility public.

Official docs: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

### Lesson 11 — First deploy, performed explicitly by you

**Learn:** Reproducible releases, secret handling, configuration separation, container lifecycle.

**Codex prompt:**

```text
Lesson 11. Write a minimal docs/deployment-runbook.md for deployment of
APP_VERSION=<the verified Git SHA> onto the Lightsail VM. Include:
- safely obtaining the public repository's current config files;
- a private environment file with actual DB_PASSWORD, SITE_DOMAIN,
  APP_VERSION, and LLM_MODE=mock (never commit or print secret values);
- docker compose --env-file ... -f compose.prod.yaml config validation;
- docker compose pull and up -d without --build;
- docker compose ps/logs, resource usage and HTTP checks;
- restart and recovery steps.
Give commands appropriate to the ACTUAL VM user/directory and images.
Do not run remote commands yourself. STOP.
```

**Critical:** On the server, the first `docker compose up -d` creates persistent Postgres and Caddy volumes. A normal deploy only pulls/recreates app containers. Never replace volumes automatically. Do not put the database password in commit history, Actions logs, or a Dockerfile.

**Validate resource fit on the actual 2 GB instance:**

```bash
docker compose --env-file .env -f compose.prod.yaml ps
docker stats --no-stream
free -h
df -h
```

If logs show container kills/OOM, identify memory consumers before changing limits or VM size. Java heap `-Xmx` is not the same as total RSS memory. **Stop claiming 2 GB works until the real measured outcome is stable.**

### Lesson 12 — External acceptance test (not just 'container is running')

**Learn:** Public URL verification, negative-path testing, observability through logs.

**Codex prompt:**

```text
Lesson 12. Create a concise public-demo smoke-test checklist and minimal
script that accepts the REAL HTTPS URL. Inspect the actual API routes
instead of inventing endpoints. Test:
1) site over HTTPS without SSL errors;
2) page loads with JS and CSS;
3) both existing sensors;
4) 1H, 6H and 24H behavior and corresponding API data;
5) unsupported 'hours' returns HTTP 400;
6) backend and DB are really connected;
7) AI explanation explicitly labeled mock;
8) mobile browser viewport and refresh;
9) restarted containers still retain seeded DB rows;
10) no raw secrets exposed in page, HTML, JS bundle or repo.
Show actual evidence and classify each check PASS / FAIL / NOT TESTED.
STOP.
```

**Exit condition for Phase B:** A person outside your local network can open the public HTTPS URL cold, see useful data and use the existing controls; memory and error logs are acceptable. **This is the primary deliverable.**

---

### Phase C: Make updates safe and portfolio-ready

### Lesson 13 — Safe redeployment and rollback

**Learn:** Git SHA image tags, deployment scripts, change control, rollback boundaries.

**Codex prompt:**

```text
Lesson 13. Write a tiny deploy.sh (or short commands) for the Lightsail VM
which requires an explicit image tag, checks required vars, pulls the
specified image versions, starts Compose without deleting volumes, and
checks service health. Document how to roll back to the previous known-good
commit SHA, including that a database schema change may prevent rollback.
Never run docker compose down -v. Keep it readable for a learner. STOP.
```

**Pass:** You can explain which Git SHA is live, repeat deploy after a small change, and return to prior working images if compatible.

### Lesson 14 — Github README and job-search presentation

**Learn:** Documenting an actual system without exaggerating its maturity.

**Codex prompt:**

```text
Lesson 14. After I provide the actual verified public URL, update README.md
with the real Live Demo link, a simple text architecture diagram, tech
stack, local run instructions, CI verification, deployment summary, and
synthetic-data / mock-AI disclosures. Keep claims factual. Put the live
link near the top. Do not claim EKS, managed DB, zero downtime, high
availability, streaming sensors, production AI, or fully automated CD.
Explain where to set GitHub repository About > Website/Description/Topics.
STOP.
```

**Suggested truthful resume wording, only after verified deployment:**

> Built and deployed an interactive sensor analytics portfolio application using Java 25, Spring Boot, PostgreSQL, React, and TypeScript, with configurable time-window analysis and a public HTTPS demo on AWS Lightsail.  
> Containerized the application with Docker Compose and implemented GitHub Actions test/build pipelines with versioned container images, plus a repeatable release procedure.

Only add “automated deployment” once an actual fully automated deployment pipeline exists and works. Keep project experience under **Projects**, not Amdocs **Professional Experience**.

### Lesson 15 — Final cost, security and maintenance check

**Learn:** What lightweight operations actually mean for a tiny public site.

**Codex prompt:**

```text
Lesson 15. Review only this deployment's real security and operations
posture. Verify no public DB or backend port, no production secret in Git,
HTTPS works, SSH exposure is restricted, restart policies exist, disk and
RAM have room, and billing alert is configured. Propose only fixes required
by actual findings, not generic enterprise infrastructure. Create a short
monthly checklist and retirement procedure. STOP.
```

**Lightweight maintenance checklist:** once a month, manually open the live URL and click its controls; glance at AWS billing, Lightsail metrics and `docker compose ps`; ensure disk space is healthy and base images/security patches are not neglected. Never assume a cost alert guarantees a ceiling.

---

## 5. Optional only after the public link is working

**Optional A — Small full-stack POST feature:** A custom threshold checker with one React form, validated Spring Boot POST endpoint, calculation over existing time-window readings, and tests. No extra tables, user accounts or AI calls. This may strengthen a React/API interview story, but **is not needed to launch the showcase**.

**Optional B — Fully automated CD:** GitHub Actions invokes a secured deployment mechanism after all tests succeed. Do this only if the added credential/network exposure and complexity are justified. The baseline plan deliberately uses **automatic build + published images + intentional manual release**. If you later add SSH-based CD, require verified host identity, protected secrets, non-root deploy access, branch gating, rollback, and a firewall/security design that works with GitHub-hosted runners. Do not simply open unrestricted SSH because a sample workflow says so.

**Optional C — More polished custom domain:** Replace the free DuckDNS hostname with a domain you own after the demo is working; not needed for the initial deliverable.

**Optional D — 4 GB instance:** Only if the 2 GB machine actually fails memory stability tests despite appropriate tuning. Upgrading before measurement is not justified by low site traffic alone.

---

## 6. What not to tell recruiters

- Do **not** call the sensor data real-time IoT or live equipment data. It is static synthetic sample data.
- Do **not** call the site a high-availability production service. There is one VM and one DB container.
- Do **not** claim managed AWS RDS, EKS, Kubernetes or Terraform were used.
- Do **not** call the Gemini mock explanation a live AI response.
- Do **not** move React/TypeScript portfolio evidence into the Amdocs work history.
- Do **not** claim 2 GB performance, full CD, backups or other tasks were verified until they really pass.

**What you CAN legitimately demonstrate after completion:** a public HTTPS web application, containerization, Java/Spring API, SQL-backed analysis, React/TypeScript production build, private service networking, practical AWS Lightsail deployment, GitHub Actions testing/builds, versioned artifacts, repeatable releases, and basic operational diagnosis.

---

## 7. One-week cap and finish line

This is a **scope cap**, not a guaranteed duration or a request for overnight background work.

| Working block | Lessons | Concrete result |
|---|---|---|
| Block 1 | 01–03 | Audit, tests, backend + frontend images |
| Block 2 | 04–06 | Local production-shaped Compose and DB init validated |
| Block 3 | 07–09 | Lightsail, billing/firewall, Docker, DNS/HTTPS prerequisites |
| Block 4 | 10–12 | GHCR images, manual deployment, external live-demo checks |
| Block 5 | 13–15 | Redeploy/rollback instructions, README, cost/security check |

**STOP when ALL are true:**

- [ ] Real public HTTPS URL works from outside your home network.
- [ ] Browser loads existing React dashboard without login.
- [ ] Both sensors and 1H / 6H / 24H work against the actual Spring Boot API + PostgreSQL.
- [ ] GitHub Actions checks pass on the selected release commit.
- [ ] Container images for that commit exist and can be redeployed.
- [ ] Only 80/443 are public for the app; 8080/5432 stay private.
- [ ] No secrets are in Git; live LLM mode is mock and clearly labeled.
- [ ] Memory usage, logs and disk are checked on the real server.
- [ ] README has actual Live Demo and source links.
- [ ] Monthly cloud cost and retirement procedure are understood.

Once these are true, **go back to job applications instead of expanding the infrastructure**.

---

## 8. Primary source links and repository paths

**Repository:** https://github.com/mrrrxiii/industrial-trend-explorer/tree/master  
**README:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/README.md  
**Local Compose:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/compose.yaml  
**Spring configuration:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/backend/src/main/resources/application.properties  
**Maven POM:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/backend/pom.xml  
**Frontend package:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/frontend/package.json  
**Vite config:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/frontend/vite.config.ts  
**Existing CI:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/.github/workflows/ci.yml  
**Schema:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/db/schema.sql  
**Seed:** https://raw.githubusercontent.com/mrrrxiii/industrial-trend-explorer/master/db/seed.sql  
**Lightsail pricing:** https://aws.amazon.com/lightsail/pricing/  
**Lightsail static IPv4:** https://docs.aws.amazon.com/lightsail/latest/userguide/lightsail-create-static-ip.html  
**Lightsail firewall:** https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-firewall-rules-reference.html  
**Docker Engine Ubuntu:** https://docs.docker.com/engine/install/ubuntu/  
**Caddy HTTPS:** https://caddyserver.com/docs/automatic-https  
**GHCR:** https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry  
**DuckDNS:** https://www.duckdns.org/

**Last note:** This is a guide, not a claim that the repository has already been modified or deployed. Cloud account, actual URL, billing settings, credentials and live runtime checks must be supplied and verified during the corresponding lessons.
