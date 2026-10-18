# Industrial Trend Explorer
## Seven-day, Codex-assisted, learn-by-building tutorial

**Reviewed version 1.1 | 2026-10-17.** Clarifies prerequisites, project-root setup, one SQL initialization route, async UI safety, and week-one scope. The post-review corrections in this file also fix its copy/paste filename and split the two densest integration tasks into smaller lessons. No new feature requirements.

**Audience:** Java backend software engineer learning React, TypeScript, and LLM application integration for the first time.  
**Format:** One checked task at a time. Each task contains a concept, implementation, independent learning exercise, and verification.  
**Plan:** Seven days, **budget 3–4 focused hours each day (21–28 hours total)** if Java, Maven, Docker, and REST are already familiar. The task estimates cover hands-on work; the rest of each daily budget is for reading, teach-back, short breaks, and ordinary debugging. This includes limited setup/debugging buffer and is not a guaranteed completion time. Stop at each day’s core checkpoint; do not consume tomorrow’s budget on optional polish.  
**End product:** A small local full-stack demo, test results, README, architecture diagram, and a short recorded or live demonstration.  
**Honest outcome:** Practical introductory hands-on experience. **Not** equivalence to years building large production React apps or AI infrastructure.

---

# 0. Read this first (human + Codex)

## 0.1 The one-sentence product

A user picks one of two **simulated industrial sensors**, sees a 24-hour time-series chart and simple threshold anomalies, and clicks **Explain trend with AI** to get a short explanation grounded in backend-calculated statistics.

**The interface must clearly display `SIMULATED DATA — NOT LIVE INDUSTRIAL DATA`.** This is a portfolio learning demo, not a Seeq product or Seeq-affiliated project.

## 0.2 Exactly what the finished app does

1. Display **Reactor Temperature** (°C) or **Pump Pressure** (bar) in a dropdown.
2. Fetch the chosen sensor's 48 half-hourly readings from a Java REST API, stored in PostgreSQL.
3. Render a readable React line chart with time on the x-axis and the sensor's unit on the y-axis.
4. Highlight measurements **outside** the sensor's fixed normal range, and show an anomaly count.
5. Show **minimum, maximum, average, and number of anomalies** calculated by Java, not by an LLM.
6. On button click, call the **Java backend**, which sends the trusted summary to an LLM API and returns a short, grounded explanation.
7. Show a visible `LIVE AI` or `MOCK (NOT AI)` label, plus loading and error states.
8. Work locally using repeatable steps. A GitHub repository and two-minute demo are enough for the first week. Public cloud deployment is **not** a mandatory success criterion.

## 0.3 Scope firewall: what we will NOT build

No login/auth, live sensors, websockets, Kafka, predictive ML, anomaly-model training, multi-chart dashboards, time-range selector, alerts/notifications, agent framework, RAG/vector database, streaming, Dockerizing all services, complex state libraries, front-end routing, Terraform, Kubernetes, paid hosting, or chart-customization controls. **Don't add features just because Codex suggests them.**

Why: one week is for understanding **React rendering, TypeScript contracts, hooks, HTTP integration, and one genuine LLM API call**, not assembling a giant technology stack.

## 0.4 Technology choices (keep these fixed)

| Layer | Choice | Why |
|---|---|---|
| UI | Vite + React + TypeScript | Minimal, fast React/TS setup |
| Chart | Recharts | A ready-made declarative React chart |
| Backend | Java 17+ and Spring Boot, Maven | Existing Java experience reduces new learning |
| Database | PostgreSQL 17 via Docker Compose | Learn/use SQL and satisfy a relevant JD technology |
| Data access | Spring JDBC `JdbcClient`, not JPA | Little boilerplate; keeps SQL visible |
| AI integration | Official OpenAI Java SDK + Responses API | Real LLM call, with API key exclusively in Java environment |
| Frontend HTTP | Native `fetch` + `useEffect` | Learn core concepts before higher-level libraries |
| Tests | JUnit/Spring Boot Test; `npm run build`; manual UI checklist | Small, meaningful verification suite |
| Runtime | VS Code and local terminal/WSL2 | No cloud requirement |

**API billing note:** A ChatGPT subscription does not necessarily supply OpenAI API credits. A valid API key and enabled billing may be required. Set a small usage budget before running live calls. If unavailable, mock mode is allowed for UI learning, but **do not claim a working live LLM integration until a real API request has succeeded**.

**Version note:** Don't blindly copy a stale SDK/model version. Before adding a dependency or choosing a model, Codex must consult the official documentation and lock a known working version in the project. Favor a low-cost text model supported by the Java SDK and the account. Keep `OPENAI_MODEL` configurable. If web access is unavailable, use the official installed SDK examples rather than guessing method signatures.

## 0.5 Definition of done (must all pass)

- [ ] Can run database, Java backend, and React frontend following README, without hidden manual steps.
- [ ] Both sensors appear and selection updates the displayed data.
- [ ] Chart shows 48 readings; the unit and simulated-data label are visible.
- [ ] Threshold anomaly count and min/max/average agree with Java test expectations.
- [ ] API uses PostgreSQL data, not a hardcoded final response.
- [ ] Loading, empty, 404, network-failure, and AI-failure states are handled understandably.
- [ ] A real LLM API request returns text based on trusted Java-calculated statistics (or final deliverable is honestly marked **AI mock only**, not complete live integration).
- [ ] LLM is called only after a user presses the button. No browser API key.
- [ ] Java tests pass; frontend production build passes; manual UI test checklist passes.
- [ ] README explains start/stop, environment variables, API contract, architecture, known limits and how to demo.
- [ ] You can explain the five learning topics in section 9 without reading Codex-generated text.

## 0.6 How to use every lesson

Complete each task with the same small loop. Do not combine task IDs, even when Codex offers to continue.

Do not study all 900+ lines at once. Before Day 1, read sections 0 and 1; after that, read only the current day's section. Use sections 9–12 when preparing for interviews, handling a blocker, or checking documentation.

1. Read **Learn** and explain the idea in your own words.
2. Send the task's **Tell Codex** instruction.
3. Read every changed file; ask about any line you cannot explain.
4. Perform **Verify** yourself and record the actual result.
5. Answer **You explain** without copying Codex. Check the task only when both the behavior and your explanation are correct.

One task should normally fit in 20–60 minutes. If it does not, stop at a working checkpoint and ask Codex to diagnose the exact blocker; do not ask it to implement the next task too.

## 0.7 How to make Codex a tutor rather than a code vending machine

Open the repository in VS Code/Codex and give this instruction **once**:

> Read `Industrial_Trend_Explorer_7_Day_Codex_Tutorial_Reviewed_v1.1.md` completely. Act as an incremental programming tutor. Work on **only the specific task ID I request**, never future tasks. First explain that task's concept in plain language with one small example, then propose the smallest edits and implement only that task. Identify changed files. Run available checks and report actual results; do not fabricate test results. Ask me to complete the independent exercise before marking the task done. If blocked, identify the exact cause and least disruptive remedy. Keep the architecture and scope in this guide fixed. Never insert secrets into files, never silently overwrite user work, and never claim AI functionality in mock mode. Finish each step by summarizing: (1) what changed, (2) how to run/check it, (3) a teach-back question, and (4) the next task ID. Stop.

