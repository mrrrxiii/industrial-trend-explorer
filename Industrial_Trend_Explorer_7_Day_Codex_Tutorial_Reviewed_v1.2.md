# Industrial Trend Explorer
## Seven-day TypeScript, React, PostgreSQL, and LLM tutorial

**Reviewed version 1.2 | 2026-10-17**

**Learner:** Java backend developer with 5+ years of experience and no prior TypeScript, React, or LLM application experience.  
**Time budget:** Reserve **two focused hours per day for seven days (14 hours)**. Planned lessons plus preflight total **12 hours 10 minutes**, leaving **1 hour 50 minutes of protected debugging buffer**.  
**Method:** Learn one concept, make one small change, verify it, explain it, and stop.  
**Outcome:** A small local portfolio application and enough foundational knowledge to discuss TypeScript, React, PostgreSQL integration, and a grounded LLM feature honestly in an interview.

This tutorial does **not** create expertise in large React applications or production generative-AI infrastructure in one week. It gives an experienced backend engineer a credible practical foundation and a clear map of what deeper experience would require.

---

# 0. Read this before Day 1

## 0.1 The product in one sentence

A user selects one of two simulated industrial sensors, views a 24-hour trend and deterministic anomaly summary from PostgreSQL, and explicitly requests a short LLM-generated explanation grounded in backend-calculated facts.

The page must always display:

> SIMULATED DATA — NOT LIVE INDUSTRIAL DATA

This is a personal learning project. It is not affiliated with Seeq and must not be described as production industrial software.

## 0.2 Exactly what the finished application does

1. List two sensors: Reactor Temperature and Pump Pressure.
2. Retrieve 48 fixed readings for the selected sensor from a Java API backed by PostgreSQL.
3. Display a line chart, unit, normal range, minimum, maximum, average, and anomaly count.
4. Treat values outside a fixed inclusive range as anomalies.
5. Show loading, empty, error, and success states.
6. Generate an explanation only after the user presses a button.
7. Keep the LLM API key in the Java process, never in React.
8. Label responses as either `LIVE AI` or `MOCK — NOT AI`.
9. Pass backend tests, the frontend production build, and a short manual checklist.
10. Include a reproducible README and a two-minute demonstration.

## 0.3 Scope firewall

Do not add:

- authentication or users;
- streaming, WebSockets, Kafka, or live sensors;
- machine-learning anomaly detection;
- RAG, vector databases, agents, tool calling, or chat history;
- routing or a state-management library;
- date pickers, multiple dashboards, alerts, or exports;
- cloud deployment, Kubernetes, Terraform, or public hosting;
- custom chart animations or elaborate styling.

These are useful interview discussion topics, not week-one implementation tasks.

## 0.4 Fixed technology choices

| Layer | Choice |
|---|---|
| Frontend | Vite, React, TypeScript |
| Chart | Recharts |
| Backend | Java 17+ and Spring Boot with Maven |
| Database | PostgreSQL 17 in Docker Compose |
| Data access | Spring `JdbcClient` with parameterized SQL |
| LLM | Official `com.openai:openai-java` SDK and Responses API |
| HTTP | Browser `fetch` |
| Tests | JUnit/Spring tests, Vitest with Testing Library, TypeScript production build, manual UI checks |

Do not change the stack during the week.

## 0.5 The learning loop for every task

Each task has five parts:

1. **Learn:** Read the concept and predict how it applies.
2. **Build:** Ask Codex to make only that task's smallest change.
3. **Inspect:** Read every changed line. Ask about anything you cannot explain.
4. **Verify:** Run the stated check yourself.
5. **Explain:** Answer the teach-back question without copying Codex.

Mark a task complete only when the behavior works **and** you can explain it.

Read sections 0 and 1 before Day 1. After that, read only the current day's section. Save sections 9–13 for Day 7 and blocker/reference use; do not try to memorize the whole guide at once.

Use `LEARNING_LOG.md`. For every task, write three original sentences:

- what the concept means;
- what changed;
- what failed or how you verified it.

## 0.6 Codex tutor instruction

Give Codex this instruction once:

> Read `Industrial_Trend_Explorer_7_Day_Codex_Tutorial_Reviewed_v1.2.md` completely. Act as an incremental programming tutor for a Java backend engineer who is new to JavaScript, TypeScript, React, and LLM applications. Work on only the task ID I request. Before editing, explain that task with one tiny example and name the files you expect to change. Implement the smallest solution that preserves this guide's contracts and scope. Run only relevant checks and report their real output. Never advance to another task, expose a secret, silently replace live AI with a mock, or add optional features. End with: files changed, verification result, one teach-back question, and the next task ID. Stop.

For each task, send:

> Do D1.1 only, following the tutorial. Explain, implement, verify, ask the teach-back question, and stop.

Replace `D1.1` with the current task ID.

## 0.7 Preflight gate — 25 minutes

Run all commands in one WSL/Linux environment:

```bash
node --version
npm --version
java -version
mvn --version
docker --version
docker compose version
docker info
git --version
```

Current Vite requires a supported Node version. Check the official Vite guide before scaffolding. At the time of this review, Node and npm were missing from the current shell; install a current Node LTS in the same WSL environment before Day 1.

Also confirm before starting:

- Docker Desktop/daemon is running.
- You can dedicate close to two focused hours on most days.
- You have an OpenAI API key, API billing/credits, and permission to make one low-cost request if live AI is a required result.
- You will never paste the API key into Codex chat or commit it.

From the repository root:

```bash
git init
```

Create `LEARNING_LOG.md` and a root `.gitignore`. If Node, Docker, or Git remains unavailable, resolve it before Day 1. Setup time lost to a broken prerequisite cannot be recovered by adding more features later.

**Command convention:** Start every task in the repository root. Every command later in this guide either uses an explicit `cd frontend` / `cd backend` or runs against a root-level file. When a development server occupies a terminal, leave it running and open another terminal at the repository root.

## 0.8 Definition of done

The project is complete only when:

- [ ] PostgreSQL starts with `docker compose up -d`.
- [ ] Re-running the SQL seed does not duplicate readings.
- [ ] Java retrieves PostgreSQL data through `JdbcClient`.
- [ ] React retrieves Java JSON rather than final hardcoded data.
- [ ] Both sensors display 48 sorted readings and the correct unit.
- [ ] Summary values and two anomalies match deterministic expectations.
- [ ] Loading, empty, error, and success states are visible and truthful.
- [ ] Explanation is requested only by button click.
- [ ] The browser never receives `OPENAI_API_KEY`.
- [ ] Mock results say `MOCK — NOT AI`.
- [ ] Live failures return an error rather than silently returning mock text.
- [ ] At least one real LLM response succeeded if live API access was available.
- [ ] Backend tests, one React component test, and `npm run build` pass.
- [ ] README commands reproduce the local application.
- [ ] You can answer the interview checklist in section 10 without reading generated answers.

If external API access is unavailable, the application can still be technically finished in explicit mock mode, but you must describe the live integration as **implemented but not verified**, not as a successful production AI feature.

## 0.9 Time rules

- Stop when the day's checkpoint passes.
- Do not borrow time for cosmetic work.
- If a task exceeds its estimate by 20 minutes, record the exact blocker and ask Codex for the smallest diagnostic step.
- PostgreSQL is mandatory. An in-memory Java repository is not an acceptable final fallback.
- Preserve working code before changing the next layer.
- The planned work requires 12 hours 10 minutes. Keep the remaining 1 hour 50 minutes for installation, debugging, or one external-service retry; do not convert it into optional features.

---

# 1. Fixed product and API contract

Codex must preserve this section.

## 1.1 Deterministic sensor data

Two sensors:

| ID | Name | Unit | Inclusive normal range |
|---|---|---|---|
| `reactor-temp` | Reactor Temperature | °C | 60.0–80.0 |
| `pump-pressure` | Pump Pressure | bar | 2.0–5.0 |

Each sensor has 48 readings at 30-minute intervals beginning at `2026-10-01T00:00:00Z`.

For zero-based index `i` from 0 through 47:

- Temperature normally equals `70.0 + ((i % 5) - 2)`.
- Pressure normally equals `3.5 + 0.1 * ((i % 5) - 2)`.
- Override temperature index 12 with 86.0 and index 36 with 88.0.
- Override pressure index 12 with 5.8 and index 36 with 5.9.
- An anomaly is `value < normalMin || value > normalMax`.
- A value exactly on a boundary is normal.

Expected summaries:

| Sensor | Count | Min | Max | Average | Anomalies |
|---|---:|---:|---:|---:|---:|
| Reactor Temperature | 48 | 68.0 | 88.0 | 70.66666666666667 | 2 |
| Pump Pressure | 48 | 3.3 | 5.9 | 3.59375 | 2 |

Java is the authoritative calculation layer in the final application. The LLM never calculates or decides anomalies.

## 1.2 PostgreSQL schema

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

Use checked-in `db/schema.sql` and `db/seed.sql` executed through `psql`. Do not also enable Spring automatic SQL initialization.

The seed must use `INSERT ... ON CONFLICT DO NOTHING` and `generate_series(0, 47)` with the formulas above. Never automatically drop tables.

## 1.3 REST endpoints

### `GET /api/sensors`

```json
[
  {
    "id": "reactor-temp",
    "name": "Reactor Temperature",
    "unit": "°C",
    "normalMin": 60.0,
    "normalMax": 80.0
  }
]
```

The real response contains both sensors.

### `GET /api/sensors/{sensorId}/trend`

```json
{
  "sensor": {
    "id": "reactor-temp",
    "name": "Reactor Temperature",
    "unit": "°C",
    "normalMin": 60.0,
    "normalMax": 80.0
  },
  "readings": [
    {
      "timestamp": "2026-10-01T00:00:00Z",
      "value": 68.0,
      "anomaly": false
    }
  ],
  "summary": {
    "count": 48,
    "min": 68.0,
    "max": 88.0,
    "avg": 70.66666666666667,
    "anomalyCount": 2,
    "firstTimestamp": "2026-10-01T00:00:00Z",
    "lastTimestamp": "2026-10-01T23:30:00Z"
  }
}
```

The example shortens `readings` to one item; the real response contains 48 chronological items.

For a known sensor with no readings, return an empty readings array, count and anomaly count of zero, and `null` for min, max, average, and first/last timestamps. Unknown sensor IDs return 404.