**Your repeated instruction:** `Do task D2.3 only, using the guide. Explain first, then implement, verify, and stop.` Substitute the relevant ID.

**User learning rule:** Before accepting a task, answer its “You explain” question *without looking at Codex's response*. If you cannot, request a fresh small example before continuing. Keep edits small; commit after each day.

**Task status:** Mark `- [x]` **only when the behavior works AND you can explain it**. Maintain a `LEARNING_LOG.md` with 2–4 original sentences per task: what you learned, what failed, how you fixed it. This is more useful than a long auto-generated essay.

**Keep each Codex context small:** Codex must *read the complete guide for constraints*, but implement only one task ID. For each task, report at most: its concept, files changed, tests actually executed, results, and one teach-back question. Do not generate a giant project plan or unrelated README rewrites.

**Time-box rule:** If a lesson is blocked for **30 minutes** beyond its allotted time, record the exact error and move to the documented minimal workaround. On Days 4 and 5, preserving the working Day 3 React ↔ Java application has higher priority than cosmetic features.

## 0.8 Preflight gate: check feasibility before starting the week (15–20 min)

1. Choose **one environment** (recommended: WSL2 Linux with VS Code connected to WSL) and use it for Node, Maven, Docker commands, and Git. Do not mix Windows and WSL package paths.
2. Check Node, Java 17+, Docker daemon/Compose, and Git with D1.1 commands. Current Vite requires a supported recent Node release; verify version against `https://vite.dev/guide/` before scaffolding.
3. Confirm you can run a basic Java application and start a Docker container. If either is unavailable, resolve it *before Day 3 or 4*, or decide to mark that layer incomplete.
4. For a **real** Day 5 LLM feature, confirm **separately** that you have access to an API key and that your OpenAI API account can make a low-cost paid request. ChatGPT subscription access is not the same as API entitlement. Never paste a key into Codex chat or commit it. If API access is absent, the live-AI acceptance criterion cannot pass. You can still learn using the explicitly marked mock.
5. Create the **single repository root** `industrial-trend-explorer/` first, put this Markdown guide *inside that root*, and open that folder in VS Code. Commands in later lessons assume the terminal starts at this root unless they say `cd frontend` or `cd backend`.
6. Keep the week-one scope **local only**. No public deployment of a paid LLM endpoint without authentication and rate limiting.

**Go/no-go:** Start Day 1 if Node and Git are usable. Do not treat blocked Docker or API billing as something Codex can solve by inventing a substitute; mark them as known risks in `LEARNING_LOG.md`.


---

# 1. Exact product contract (Codex must preserve)

## 1.1 Seed data: synthetic, fixed and reproducible

- Exactly two sensors:
  - `reactor-temp`: `Reactor Temperature`, unit `°C`, normal range **60.0 to 80.0 inclusive**.
  - `pump-pressure`: `Pump Pressure`, unit `bar`, normal range **2.0 to 5.0 inclusive**.
- Exactly 48 readings per sensor at **30-minute intervals**, starting at `2026-10-01T00:00:00Z` (fixed historical demonstration day).
- **Exact normal-value formulas** for zero-based index `i` from 0 to 47: temperature `70.0 + ((i % 5) - 2)`; pressure `3.5 + 0.1 * ((i % 5) - 2)`. Use the values below to **override** readings at indices 12 and 36. No randomness. These formulas and overrides are shared across Java in-memory data, SQL seed, and early TypeScript demo data.
- Inject **exactly two high anomalies for each sensor** at reading indices **12 and 36 (zero-based)**:
  - temperature anomaly readings: **86.0 and 88.0**.
  - pressure anomaly readings: **5.8 and 5.9**.
- All other readings must remain within the normal range. An anomaly is defined as `value < normalMin || value > normalMax`. A value exactly on the boundary is **normal**.
- Seed operation must be idempotent: restarting Java must not duplicate rows. Seed schema and data from a controlled script or an idempotent startup routine. Do not mix both strategies.
- A fixed date is intentional for deterministic tests. UI must not suggest these are today's live readings.

**The backend, not the UI and not the LLM, is the authoritative calculation layer.**

## 1.2 PostgreSQL schema (small and sufficient)

```sql
CREATE TABLE IF NOT EXISTS sensors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  normal_min DOUBLE PRECISION NOT NULL,
  normal_max DOUBLE PRECISION NOT NULL,
  CHECK (normal_min < normal_max)
);

CREATE TABLE IF NOT EXISTS readings (
  sensor_id TEXT NOT NULL REFERENCES sensors(id),
  observed_at TIMESTAMPTZ NOT NULL,
  value DOUBLE PRECISION NOT NULL,
  PRIMARY KEY (sensor_id, observed_at)
);
```

No ORM, no user tables, no schema migrations framework this week. Use a checked-in `backend/src/main/resources/schema.sql` **or** `db/schema.sql`, with exactly one clearly documented initialization route.

## 1.3 REST contract (JSON field names are fixed)

`GET /api/sensors`

```json
[
  {"id":"reactor-temp","name":"Reactor Temperature","unit":"°C","normalMin":60.0,"normalMax":80.0},
  {"id":"pump-pressure","name":"Pump Pressure","unit":"bar","normalMin":2.0,"normalMax":5.0}
]
```

`GET /api/sensors/{sensorId}/readings`

```json
[
  {"timestamp":"2026-10-01T00:00:00Z","value":70.0,"anomaly":false}
]
```

The example shows one row to illustrate shape; real response contains 48 ascending chronological rows.

`GET /api/sensors/{sensorId}/summary`

```json
{
  "sensorId":"reactor-temp",
  "count":48,
  "min":68.0,
  "max":88.0,
  "avg":70.66666666666667,
  "anomalyCount":2,
  "firstTimestamp":"2026-10-01T00:00:00Z",
  "lastTimestamp":"2026-10-01T23:30:00Z"
}
```

**Important:** Values above are actual expected results for `reactor-temp` from the fixed formula. For `pump-pressure`, expected `count=48`, `min=3.3`, `max=5.9`, `avg=3.59375`, `anomalyCount=2`. Compute values from rows in Java; do not hardcode summary responses. Use floating-point tolerance in tests.

For a known sensor with no readings, return `count:0`, `anomalyCount:0`, and `null` for `min`, `max`, `avg`, `firstTimestamp`, and `lastTimestamp`. The corresponding Java DTO fields must be nullable reference types, and the TypeScript `SensorSummary` fields must use `number | null` or `string | null`. An unknown sensor still returns 404.

`POST /api/sensors/{sensorId}/explanation` (no request body needed)

```json
{
  "sensorId":"reactor-temp",
  "text":"...",
  "mode":"LIVE"
}
```

`mode` is exactly `LIVE` on successful genuine LLM response, and `MOCK` when a visibly labeled deterministic fake explanation is used. Never silently substitute mock for live failure. If `LIVE` mode fails, return a clear non-2xx error and let UI offer retry. Unknown sensor IDs return 404 for each sensor-specific endpoint. Empty data is a controlled case rather than a crash.

## 1.4 Data and trust flow

```text
User selects sensor
    ↓ React state: selectedSensorId
React fetch → GET /api/sensors/{id}/readings and /summary
    ↓ Java Spring REST controller
    ↓ service / repository → PostgreSQL
    ↓ Java deterministic calculations / anomaly flags
React renders line chart + summary cards

User CLICK → POST /api/sensors/{id}/explanation
    ↓ backend independently fetches data + computes summary
    ↓ backend sends only trusted summary/limits to model
    ↓ OpenAI Responses API returns a short explanation
    ↓ Java returns { sensorId, text, mode }
React displays text and LIVE/MOCK label
```

Security boundary: **Never send `OPENAI_API_KEY` to React or Vite; never commit secrets.** React sees only your own `/api/...` paths. Local development can use a Vite proxy to `localhost:8080` to avoid CORS code. `fetch` never calls OpenAI directly.

## 1.5 Expected repo layout

```text
industrial-trend-explorer/
  Industrial_Trend_Explorer_7_Day_Codex_Tutorial_Reviewed_v1.1.md   ← this file
  README.md
  LEARNING_LOG.md
  .gitignore
  compose.yaml                  # PostgreSQL only
  db/                           # optional SQL seed scripts
  backend/                      # Spring Boot + Maven wrapper
    src/main/java/...           # controller, service, repository, DTO
    src/main/resources/...      # app config/schema as selected
    src/test/java/...           # tests
  frontend/                     # Vite + React + TypeScript
    src/
      App.tsx
      api.ts
      types.ts
      components/
        SensorSelector.tsx
        TrendChart.tsx
        SummaryCards.tsx
        AiExplanation.tsx
```

Keep names close to this but let Spring Initializr generate its own package tree. Minimize other files. Do not create all modules before their lesson.

---

# 2. Day 1 — TypeScript and React fundamentals (3–3.5 hours)

**Day 1 result:** an entirely local frontend where changing a dropdown changes information on the page. No backend, database or AI today.

### - [ ] D1.1 — Check the toolchain (20–30 min)

**Learn:** What Node, npm, Vite, Java, Maven and PostgreSQL each do. Node/npm runs frontend build tools; a Java runtime executes the backend; Postgres stores readings.

**Do:** In your chosen terminal, run:

```bash
node --version
npm --version
java -version
docker --version
docker compose version
git --version
```

If `node`/`npm` are missing in WSL2, install a currently supported Node LTS using official Node/nvm instructions **in the same WSL environment you will use for development**. Don't mix Windows npm and WSL npm paths. Vite requires a sufficiently new Node (check its current official guide). Java 17+ and a working Docker daemon are required. Use a project directory under your Linux home directory when working in WSL.

**Tell Codex:** `Do D1.1 only. Inspect tool versions, do not install packages without explaining what and why. Report missing prerequisites and the exact official setup path.`

**Verify:** All six commands run (or the missing prerequisite is installed and retested). Record versions in `LEARNING_LOG.md`.

**You explain:** What is the difference between Node (build-time tooling), React (UI library), and Java (API runtime)?

### - [ ] D1.2 — Create the frontend (20–30 min)

**Learn:** Why `.tsx` contains JSX/HTML-like syntax, what npm packages are, and how the Vite dev server differs from a production build.

**Do:** Start in the existing repository root, containing this Markdown guide. Do **not** create another `industrial-trend-explorer` inside it.

```bash
pwd                     # should end with industrial-trend-explorer
ls                      # should show this tutorial guide
git init                 # run only if this folder is not already a Git repository
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```

If `.git/` already exists, skip `git init`. Return to the root (`cd ..`) after checking the browser. Keep the tutorial at the root so Codex finds it consistently.

Visit the URL printed by Vite. Check that the starter renders. Open `frontend/src/App.tsx` and identify: imports, component function, returned JSX, and CSS import.

**Tell Codex:** `Do D1.2 only. Explain the generated files, remove unnecessary Vite starter visuals, set the title to Industrial Trend Explorer, and stop. No new dependencies.`

**Verify:** Browser shows the title. No console exceptions.

**You explain:** What is the difference between `src/App.tsx`, `main.tsx`, and `index.html`?

### - [ ] D1.3 — TypeScript basics through sensor types (35–45 min)

**Learn:** `type`, `string`, `number`, `boolean`, arrays, unions, optional fields, and compile-time checking. A TypeScript type is erased at runtime; it does **not** validate a received JSON object.

**Create** `frontend/src/types.ts`:

```ts
export type Sensor = {
  id: string;
  name: string;
  unit: string;
  normalMin: number;
  normalMax: number;
};

export type Reading = {
  timestamp: string;
  value: number;
  anomaly: boolean;
};

export type AiMode = 'LIVE' | 'MOCK';
```

**Do:** Create two temporary local sensor objects conforming to `Sensor`. Deliberately change a `number` to a `string`; use the TypeScript/compiler warning to see what the type catches. Restore it.

**Tell Codex:** `Do D1.3 only. Introduce each type gradually and show me one compiler-error exercise. Do not implement API calls.`

**Verify:** `npm run build` passes after fixing the intentional error.

**You explain:** Why is `AiMode` a union rather than a plain `string`? What cannot TypeScript verify at runtime?

### - [ ] D1.4 — Your first component and props (35–45 min)

**Learn:** A component is a function producing UI; `props` are inputs from its parent. JSX braces embed JavaScript expressions.

**Do:** Create `SensorSelector.tsx` that takes:

```ts
type SensorSelectorProps = {
  sensors: Sensor[];
  selectedId: string;
  onChange: (sensorId: string) => void;
};
```

Render one `<select>` and one `<option>` per sensor. Place it in `App.tsx` using temporary local sensors.

**Tell Codex:** `Do D1.4 only. Explain the parent-to-child props flow. Show the smallest typed SensorSelector and connect it to App; no chart yet.`

**Verify:** Exactly two sensor options appear, and the currently selected option is visible. At this lesson, `onChange` can be an intentionally simple callback; **D1.5** makes the selection interactive with state. Do not mistakenly mark D1.4 broken because clicking has not yet updated the entire app.

**You explain:** Why should `SensorSelector` receive a callback instead of owning the chosen sensor for the whole app?

### - [ ] D1.5 — `useState` and event handling (30–40 min)

**Learn:** State changes trigger React re-rendering; do not mutate state variables directly. An `onChange` handler receives a browser event and extracts the selected value.

**Do:** Keep `selectedSensorId` in `App` with `useState<string>('reactor-temp')`. On selection change, show the sensor name and unit in a text block. Don't use any API yet.