### `POST /api/sensors/{sensorId}/explanation`

No request body is required.

```json
{
  "sensorId": "reactor-temp",
  "text": "The simulated temperature remained mostly within its configured range...",
  "mode": "LIVE"
}
```

`mode` is exactly `LIVE` after a genuine successful model request and `MOCK` for the deterministic mock. A live error must return non-2xx; it must not fall back to mock automatically.

## 1.4 Data flow

```text
selection
  → React state
  → fetch /api/sensors/{id}/trend
  → Spring controller
  → service
  → JdbcClient repository
  → PostgreSQL
  → Java anomaly and summary calculation
  → typed JSON
  → React chart and summary

button click
  → POST /api/sensors/{id}/explanation
  → Java reloads trusted data and summary
  → OpenAI Responses API
  → plain generated text with LIVE/MOCK label
```

## 1.5 Expected repository layout

```text
industrial-trend-explorer/
  Industrial_Trend_Explorer_7_Day_Codex_Tutorial_Reviewed_v1.2.md
  README.md
  LEARNING_LOG.md
  .gitignore
  compose.yaml
  db/
    schema.sql
    seed.sql
  backend/
    pom.xml
    src/main/java/...
    src/main/resources/application.properties
    src/test/java/...
  frontend/
    src/
      App.tsx
      api.ts
      types.ts
      components/
        SensorSelector.tsx
        SensorSelector.test.tsx
        TrendChart.tsx
        SummaryCards.tsx
        AiExplanation.tsx
```

`demoData.ts` is a temporary learning aid on Days 2–3 and is intentionally absent from the final layout. Delete it on Day 5 after PostgreSQL-backed fetching succeeds.

---

# 2. Day 1 — JavaScript, TypeScript, and JSX

**Budget: 95 minutes**  
**Result:** Vite runs, basic JavaScript transformations make sense, and the project has explicit TypeScript contracts.

### - [ ] D1.1 — Scaffold and inspect Vite (15 min)

**Learn:** Node runs frontend tooling; npm manages packages; Vite provides the development server and production build; React renders UI.