**Tell Codex:** `Do D1.5 only. Explain render → event → setState → render. Implement and then ask me to predict what changes when I select Pump Pressure.`

**Verify:** Toggling the dropdown changes displayed name and unit without reloading the page.

**You explain:** What is the difference between `props` and `state`?

**End-of-day checkpoint:** `npm run build` succeeds. Commit: `git add . && git commit -m "Day 1: typed React sensor selector"` (initialize Git first if needed).

---

# 3. Day 2 — Chart, derived data and browser UI (2.5–3 hours)

**Day 2 result:** a coherent frontend with a working chart using temporary data; no backend required yet.

### - [ ] D2.1 — Create temporary typed readings (25–35 min)

**Learn:** Array operations, `.map`, the distinction between a data object and a rendered component, and why fixed test data beats randomness.

**Do:** Create `frontend/src/demoData.ts` with typed `Reading[]`, 48 chronological values per sensor, fixed timestamps, and exactly two out-of-range values for each. Use **the exact formulas and anomaly overrides in section 1.1**, so expected summaries are testable.

**Tell Codex:** `Do D2.1 only. Generate minimal deterministic demo arrays conforming to types.ts. Explain array mapping and anomaly flag logic. This file must be removed from final data flow on Day 3.`

**Verify:** Each array length is 48; exactly two anomalies per sensor.

**You explain:** Why would values generated with `Math.random()` at render time make testing harder?

### - [ ] D2.2 — Render a time-series chart (35–45 min)

**Learn:** React component composition, `data` props, axes and tooltips; why each sensor needs its own y-axis unit.

```bash
cd frontend
npm install recharts
```

**Do:** Implement `TrendChart.tsx` using a **single** Recharts `ResponsiveContainer`, `LineChart`, `XAxis`, `YAxis`, `Tooltip`, and `Line`. Show one sensor at a time. Keep formatting simple: fixed UTC label and value tooltip. Mark anomalies with red dots **only if a simple standard Recharts API supports it**; otherwise show anomaly readings in a small text list instead of writing custom SVG.

**Tell Codex:** `Do D2.2 only. Explain data → LineChart → Axes/Tooltip and type the props. Produce one line plot, not multiple charts or custom animation.`

**Verify:** Chart changes when dropdown changes; no console errors; y-axis indicates °C or bar.

**You explain:** Why should one chart component accept readings as props rather than fetching its own data?

### - [ ] D2.3 — Derived values and conditional rendering (30–40 min)

**Learn:** `.filter`, `.length`, pure computations, and conditional JSX. `useMemo` is not needed for 48 data points.

**Do:** Build `SummaryCards.tsx` that accepts `count`, `min`, `max`, `avg`, `anomalyCount`, and `unit`. **For Day 2 only**, compute a demo summary from temporary readings. Round display values to one decimal but retain full precision in calculations.

**Tell Codex:** `Do D2.3 only. Explain how to derive summary values with array functions, and how React conditionally displays 'No anomalies' or the anomaly count.`

**Verify:** Chart and numbers change consistently. Distinct values on different sensors; exactly two anomalies each.

**You explain:** Why should formatted display strings not replace numeric data in TypeScript types?

### - [ ] D2.4 — Loading, empty and error panels (25–35 min)

**Learn:** UI is a small state machine: `loading`, `success`, `empty`, `error`. Never show old sensor data as if it belongs to a new selected sensor.

**Do:** Make only minimal conditional JSX in `App` for `loading`, `empty`, and `error`, using a single local status value for teaching. Demonstrate each branch briefly, then restore success. **Do not create a reusable status-component library or add artificial HTTP requests.** Real states come from fetch on Day 3.

**Tell Codex:** `Do D2.4 only. Explain why an API request needs loading/error/empty branches. Add minimal JSX branches without making fake network requests.`

**Verify:** Codex demonstrates each branch temporarily and restores success mode afterward.

**You explain:** What user mistake could happen if old temperature data remained visible after switching to pressure?

**End-of-day checkpoint:** React frontend works with demo data. Commit: `Day 2: sensor trend chart and summary UI`.

---

# 4. Day 3 — Java API and typed React fetching (3–3.5 hours)

**Day 3 result:** frontend retrieves real HTTP JSON from Java instead of importing `demoData.ts`.

### - [ ] D3.1 — Generate Spring Boot project (20–30 min)

**Learn:** Request → `@RestController` → JSON response; Maven dependencies; package structure; how Spring runs on port 8080.

**Do:** Use https://start.spring.io to create `backend` with Maven, Java 17+ and **Spring Web only** (its current Spring Initializr name may vary slightly). Use the generated test setup. **Wait until Day 4 to add JDBC API and PostgreSQL Driver**, so a missing database cannot prevent the Day 3 in-memory API from starting.

**Tell Codex:** `Do D3.1 only. Generate minimum Spring Boot REST app, with /api/health returning {"status":"ok"}. Explain annotations and run the endpoint. If database auto-config prevents startup, apply the smallest temporary fix and explain it.`

**Verify:** `curl http://localhost:8080/api/health` returns `{ "status": "ok" }` or equivalent JSON; note actual output.

**You explain:** Why is a REST controller different from a Java class that runs `main`?

### - [ ] D3.2 — Java DTOs and in-memory sensor API (40–50 min)

**Learn:** Java `record` DTOs (Java 17+), Spring `@GetMapping`, JSON serialization, HTTP response codes.

**Do:** Create `SensorDto`, `ReadingDto`, and (on D3.3) `SummaryDto` with field names matching section 1. Leave `ExplanationDto` until **Day 5**, when it is needed. Implement **in-memory** deterministic data and `GET /api/sensors`, `GET /api/sensors/{id}/readings`. For unknown IDs return **404** using an idiomatic Spring mechanism. No PostgreSQL yet.

**Tell Codex:** `Do D3.2 only. Implement two GET endpoints using typed records and in-memory fixed seed data. Explain DTO vs domain object. Do not add database or AI.`

**Verify:** `curl` outputs two sensors, 48 sorted readings per sensor; unknown ID returns 404.

**You explain:** What is the advantage of a fixed JSON API contract between Java and TypeScript?

### - [ ] D3.3 — Add deterministic summary endpoint (25–35 min)

**Learn:** Backend domain logic, separation of controller and service, sample mean = sum / count; no LLM calculations.

**Do:** Implement `GET /api/sensors/{id}/summary` from the same 48 readings; returns min/max/avg and exactly 2 anomalies. Handle empty readings without divide-by-zero. Keep logic in a testable service function.

**Tell Codex:** `Do D3.3 only. Add a pure summary calculator, controller endpoint and a small JUnit test. Explain why we don't ask the LLM to compute these numbers.`

**Verify:** Two sensors have count=48 and anomalyCount=2; automated test passes.

**You explain:** Why is an LLM explanation not a reliable authoritative statistics engine?

### - [ ] D3.4a — Create the typed frontend API module (25–35 min)

**Learn:** A Promise represents a result that may arrive later; `async/await` makes that control flow readable. TypeScript types do not prove that network JSON has the expected runtime shape.

**Do:** Add a `SensorSummary` type matching section 1.3, then create `frontend/src/api.ts` with `getSensors`, `getReadings`, and `getSummary`. Each function must use `fetch`, reject non-2xx responses, parse JSON, and perform a minimum shape check (array vs object, required IDs, and numeric values). Accept an optional `AbortSignal` for reading/summary requests. Add `getExplanation` on Day 5, **not now**. Configure the Vite dev proxy `/api` → `http://localhost:8080`. Do not connect React state in this task and do not add a validation library.

**Tell Codex:** `Do D3.4a only. Teach Promise, await, response.ok, and why typed network JSON still needs runtime checks. Add the API types/functions and Vite proxy, verify them, and stop before editing App state.`

**Verify:** With Java and Vite running, requesting `http://localhost:5173/api/sensors` returns the two-sensor JSON through the proxy. `npm run build` passes.

**You explain:** Why is `const data = await response.json() as Sensor[]` not proof that the server actually returned sensors?

### - [ ] D3.4b — Connect API data to React safely (35–45 min)

**Learn:** A `useEffect` runs after rendering when one of its dependencies changes. Request cleanup prevents a slow response for the old sensor from replacing newer state.

**Do:** Fetch the sensor list when `App` first loads. When `selectedSensorId` changes, fetch that sensor's readings and summary, with explicit loading, empty, and error state. Abort or ignore outdated requests when the sensor changes quickly. Delete all `demoData` imports from the UI after the Java API works. Never show readings or a summary under a different selected sensor.

**Example, to understand rather than paste blindly:**

```tsx
useEffect(() => {
  const controller = new AbortController();
  // fetch readings for selectedSensorId using controller.signal
  // when response arrives, update state only if not aborted
  return () => controller.abort();
}, [selectedSensorId]);
```

**Tell Codex:** `Do D3.4b only. Teach useEffect dependencies and cleanup, connect the existing api.ts functions to App, replace demoData, and implement race-safe loading/error/empty handling.`

**Verify:** Stop Java and see a useful error. Restart it and watch chart recover. Rapidly switch sensors; no stale graph.

**You explain:** Why can a response for sensor A arrive *after* the response for sensor B?

**End-of-day checkpoint:** UI fetches Java, Java data still in-memory. Commit: `Day 3: typed React to Java REST integration`.

---

# 5. Day 4 — PostgreSQL and SQL-backed backend (2.5–3 hours)

**Day 4 result:** same UI, now from actual persisted database rows.

### - [ ] D4.1 — Local PostgreSQL container (20–30 min)

**Learn:** Container vs database, host port vs container port, DB URL, and why dev secrets must not be used in production.

**Do:** Create root `compose.yaml` containing **only** `postgres:17`. Name the Compose service exactly **`db`**, so later commands work, with:

- `POSTGRES_DB=industrial_trends`
- `POSTGRES_USER=app`
- `POSTGRES_PASSWORD=local_dev_only` (development ONLY; not for deployment)
- host port **55432** mapped to container **5432**
- named volume for persistence

Run `docker compose up -d`; verify PostgreSQL readiness (`docker compose ps` and `pg_isready` inside container). Configure Spring datasource through environment variables with a local documented fallback; never hardcode cloud credentials.

**Tell Codex:** `Do D4.1 only. Explain the Docker/port mapping, create a minimal Postgres compose file, start DB, and verify it. Do not change Java repository yet.`

**Verify:** SQL client or `docker compose exec ... psql` can connect; no conflicts with user's existing PostgreSQL on 5432.

**You explain:** Why does Java connect to `localhost:55432` when PostgreSQL inside the container listens on `5432`?

### - [ ] D4.2 — Schema and idempotent seed (35–45 min)

**Learn:** SQL `CREATE TABLE`, primary/foreign keys, ISO UTC timestamp and idempotent inserts.

**Do:** Use exactly **one initialization strategy**: checked-in SQL files `db/schema.sql` (section 1.2) and `db/seed.sql` (see below), executed manually with `psql` via Docker. Do **not** also enable Spring Boot SQL auto-initialization or Java startup seeding. Do not create a seed generator this week. Use `INSERT ... ON CONFLICT DO NOTHING`; never automatically `DROP TABLE`.

**Simple, deterministic `db/seed.sql`:**

```sql
INSERT INTO sensors (id, name, unit, normal_min, normal_max) VALUES
 ('reactor-temp', 'Reactor Temperature', '°C', 60.0, 80.0),
 ('pump-pressure', 'Pump Pressure', 'bar', 2.0, 5.0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO readings (sensor_id, observed_at, value)
SELECT s.id,
       TIMESTAMPTZ '2026-10-01 00:00:00+00' + (n.i * INTERVAL '30 minutes'),
       CASE
         WHEN s.id = 'reactor-temp' AND n.i = 12 THEN 86.0
         WHEN s.id = 'reactor-temp' AND n.i = 36 THEN 88.0
         WHEN s.id = 'reactor-temp' THEN 70.0 + ((n.i % 5) - 2)
         WHEN s.id = 'pump-pressure' AND n.i = 12 THEN 5.8
         WHEN s.id = 'pump-pressure' AND n.i = 36 THEN 5.9
         ELSE 3.5 + 0.1 * ((n.i % 5) - 2)
       END
FROM sensors AS s
CROSS JOIN generate_series(0, 47) AS n(i)
WHERE s.id IN ('reactor-temp', 'pump-pressure')
ON CONFLICT (sensor_id, observed_at) DO NOTHING;
```

**Run from the repository root** after `docker compose up -d` (the service name must be `db`):

```bash
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/schema.sql
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/seed.sql
docker compose exec -T db psql -U app -d industrial_trends -c 'SELECT sensor_id, COUNT(*) FROM readings GROUP BY sensor_id;'
```

Re-run the seed command to prove counts remain 48 and 48. The same formulas are used in Day 2 demo arrays and Day 3 Java in-memory service, but the final source of data must be PostgreSQL only.

**Tell Codex:** `Do D4.2 only. Teach primary key, foreign key, timestamptz and idempotence. Create schema and fixed 48+48 seed. Show the SQL to verify rows and anomalies.`

**Verify:** `SELECT sensor_id, COUNT(*) FROM readings GROUP BY sensor_id;` returns 48 per sensor. Re-run seed; counts remain unchanged.

**You explain:** Why use `(sensor_id, observed_at)` as a composite primary key?

### - [ ] D4.3 — `JdbcClient` repository, no ORM (35–45 min)

**Learn:** Prepared SQL parameters, Java row mapping, repository vs service vs controller. SQL injection prevention.

**Do:** Add **JDBC API** and **PostgreSQL Driver** dependencies to the existing Spring Boot build, then inject Spring `JdbcClient`. Implement repository methods to list sensors and readings by **parameterized** `sensorId` ordered by timestamp. Replace only the in-memory data access layer, keeping the REST contract unchanged. Connect datasource to local Postgres. Verify `GET` endpoints.