**Build:**

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```

Remove the decorative starter content. Keep a heading that says `Industrial Trend Explorer` and the simulated-data warning.

Leave the Vite server running for the browser check, then use a second root terminal or stop it with `Ctrl+C`.

**Verify:** The browser renders the heading without console errors.

**Explain:** What is the difference between Node, Vite, TypeScript, and React?

### - [ ] D1.2 — Essential JavaScript for React (25 min)

**Learn:** `const`, arrays, objects, functions, arrow functions, template strings, `map`, `filter`, and immutability.

**Build:** Create a temporary `src/learning.ts` and call it once from `main.tsx`. Use three numeric readings to:

- create an object with `timestamp` and `value`;
- use `map` to produce display labels;
- use `filter` to select values greater than 80;
- write an `average(values)` function without mutating the array;
- use object spread to create a changed copy rather than editing the original.

Inspect the results in browser DevTools. Remove the import from `main.tsx` after the exercise; keep the file until the Day 1 checkpoint.

**Verify:** You can predict each console value before refreshing.

**Explain:** Why do React programs prefer creating a new object or array instead of mutating an existing one?

### - [ ] D1.3 — TypeScript contracts and narrowing (30 min)

**Learn:** A type describes allowed compile-time shapes. TypeScript is structurally typed: compatibility depends on an object's shape, not its class name. Both `type` and `interface` can describe objects; a `type` also expresses unions directly. Union types constrain alternatives. An optional field may be absent, while `null` is an explicit value. `unknown` requires a check before use; `any` disables useful checking. Generics preserve a relationship between input and output types. Types disappear at runtime.

**Build:** Create `src/types.ts` with:

- `Sensor`;
- `Reading`;
- `Summary` with nullable empty-data fields;
- `TrendResponse`;
- `AiMode = 'LIVE' | 'MOCK'`;
- `Explanation`.

Add a small generic `first<T>(items: T[]): T | undefined` exercise to `learning.ts`, plus one temporary object type containing an optional `description?: string` field. Deliberately assign a string to a numeric field, observe the compiler error, and then fix it.

**Verify:** From the repository root, `cd frontend && npm run build` succeeds after the intentional error is removed.

**Explain:** What does TypeScript catch, and what can it not prove about JSON received over the network?

### - [ ] D1.4 — First React component and JSX (20 min)

**Learn:** A React component is a function that returns JSX. JSX uses braces for JavaScript expressions. Rendering is a calculation from current inputs to UI.

**Build:** In `App.tsx`, create one typed local sensor and display its name, unit, and normal range. Extract a small `SensorDetails` component that receives the sensor through props.

**Verify:** Changing the local object's name changes the rendered page after save.

**Explain:** What is the difference between a component, JSX, and the DOM element shown by the browser?

### - [ ] D1.5 — Day 1 checkpoint (5 min)

- Delete `learning.ts` after copying your three learning sentences into `LEARNING_LOG.md`.
- Run `cd frontend && npm run build` from the repository root.
- Commit: `Day 1: JavaScript TypeScript and JSX foundations`.

**Interview capsule:** Explain `unknown` versus `any`, a union type, a generic type parameter, and why TypeScript does not validate network data.

---

# 3. Day 2 — React components, props, state, and events

**Budget: 95 minutes**  
**Result:** A local typed application lets the user select a sensor and renders deterministic information.

### - [ ] D2.1 — Deterministic demo data (20 min)

**Learn:** Arrays of typed objects, pure functions, `map`, stable IDs, and why random render-time data is difficult to test.

**Build:** Create `demoData.ts` with the two sensors and 48 readings per sensor using section 1.1 formulas. A pure function must add the anomaly boolean. Do not manually type 96 rows.

**Verify:** Log or test that each array has 48 readings and exactly two anomalies, then remove the temporary log.

**Explain:** Why is a pure generator with fixed timestamps easier to test than `Math.random()`?

### - [ ] D2.2 — Props and component boundaries (25 min)

**Learn:** Props are typed inputs owned by a parent. Data flows down; callback events flow up.

**Build:** Create `SensorSelector.tsx` with:

```ts
type SensorSelectorProps = {
  sensors: Sensor[];
  selectedId: string;
  onChange: (sensorId: string) => void;
};
```

Render an associated `label`, one controlled `select`, and one `option` per sensor. Use the sensor ID as the React key.

**Verify:** Two options appear. The displayed choice matches `selectedId`.

**Explain:** Why should the parent own the selected sensor rather than the selector owning application-wide state?

### - [ ] D2.3 — State and controlled events (25 min)

**Learn:** `useState` stores UI state. Calling its setter schedules another render. A controlled input receives its current value and change handler from React.

**Build:** Put `selectedSensorId` in `App`. Connect the selector callback. Derive the selected sensor from the sensor array rather than storing a duplicate sensor object in state.

**Verify:** Switching sensors updates the visible name, unit, and range without a page reload.

**Explain:** Describe render → event → state update → render. Why is duplicated derived state risky?

### - [ ] D2.4 — Lists, keys, and conditional rendering (20 min)

**Learn:** `map` turns data into elements; stable keys preserve identity; conditional JSX represents different states.

**Build:** Show a short list containing only the two anomaly readings for the selected sensor. Show `No anomalies` if the filtered array is empty. Do not use array indexes as keys when a timestamp is available.

**Verify:** Both sensors show two timestamped anomalies.

**Explain:** What problem does a stable React key solve?

### - [ ] D2.5 — Day 2 checkpoint (5 min)

- Run `cd frontend && npm run build` from the repository root.
- Inspect React DevTools or the browser console for warnings.
- Commit: `Day 2: React props state and events`.

**Interview capsule:** Explain props versus state, controlled inputs, derived state, immutable updates, and stable keys.

---

# 4. Day 3 — Chart, summaries, and UI states

**Budget: 90 minutes**  
**Result:** The frontend is complete using temporary local data.

### - [ ] D3.1 — Install and understand Recharts (10 min)

**Learn:** A third-party component receives data through props. React composes it like your own components.

```bash
cd frontend
npm install recharts
```

Read only the basic `LineChart` example in the official Recharts documentation.

**Verify:** From the repository root, `cd frontend && npm run build` still succeeds.

**Explain:** What did npm add to `package.json` and the lockfile?

### - [ ] D3.2 — Typed trend chart (35 min)

**Learn:** Component composition, chart data props, axes, tooltips, and presentation versus data ownership.

**Build:** Create `TrendChart.tsx` accepting `readings` and `unit`. Use one `ResponsiveContainer`, `LineChart`, `XAxis`, `YAxis`, `Tooltip`, and `Line`. Give the chart wrapper `width: 100%` and an explicit `height: 320px` so the responsive chart has measurable dimensions. Show one sensor at a time. Use simple UTC labels. Do not build custom SVG or animations.

**Verify:** The chart changes with the selector and shows the correct unit.

**Explain:** Why should `TrendChart` receive data through props instead of fetching it?

### - [ ] D3.3 — Pure summary and presentation (20 min)

**Learn:** Pure derived calculations, `reduce`, nullable empty results, and keeping numbers numeric until display formatting.

**Build:** For Day 3 only, calculate count, min, max, average, and anomaly count from local readings. Create `SummaryCards.tsx`. Format displayed decimals without converting stored state to strings.

**Verify:** Values match section 1.1 for both sensors.

**Explain:** Why is `"70.7"` unsuitable as the application's stored average?

### - [ ] D3.4 — Loading, empty, error, success (20 min)

**Learn:** Remote UI behaves like a state machine. Old data must not be presented under a new selection.

**Build:** Add a small discriminated union for UI status:

```ts
type LoadState =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; message: string }
  | { status: 'success' };