**Tell Codex:** `Do D4.3 only. Explain repository/service/controller separation. Replace in-memory data store with Spring JdbcClient prepared queries; do not change JSON fields or UI.`

**Verify:** All three GET endpoints work after the in-memory data repository is replaced. Temporarily stop Postgres and verify React shows a readable load error (the backend may respond with 5xx); **do not** add a large global exception-handling framework merely for this demo. Never silently fall back to old in-memory readings.

**You explain:** Why is string concatenation into SQL unsafe even if the UI sends only two known sensor IDs?

### - [ ] D4.4 — Summary test and SQL verification (20–30 min)

**Learn:** Calculated vs stored values, test fixtures, and floating-point tolerance.

**Do:** Validate that the summary endpoint computes real values; add tests for threshold boundaries (equal is normal), empty input, and 2 injected anomalies. Include a repository integration check if test setup is already simple; do not start a complex Testcontainers configuration this week.

**Tell Codex:** `Do D4.4 only. Add tests for pure statistics and threshold comparison; show one SQL verification query and explain expected results.`

**Verify:** Backend tests pass and React displays Postgres-backed data.

**You explain:** Why should unit tests use a numeric tolerance for average values?

**End-of-day checkpoint:** commit `Day 4: PostgreSQL-backed sensor metrics`.

---

# 6. Day 5 — Real LLM application integration (3–3.5 hours)

**Day 5 result:** the explanation button makes **one explicitly initiated** backend call to an LLM and returns grounded text. Distinguish mock and live completely.

### - [ ] D5.1 — Understand LLM boundaries and prompt design (25–35 min)

**Learn:** Model vs prompt vs token vs API key vs context; model outputs are untrusted generated text; backend can ground output in verified calculations. Difference between AI-assisted coding and building an AI-powered product feature.

**Do:** Write a simple model instruction and data message based on computed Java summary only. Example semantic constraints:

> You are explaining **simulated** industrial sensor statistics for a learning demo. Use ONLY the supplied values, normal range, timestamps and anomaly count. In 3–5 short sentences, state the observed trend, the number and size of out-of-range readings, and the uncertainty. Do not invent physical causes, maintenance instructions, predictions, diagnoses or facts outside the supplied data. Say explicitly that this is synthetic sample data, not live operational guidance.

Pass only safe structured data: sensor name, unit, normal min/max, count/min/max/avg/anomaly count, and the two anomaly times and values. No raw user-entered prompt. **Do not send API keys, logs or secrets in the model input.**

**Tell Codex:** `Do D5.1 only. Explain grounding, hallucinations, tokens and prompt injection. Draft and review a safe prompt template but do not call the API yet.`

**Verify:** Read the prompt and identify its factual sources. It doesn't ask the model to discover a root cause.

**You explain:** Why should the model explain already computed statistics rather than decide whether a reading is an anomaly?

### - [ ] D5.2 — Add explicit mock mode first (25–35 min)

**Learn:** Dependency injection / provider abstraction at a minimal level, controlled fallback, and truthful feature labels.

**Do:** Define a small Java `ExplanationService` contract with mode selected via env/config: `LLM_MODE=mock` or `LLM_MODE=live`. Mock returns **deterministic, visibly labeled `mode:"MOCK"`** text using real summary numbers. Implement POST endpoint without introducing SDK yet. Do **not** auto-fallback from a live error to a mock response.

**Tell Codex:** `Do D5.2 only. Add mock explanation endpoint and its test, with visible MOCK mode. Explain why fake success cannot masquerade as a real AI call.`

**Verify:** `POST /api/sensors/reactor-temp/explanation` returns a `MOCK` result; unknown sensor returns 404.

**You explain:** Why must live-call errors be visible instead of silently returning a mocked answer?

### - [ ] D5.3a — Add the official Java SDK and secure configuration (25–35 min)

**Learn:** An SDK wraps HTTP requests; a dependency version fixes the API your code compiles against. `OPENAI_API_KEY` is a server secret, while environment variables let configuration differ without changing source code.

**Do:** Add the official `com.openai:openai-java` Maven dependency **using a version verified from its official README**. Use the framework-neutral `openai-java` package directly, not an obsolete Spring Boot starter. Add live-only client/configuration wiring so `LLM_MODE=mock` still starts without an API key. Do not make an API request in this task. Config:

```text
OPENAI_API_KEY=<secret set in terminal, never committed>
OPENAI_MODEL=<supported inexpensive text model verified in account/docs>
LLM_MODE=live
```

Use an appropriate request timeout and never log the key or dump full upstream requests.

**Tell Codex:** `Do D5.3a only. Consult the official OpenAI Java SDK README, lock a current dependency, and add secure live-only client configuration. Explain every environment variable. Verify mock mode still builds and starts without a key; do not call the API yet.`

**Verify:** Maven compilation and existing mock tests pass with no API key present. Starting in mock mode does not try to create a live client.

**You explain:** Why must live-only configuration not break mock-mode startup when no API key exists?

### - [ ] D5.3b — Make one grounded live Responses API call (35–45 min)

**Learn:** A model request contains instructions plus trusted input; the response still needs extraction and error handling. Model choice affects capability, latency, and cost.

**Do:** Follow a runnable current **Responses API** example from the SDK repository; do not invent method names. Implement the live `ExplanationService` with the prompt from D5.1 and structured facts calculated by Java. Extract the returned text. Handle timeout, credentials, billing, rate-limit, and network failures without logging secrets or silently falling back to mock. Make one manual low-cost request and document the actual mode and result.

**Tell Codex:** `Do D5.3b only. Consult the official Java SDK Responses API example, choose a supported low-cost text model, implement the live service, and make one manual grounded call. Explain model choice and cost controls; never show or write my key.`

**Verify:** Exactly one manual successful `LIVE` request returns an explanation based on the selected sensor's supplied statistics, with no secret in source, logs, or browser traffic. If credentials/billing are unavailable, label this task **blocked** and do not claim success.

**You explain:** Why would `VITE_OPENAI_API_KEY` be unsafe even if you added the key to a local `.env` file?

### - [ ] D5.4 — Connect the UI button and errors (30–40 min)

**Learn:** User event vs React effect; async button disabling, pending requests, conditional result state, and separation of generated text from trusted UI.

**Do:** Add a TypeScript `Explanation` type matching section 1.3 and add `getExplanation(sensorId)` to `frontend/src/api.ts`. Create `AiExplanation.tsx` with **Explain trend with AI** button, `Generating...` state, mode label (`LIVE AI` / `MOCK, NOT AI`), displayed text, and readable error. Render text as React text (not `dangerouslySetInnerHTML`). Clear the prior explanation when sensor changes. Disable button during request. Do not call LLM automatically on page load or selector change. **Protect against stale AI responses:** make the parent render `<AiExplanation key={selectedSensorId} sensorId={selectedSensorId} />` so a late result for sensor A cannot be displayed in the current sensor B panel. If adding abort cleanup is easy, do so; otherwise the remount is sufficient to protect the displayed sensor label. Do not add a general state-management library.