```

Temporarily render each branch, then restore success. Do not simulate network delays or create a status component library.

**Verify:** You have personally seen all four branches and the final page is back in success.

**Explain:** How does TypeScript narrow a discriminated union?

### - [ ] D3.5 — Day 3 checkpoint (5 min)

- Add minimal readable CSS and a visible dropdown label.
- Check a narrow browser width.
- Run `cd frontend && npm run build` from the repository root.
- Commit: `Day 3: local trend chart and UI states`.

**Interview capsule:** Explain composition, derived values, conditional rendering, why state should be minimal, and when memoization is unnecessary.

---

# 5. Day 4 — PostgreSQL-backed Java API

**Budget: 110 minutes**  
**Result:** PostgreSQL, Spring Boot, `JdbcClient`, and the final GET endpoints work. There is no Java in-memory repository phase.

### - [ ] D4.1 — Start PostgreSQL (15 min)

**Learn:** The container runs a database process; the named volume persists data; the host port maps to the container port.

**Build:** Create root `compose.yaml` with one `postgres:17` service named `db`:

- database `industrial_trends`;
- user `app`;
- local-only password `local_dev_only`;
- host port 55432 to container port 5432;
- named volume.

Run:

```bash
docker compose up -d
docker compose ps
docker compose exec db pg_isready -U app -d industrial_trends
```

**Verify:** PostgreSQL reports ready.

**Explain:** Why does Java use `localhost:55432` while PostgreSQL listens on 5432 inside the container?

### - [ ] D4.2 — Schema and idempotent seed (25 min)

**Learn:** Primary keys, foreign keys, `TIMESTAMPTZ`, composite identity, and idempotent initialization.

**Build:** Create `db/schema.sql` from section 1.2. Create `db/seed.sql` using the two sensor rows, `generate_series(0, 47)`, the fixed formulas, anomaly overrides, and `ON CONFLICT DO NOTHING`.

Run:

```bash
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/schema.sql
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/seed.sql
docker compose exec -T db psql -U app -d industrial_trends -c 'SELECT sensor_id, COUNT(*) FROM readings GROUP BY sensor_id ORDER BY sensor_id;'
```

Run the seed a second time.

**Verify:** Both runs end with exactly 48 rows per sensor.

**Explain:** Why is `(sensor_id, observed_at)` the correct composite primary key?

### - [ ] D4.3 — Generate the Spring Boot application (15 min)

**Learn:** Spring Web handles HTTP; JDBC connects to relational data; the PostgreSQL driver implements the database protocol.

**Build:** Generate `backend` using Spring Initializr with Maven, Java 17+, Spring Web, JDBC API, and PostgreSQL Driver. Configure the datasource for `localhost:55432` with environment-variable overrides and local documented defaults. Disable Spring SQL auto-initialization because SQL is run manually.

Add `GET /api/health` returning `{"status":"ok"}`.

**Verify:** From the repository root, start the application with `cd backend && ./mvnw spring-boot:run`; the health endpoint responds.

**Explain:** What responsibilities belong to the controller, service, and repository?

### - [ ] D4.4 — Repository, calculations, and GET endpoints (40 min)

**Learn:** Parameterized SQL, row mapping, DTOs, service logic, and keeping the REST contract independent of database columns.

**Build:**

- Java records matching `Sensor`, `Reading`, `Summary`, and `TrendResponse`.
- A `JdbcClient` repository for sensors and chronological readings.
- Parameter binding for `sensorId`; never concatenate it into SQL.
- A pure service calculation for anomaly flags and summary statistics.
- `GET /api/sensors` and `GET /api/sensors/{sensorId}/trend`.
- 404 for an unknown sensor.

Do not add JPA, Lombok, a mapper framework, or global exception infrastructure.

**Verify:** `curl` returns two sensors and a 48-reading trend. Unknown ID returns 404.

**Explain:** Why are parameterized queries safer than building SQL strings?

### - [ ] D4.5 — Minimal backend tests and checkpoint (15 min)

**Build:** Test:

- exact boundary values are normal;
- fixed temperature summary matches section 1.1, comparing floating-point averages with tolerance `1e-9` rather than exact equality;
- empty input does not divide by zero;
- unknown sensor returns 404 using the simplest existing Spring test setup.

Run:

```bash
cd backend
./mvnw test
```

Commit: `Day 4: PostgreSQL-backed Java trend API`.

**Interview capsule:** Explain relational keys, timestamp-with-time-zone, repository/service/controller separation, DTOs, and why the backend owns calculations.

---

# 6. Day 5 — React fetch, effects, and runtime data

**Budget: 100 minutes**  
**Result:** React uses the PostgreSQL-backed Java API, and temporary demo data is no longer in the final path.

### - [ ] D5.1 — Typed API module and runtime checks (25 min)

**Learn:** A Promise represents a future result. `async/await` organizes asynchronous control flow. A TypeScript assertion does not validate JSON at runtime.

**Build:** Configure the Vite development proxy from `/api` to `http://localhost:8080`. Create `api.ts` with:

- `getSensors()`;
- `getTrend(sensorId, signal)`;
- rejection of non-2xx responses;
- small runtime guards checking arrays, required IDs, and numeric reading values.

Use `unknown` for parsed JSON before checking it. Do not add a validation dependency.

**Verify:** Requesting `http://localhost:5173/api/sensors` returns backend JSON through Vite.

**Explain:** Why does `response.json() as TrendResponse` provide no runtime guarantee?

### - [ ] D5.2 — Fetch sensor data with effects (35 min)

**Learn:** `useEffect` synchronizes a component with an external system. Its dependency array controls when synchronization is repeated. Vite's development `StrictMode` can run an extra setup/cleanup cycle; correct cleanup keeps that development check safe.

**Build:**

- Fetch sensors once when `App` mounts.
- Fetch the selected trend when `selectedSensorId` changes.
- Store a discriminated loading/empty/error/success state.
- Render the chart and summary only from the successful response.
- Remove `demoData` imports from the application. After both API-backed sensors work, delete `demoData.ts` so dead learning data cannot be mistaken for the final source.

Do not fetch an explanation in an effect.

**Verify:** Both selections load PostgreSQL-backed data. Stopping Java produces a readable error.

**Explain:** Why is server fetching an effect, while an explanation button belongs in an event handler?

### - [ ] D5.3 — Cleanup and stale-response protection (20 min)

**Learn:** Requests can finish out of order. Effect cleanup prevents old work from replacing current state.

**Build:** Create an `AbortController` inside the trend effect, pass its signal to `getTrend`, and abort in the cleanup function. Ignore abort errors while showing real network errors.

**Verify:** Rapidly switch sensors. Temperature data never appears under the pressure heading or vice versa.

**Explain:** How can request A start first but finish after request B?

### - [ ] D5.4 — Failure checklist (15 min)

Manually verify:

- initial loading;
- both sensors;
- 48 readings;
- correct units and summaries;
- backend stopped;
- database stopped;
- empty response branch by temporarily returning a valid empty `TrendResponse`, then restoring the API call;
- unknown sensor through direct API request;
- recovery after services restart.

Record evidence in `LEARNING_LOG.md`.

### - [ ] D5.5 — Day 5 checkpoint (5 min)

- Run `cd frontend && npm run build` from the repository root.
- Run `cd backend && ./mvnw test` from the repository root.
- Commit: `Day 5: React Java PostgreSQL integration`.

**Interview capsule:** Explain Promise, `async/await`, effect dependencies, cleanup, runtime JSON checks, and stale-request races.

---

# 7. Day 6 — Grounded LLM feature

**Budget: 115 minutes**  
**Result:** A button requests a short explanation from the Java backend, with truthful mock/live modes and no browser secret.

The official OpenAI documentation is authoritative and version-sensitive. On Day 6, open the current official Java quickstart, copy the exact `com.openai:openai-java` version it shows, and follow its current Responses API example. Do not copy an SDK or model version from this tutorial's prose. The official example reads credentials from the environment through `OpenAIOkHttpClient.fromEnv()`. Keep the model configurable through `OPENAI_MODEL` rather than hardcoding an account assumption.

## D6 concepts to understand before coding

- **Model:** the system generating output.
- **Prompt/input:** instructions and supplied context.
- **Token:** a unit used to process text and measure usage.
- **Context window:** the information available to one request.
- **Grounding:** supplying trusted facts the response must use.
- **Hallucination:** plausible but unsupported generated content.
- **Prompt injection:** untrusted text attempting to override instructions.
- **Evaluation:** repeatable checks of output quality and safety.

### - [ ] D6.1 — Write the grounded prompt (20 min)

**Learn:** Deterministic application logic and generated language have different trust levels.

**Build:** Create a prompt template containing only:

- sensor name and unit;
- configured range;
- count, min, max, average, anomaly count;
- anomaly timestamps and values;
- the following instruction:

> Explain this synthetic sensor summary in 3–5 short sentences. Use only supplied facts. State the anomaly count and range comparison. Do not invent causes, predictions, diagnoses, maintenance advice, or live operational claims. Explicitly say this is simulated data and not operational guidance.

No raw user prompt exists in this project.

**Verify:** Highlight the source of every factual claim the model is allowed to make.

**Explain:** Why should Java calculate anomalies instead of asking the model?

### - [ ] D6.2 — Mock provider and POST endpoint (20 min)

**Learn:** Dependency injection makes external services replaceable and tests deterministic.

**Build:**

- A small `ExplanationService` interface.
- `LLM_MODE=mock` and `LLM_MODE=live` configuration.
- A deterministic mock using the real Java summary.
- `POST /api/sensors/{sensorId}/explanation`.
- `mode:"MOCK"` for mock output.
- No automatic live-to-mock fallback.

**Verify:** Mock response contains current sensor facts and unknown sensor returns 404.

**Explain:** Why is a silent mock fallback dishonest and difficult to operate?

### - [ ] D6.3 — Official SDK and one live call (35 min)

**Learn:** The SDK wraps HTTPS; authentication, billing, rate limits, timeouts, and generated output remain application concerns.

**Build:**

- Add the verified official `openai-java` Maven dependency.
- Create the client only in live mode.
- Read `OPENAI_API_KEY` from the server environment.
- Read the verified supported model ID from `OPENAI_MODEL`.
- Before starting Java in live mode, export `OPENAI_API_KEY`, `OPENAI_MODEL`, and `LLM_MODE=live` in that same backend terminal. Never write the real values into a tracked file.
- Use the Responses API following the current official Java example.
- Send the grounded prompt and extract plain output text.
- Apply a request timeout.
- Convert provider errors into a stable, generic non-2xx browser response; keep any server log sanitized and free of credentials or full prompts.
- Never log credentials or the complete authenticated request.

Make one manual low-cost request.

**Verify:** A successful genuine request returns `mode:"LIVE"`. An invalid key produces an error, not mock or fake live success.

**Explain:** Why would a variable named `VITE_OPENAI_API_KEY` expose the key to browser code?