**Tell Codex:** `Do D5.4 only. Connect POST endpoint to a user-click handler with request state. Explain why this POST belongs in an event handler, not useEffect. Never expose API key in frontend.`

**Verify:** No LLM requests until click; exactly one request per click; switching sensors clears old explanation; API failure shows error; text and mode badge show accurately.

**You explain:** Why is a model-generated explanation not a safe source of HTML to inject into a page?

**End-of-day checkpoint:** commit `Day 5: server-side grounded AI explanation` (never commit `.env`).

---

# 7. Day 6 — Testing, reliability and scope discipline (2–3 hours)

**Day 6 result:** basic tests and failure behavior are verified, not just a happy-path demo.

### - [ ] D6.1 — Backend tests (30–40 min)

**Learn:** Unit vs integration test; deterministic inputs; why regression tests matter.

**Do:** Write JUnit cases for: two anomalies per sensor, exact thresholds considered normal, average/min/max calculation, empty input handling, unknown sensor returns 404, mock mode reports `MOCK`, and the LLM service contract on failure (mock provider injected; do not spend real API money in automated tests).

**Tell Codex:** `Do D6.1 only. Add the minimum high-value automated tests with synthetic fixtures; run the project Maven test command and report pass/fail counts.`

**Verify:** `cd backend && ./mvnw test` passes or Codex reports exact failures to fix.

**You explain:** Why should a unit test never depend on a real LLM responding with exact words?

### - [ ] D6.2 — Frontend build + human acceptance checks (30–40 min)

**Learn:** TypeScript compilation, browser DevTools Network panel, accessibility basics, and conditional rendering.

**Do:** Run `cd frontend && npm run build`. Manually test: page load, both sensors, correct chart, 2 anomalies, summaries, mock label, backend outage, database outage, rapid switching, and narrow screen layout. **Test live AI explanation and AI outage only if Day 5 live API access succeeded; otherwise label them BLOCKED, not PASS.** Add a `label` associated with the dropdown and descriptive headings; don't introduce a UI library. Also switch sensors while an AI request is pending, then verify the old result does not appear under the new sensor.

**Tell Codex:** `Do D6.2 only. Fix type/build errors, improve labels and statuses minimally, and give me an exact manual-browser acceptance checklist. Do not add visual redesigns.`

**Verify:** Build passes; complete checklist in learning log with checked evidence.

**You explain:** What can a build catch that a browser click-through might miss, and vice versa?

### - [ ] D6.3 — Safety and error-handling review (30–40 min)

**Learn:** Secrets, 4xx/5xx, rate/cost awareness, and separating local-demo security from a public service.

**Do:** Confirm `.gitignore` excludes `.env`, `.env.local`, generated build outputs and IDE secrets; API key only in server env; no API key in network traffic to frontend; unknown ID 404; LLM errors non-2xx; local app no public API endpoint without auth/rate limit. Ensure response is plain text; prompts prohibit false operational conclusions.

**Tell Codex:** `Do D6.3 only. Audit the repository and developer tools for secret leaks and error-path correctness. Report evidence, not assumptions. Keep app local-only; don't publish an unauthenticated paid API proxy.`

**Verify:** `git status` and `git diff --cached` reveal no secrets; a forced invalid API key returns a readable error, not `MOCK` or `LIVE` success.

**You explain:** Why is a public `POST /explanation` with your own paid key risky without authentication or rate limits?

**End-of-day checkpoint:** commit `Day 6: tests and failure-handling polish`.

---

# 8. Day 7 — Portfolio handoff and interview understanding (2–3 hours)

**Day 7 result:** another developer can run the demo; you can explain it without hiding behind Codex.

### - [ ] D7.1 — Write a genuinely runnable README (30–40 min)

**Learn:** Reproducibility, software communication, and documenting real limits.

**Do:** README must state: what app is, **synthetic data**, screenshot, architecture, exact versions/requirements, Docker command, SQL initialization, Java launch, React launch, ports, `.env.example` containing no real secrets, `LLM_MODE=mock/live`, API endpoints, test commands, known limitations, and how to stop services. The README should not say real-time analytics or production-ready AI.

**Tell Codex:** `Do D7.1 only. Write README from verified commands and existing code. Do not invent demo results or promise features absent from implementation.`

**Verify:** Follow README from a clean terminal. If any command fails, fix documentation first.

**You explain:** Why does a reproducible README demonstrate engineering quality better than a list of buzzwords?

### - [ ] D7.2 — One realistic end-to-end demo (25–35 min)

**Learn:** Presenting a data flow and its limitations to an interviewer.

**Do:** Rehearse this **demo script (~2 minutes):**

1. Show two sensor choices and the `SIMULATED DATA` label.
2. Show line chart, unit, and two anomalies; briefly say thresholds are deterministic Java rules.
3. Select the other sensor and point out network fetch/updated metrics.
4. Press **Explain trend with AI** in **LIVE** mode and show text grounded in the numerical summary.
5. Show the architecture sketch and explain why key and database access are backend-only.
6. Mention one limitation (fixed seeded dataset, no streaming/production auth).

**Tell Codex:** `Do D7.2 only. Help me prepare a two-minute demo and check that every claim is supported by actual working code.`

**Verify:** You can do it from a fresh browser session in under two minutes, excluding normal network variability.

**You explain:** Which operations are deterministic? Which one is nondeterministic? Why?

### - [ ] D7.3 — Your no-Codex teach-back (35–45 min)

**Learn:** Owning your explanation, not merely owning a repository.

**Do:** Answer aloud or write short answers **without using Codex**:

1. In `App.tsx`, what is React state? Which prop passes chosen sensor ID to a child?
2. What does `useEffect(...,[selectedSensorId])` do, and why can stale responses occur?
3. What does TypeScript guarantee at build time and what does it NOT guarantee for network JSON?
4. Trace the entire request from React `fetch` through controller/service/repository to PostgreSQL and back.
5. What is the exact difference between anomaly calculation and an LLM explanation?
6. Where does the API key live? Why can't the browser have it?
7. What failure cases did you implement and how are they displayed?
8. What would require real production experience before this could become a real industrial product?

**Tell Codex:** `Do D7.3 only. Quiz me on the actual files in my repo. Ask one question, wait for my explanation, point to code proving or contradicting it, then move to the next. Do not give answers before I try.`

**Verify:** You can correctly explain the architecture, state/data flow, TypeScript contract, and live LLM call without reading prepared answers.

**You explain:** Choose any two of the eight questions and answer them with references to actual source files, not memorized generic definitions.

### - [ ] D7.4 — Final checks, commits and portfolio artifact (20–30 min)

**Learn:** The difference between evidence-backed project claims and resume keyword stuffing; why verified tests, run instructions and screenshots matter.