### - [ ] D6.4 — React explanation button (25 min)

**Learn:** User events, pending state, disabling duplicate actions, and rendering generated text as untrusted plain text.

**Build:**

- Add `getExplanation(sensorId)` to `api.ts`.
- Create `AiExplanation.tsx`.
- Show `Explain trend with AI`, `Generating...`, result, and error states.
- Display `LIVE AI` or `MOCK — NOT AI`.
- Disable the button while pending.
- Clear old output when the selected sensor changes.
- Render text normally; never use `dangerouslySetInnerHTML`.
- Remount with `key={selectedSensorId}` or abort the old request so a late result cannot move to another sensor.

**Verify:** No request occurs on page load or sensor selection; one click creates one request.

**Explain:** Why is model output unsafe to inject as HTML?

### - [ ] D6.5 — Security and LLM checkpoint (15 min)

- Confirm the key exists only in the Java environment.
- Confirm `.env` and `.env.local` are ignored.
- Run `cd backend && ./mvnw test` from the repository root.
- Run `cd frontend && npm run build` from the repository root.
- Commit: `Day 6: grounded server-side LLM explanation`.

**Interview capsule:** Explain grounding, hallucinations, prompt injection, tokens, context, deterministic mock tests, rate/cost controls, retries, output evaluation, and why this is an LLM application rather than production AI infrastructure.

Official reference: https://developers.openai.com/api/docs/quickstart

---

# 8. Day 7 — Verification, README, and interview ownership

**Budget: 100 minutes**  
**Result:** The application is reproducible, honestly described, and explainable without Codex.

### - [ ] D7.1 — Backend checks and one React behavior test (35 min)

**Backend tests:**

- exact boundaries are normal;
- fixed summaries match expected values;
- empty summary is controlled;
- unknown sensor returns 404;
- mock explanation says `MOCK`;
- a provider failure does not become a success;
- no automated test calls a paid model.

Run `cd backend && ./mvnw test` from the repository root.

**Frontend behavior test:**

- From the repository root, run `cd frontend && npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`.
- Add the smallest Vitest `jsdom` setup and an npm `test` script.
- Create one `SensorSelector.test.tsx` test that renders two options, selects Pump Pressure through the accessible combobox, and verifies the callback receives `pump-pressure`.
- From the repository root, run `cd frontend && npm run test -- --run`.
- From the repository root, run `cd frontend && npm run build`.

Do not test Recharts internals or CSS pixels.

**Explain:** Why should a React component test assert user-visible behavior rather than implementation details? Why should a unit test not expect exact prose from a real model?

### - [ ] D7.2 — Runnable README (15 min)

Document only verified facts:

- synthetic-data purpose;
- architecture;
- prerequisites and versions;
- PostgreSQL start and SQL initialization;
- Java and React start commands;
- ports and environment variables;
- mock/live modes;
- API endpoints;
- test/build commands;
- stop commands;
- known limitations.

Include `.env.example` with variable names but no secrets.

**Verify:** Follow the README from a new terminal.

### - [ ] D7.3 — Final manual acceptance (10 min)

- [ ] Simulated-data warning visible.
- [ ] Two sensors selectable.
- [ ] 48 readings and correct unit.
- [ ] Expected summaries and two anomalies.
- [ ] Loading and backend/database error states.
- [ ] Rapid switching never shows stale data.
- [ ] No LLM request before click.
- [ ] Mock/live badge truthful.
- [ ] Changing sensor clears explanation.
- [ ] Narrow layout remains usable.
- [ ] Browser network requests contain no provider key.

### - [ ] D7.4 — No-Codex interview teach-back (25 min)

Answer aloud without Codex:

1. What JavaScript knowledge does React rely on?
2. What does TypeScript guarantee, and what remains a runtime concern?
3. Explain props, state, controlled inputs, rendering, and immutable updates.
4. When does `useEffect` run, and what does cleanup prevent?
5. Trace selection from the browser through Java and PostgreSQL and back.
6. Why are anomaly calculations deterministic while the explanation is generated?
7. What are grounding, hallucination, prompt injection, tokens, context, and evaluation?
8. Where does the API key live and why?
9. What would change for millions of time-series points or streaming input?
10. Which parts of the Seeq job description are supported by this project, and which require deeper professional experience?

For every weak answer, inspect the relevant source file and try again before asking Codex.

### - [ ] D7.5 — Demo and honest positioning (15 min)

Two-minute demo:

1. Select a sensor and identify the simulated-data warning.
2. Show the chart, range, summary, and two anomalies.
3. Select the second sensor and describe the React → Java → PostgreSQL flow.
4. Click the explanation button and identify mock or live mode.
5. Explain why calculations and the API key stay on the backend.
6. State one limitation: fixed historical data, no streaming, and no production authorization.

Commit: `Day 7: verified tutorial project and documentation`.

Truthful description after a successful live call:

> Built a personal industrial trend explorer with React, TypeScript, Java Spring Boot, PostgreSQL, deterministic anomaly metrics, and a server-side grounded LLM explanation feature.

Do not claim expertise in large React applications, industrial analytics, streaming systems, or generative-AI infrastructure from this project.

---

# 9. Concepts covered versus concepts only discussed

## 9.1 Implemented hands-on

**TypeScript**

- primitive and object types;
- arrays and typed functions;
- union and nullable types;
- callbacks and generics;
- `unknown` and narrowing;
- typed props and REST contracts;
- compile-time versus runtime validation.

**React**

- function components and JSX;
- props, state, events, and controlled inputs;
- lists, keys, conditional rendering, and composition;
- derived values and immutable updates;
- effects, dependencies, cleanup, and race prevention;
- HTTP state and plain-text rendering;
- basic accessibility labels;
- one user-focused component behavior test with Vitest and React Testing Library.

**LLM application**

- server-side API use;
- prompt plus trusted context;
- grounding and hallucination boundaries;
- mock/live separation;
- secrets, errors, timeout, rate/cost awareness;
- plain-text output and one manual evaluation.

**Data/backend**

- PostgreSQL schema, keys, time zones, idempotent seed;
- parameterized `JdbcClient` queries;
- REST DTOs and error codes;
- deterministic calculations and JUnit tests;
- end-to-end ownership.

## 9.2 Interview concepts discussed but not implemented

Be able to define these without claiming project experience:

- React routing, design systems, global state, server-state libraries, code splitting, performance profiling, and broader integration/end-to-end testing;
- frontend architecture for a large codebase;
- streaming ingestion, missing/out-of-order samples, downsampling, retention, partitioning, and time-series indexing;
- LLM structured outputs, tool calling, RAG, prompt/version management, evaluations, tracing, quotas, and production observability;
- authentication, authorization, abuse prevention, cloud deployment, and continuous delivery.

For a senior interview, connect leadership, mentoring, code review, agile delivery, and system-design questions to real examples from your five years of Java backend work. Do not invent those examples from this tutorial.

---

# 10. Essential interview checklist

You are ready to discuss the tutorial when every answer is clear and tied to code.

## TypeScript

- Why choose TypeScript over JavaScript for a multi-developer application?
- What is structural typing?
- When would you use `type` versus `interface`?
- How do unions and narrowing work?
- Why is `unknown` safer than `any`?
- What problem do generics solve?
- What is the difference between optional, `undefined`, and `null`?
- Why do TypeScript types not validate HTTP JSON?

## React

- What causes a component to render?
- What is the difference between props and state?
- Why should state be immutable and minimal?
- What is a controlled input?
- Why do lists need stable keys?
- What is an effect, and when should logic not be placed in one?
- What does effect cleanup do?
- What should a user-focused component test assert, and which implementation details should it avoid?
- How would a large application separate UI components, server state, routing, tests, and shared design elements?

## LLM applications

- What are model, prompt, token, context window, and generated output?
- What are grounding and hallucination?
- Why is generated prose not the source of truth?
- What is prompt injection?
- When would structured output, tool calling, or RAG be appropriate?
- How would you test a nondeterministic feature?
- How would production handle keys, rate limits, retries, cost, evaluation, and observability?
- What is the difference between this LLM application and AI infrastructure?

## End-to-end and time-series

- Trace a complete request through every layer.
- Why use `TIMESTAMPTZ` and chronological ordering?
- How are boundary values handled?
- Why is the seed deterministic and idempotent?
- How would the design change for streaming or millions of points?
- Which failure belongs to React, Java, PostgreSQL, or the external provider?

---

# 11. Blocker rules

## Node blocked

Use the official Vite and Node installation instructions in the same WSL environment. Do not mix Windows and WSL Node installations.

## PostgreSQL blocked

PostgreSQL is mandatory. Inspect Docker status, port 55432, container logs, credentials, and the exact `psql` error. Do not replace the final database with hardcoded Java data.

## Live LLM blocked

Finish the mock feature, tests, frontend behavior, and documentation. Mark live verification blocked with the exact provider/account error. Never claim a successful live integration without a real response.

## Task running long

Keep the last working checkpoint. Diagnose one layer at a time. Do not rebuild the repository, add a framework, or skip verification to save time.

---

# 12. Official documentation

Check current documentation when a version or method signature matters:

1. Vite: https://vite.dev/guide/
2. TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
3. React Learn: https://react.dev/learn
4. React TypeScript: https://react.dev/learn/typescript
5. React Effects: https://react.dev/learn/synchronizing-with-effects
6. Recharts: https://recharts.github.io/
7. Spring REST: https://spring.io/guides/gs/rest-service/
8. Spring SQL and `JdbcClient`: https://docs.spring.io/spring-boot/reference/data/sql.html
9. PostgreSQL: https://www.postgresql.org/docs/17/
10. OpenAI Java/Responses quickstart: https://developers.openai.com/api/docs/quickstart

---

# 13. First Codex interaction

Copy exactly:

> I am a Java backend developer learning JavaScript, TypeScript, React, and LLM application integration. Read `Industrial_Trend_Explorer_7_Day_Codex_Tutorial_Reviewed_v1.2.md` completely and follow its time budget, scope firewall, fixed contracts, and one-task-at-a-time learning loop. Start D1.1 only. Explain the concept first, make only the smallest required edits, run the stated verification, ask the teach-back question, and stop. Do not advance until I request the next task.

A successful week is not the largest application. It is a small application that works, is understood, is verified, and is described honestly.