**Do:** Run Maven tests and npm build, verify `git status`, add a screenshot (no credentials), write a concise project description, and make the repo presentable. A GitHub push is optional if convenient; avoid spending hours on hosting.

**Tell Codex:** `Do D7.4 only. Run final checks, give me a factual checklist of which parts work, which were mocked, and which remain incomplete. Propose a short portfolio description only for verified features.`

**Verify:** Final README commands work, tests pass, screenshot matches actual app, no fake claims and no secrets committed.

**You explain:** Which precise parts of the project can you now truthfully claim as implemented and tested, and which Seeq requirements still require deeper professional experience?

**End-of-week checkpoint:** commit `Day 7: documentation and verified demo`.

---

# 9. Interview relevance: what this project proves and does NOT prove

| Seeq-related requirement | What this project can honestly demonstrate |
|---|---|
| React + TypeScript | Implemented typed React components, state, props, effects, fetch, charting and UI states |
| Java backend | Java REST endpoints, service logic and testable domain calculations |
| Postgres / relational databases | SQL schema, prepared queries, seeded data, Java–DB integration |
| End-to-end ownership | One complete feature from browser through API to database and back |
| Generative AI applications | A real server-side API integration that sends trusted structured context and returns a labeled explanation, **if live request succeeded** |
| Quality/CI principles | Tests, production TS build, error states, code review/self-review, documentation |
| Industrial time-series | Small synthetic sensor readings, thresholds and trend visualization; **not** industrial-grade analytics expertise |

**Do not claim:** expertise in large React applications, generative AI infrastructure operations, model training, reliable anomaly ML, real industrial sensor operations, scalable time-series processing, or production deployment based on this one-week demo.

**Truthful future resume bullet (ONLY after successful live integration and all checks):**

> Built a personal industrial time-series dashboard using React, TypeScript, Java Spring Boot and PostgreSQL, with sensor visualization, deterministic anomaly metrics, and a server-side LLM-powered explanation feature.

If live API was never successfully exercised, remove “LLM-powered” and state that AI integration is mocked/in progress. Label it **Personal Project**, not Amdocs experience.

## 9.1 Five must-know concepts for Seeq discussion

1. **React:** Components render UI based on props/state; updates trigger re-rendering. Avoid mutating state or using effects for click-driven actions.
2. **TypeScript:** Static types catch programmer errors; runtime network validation still matters.
3. **Java REST:** HTTP controller, service for calculations, repository for SQL, DTOs for API contract.
4. **Time-series:** Timestamped measurements, sorted sample intervals, unit/range, outlier rule and repeatability. No prediction claimed.
5. **LLM grounding:** Model receives trustworthy computed facts and generates human-readable text. Generated text is not the source of truth. Provider errors and cost/security are real engineering concerns.

## 9.2 Realistic stretch tasks, **only after** week-one completion

Potential week-two items: Vitest + React Testing Library for frontend interaction tests; deployment with authentication, quotas and budget controls; user-selectable date filters; a second type of anomaly rule; basic instrumentation. Do NOT start these before passing section 0.5.

---

# 10. Blockers and time rescue plan

## 10.1 If Node/npm is missing

Use the official [Vite Getting Started](https://vite.dev/guide/) and Node.js/nvm installation instructions, verify `node --version` and `npm --version` in the **same terminal environment**. Do not substitute a snap `codex` package as a Node/npm installation.

## 10.2 If Docker/PostgreSQL is blocked after 45 minutes

Keep the Java in-memory repo temporarily and continue with TypeScript + LLM lessons. **Mark database criterion incomplete** and return later. Do not quietly claim PostgreSQL integration.

## 10.3 If LLM account/API access is blocked

Complete the `MOCK` UI, documentation and Java tests; mark **live integration blocked**, keep the explicit `MOCK` badge, and do not spend the whole week debugging account billing. A real API call remains necessary to truthfully claim a completed live AI feature.

## 10.4 If only ~10–12 hours are available

Preserve first: **D1.3–D1.5**, **D2.2**, **D3.2–D3.4b**, **D5.1–D5.4** (including D5.3a and D5.3b), **D6.2**, **D7.3**. Use Java in-memory readings until more time exists; mark PostgreSQL requirement unfinished. This still teaches core React/TS/LLM concepts, but it is **not the full done definition**.

## 10.5 What may be skipped without hurting the learning goal

**Mandatory for a credible small project:** React selector, typed chart, data fetched from Java, consistent stats/anomaly rules, real AI request (if API account works), readable error/loading states, and a simple run guide. PostgreSQL is part of the intended full result and should remain a Day 4 priority.

**Not worth extra hours in week one:** custom chart anomaly dots, perfect responsive styling, a screenshot before the app works, advanced test frameworks, animations, generalized provider interfaces, sophisticated JSON validators, and public cloud deployment. Do not invent a separate task for any of these.

**Day-specific stop rule:** At the end of Day 3, the frontend must successfully call Java; by the end of Day 4, it should use PostgreSQL; by the end of Day 5, the button should work in mock and ideally live mode. If not, log the blocker and use Day 6 to repair fundamentals before polishing.

## 10.6 Debugging policy for Codex

- Don't rebuild the project from scratch when one endpoint fails.
- Inspect the exact exception, relevant file and failing line.
- Describe the simplest hypothesis and test it.
- Change only the layer responsible for the failure.
- Re-run its relevant check and one adjacent regression check.
- Tell the learner why it failed and how to identify it next time.
- If an external API/key is unavailable, state the blocker. Never invent test output.

---

# 11. Official documentation bookmarks

The following official resources are the authority for setup and library method signatures; versions and pricing can change:

1. Vite React TypeScript starter: https://vite.dev/guide/
2. React with TypeScript: https://react.dev/learn/typescript
3. React state: https://react.dev/learn/state-a-components-memory
4. React effects, including cleanup: https://react.dev/learn/synchronizing-with-effects
5. Spring Boot REST guide: https://spring.io/guides/gs/rest-service/
6. Spring Boot SQL / JdbcClient: https://docs.spring.io/spring-boot/reference/data/sql.html
7. PostgreSQL SQL reference: https://www.postgresql.org/docs/current/
8. Recharts documentation: https://recharts.github.io/
9. Official OpenAI Java SDK + examples: https://github.com/openai/openai-java
10. OpenAI Responses API reference: https://platform.openai.com/docs/api-reference/responses
11. API pricing and usage limits: https://platform.openai.com/docs/pricing

---

# 12. First Codex interaction (copy exactly)

> I am learning React, TypeScript, and how to integrate a real LLM API into an application. Read `Industrial_Trend_Explorer_7_Day_Codex_Tutorial_Reviewed_v1.1.md` and follow its **scope firewall, REST contract, and one-task-at-a-time teaching rule**. Start **D1.1 only**. Before changing files, explain what I should learn and which prerequisite commands you will run. After checks, report exact results, ask me the D1.1 teach-back question, and stop. Do not advance to D1.2 until I tell you.

**A successful one-week project is small, real, explainable, testable, and honestly described.**
