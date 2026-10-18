# Industrial Trend Explorer
## A seven-day, absolute-beginner frontend and LLM tutorial for a Java developer

**Guide version:** 2.0 · **Project directory:** `industrial-trend-explorer` · **Audience:** Comfortable with Java, unfamiliar with HTML, CSS, JavaScript, Node.js, npm, TypeScript, React, and LLM APIs.

> **The promise:** A small, working, locally running application that *you understand*. Not a large AI-generated codebase. The plan is about **2–3 focused hours per day**, approximately **18–21 hours over seven days**, if your computer is ready. It is a target, not a guarantee: installation, API access, and your learning pace can require more time. Do not skip understanding checks to hit a clock.

**What it does:** Select Reactor Temperature or Pump Pressure → see 48 synthetic measurements on a chart → see calculated statistics and out-of-range measurements → press a button to request a **grounded LLM explanation**. Java computes numbers. React presents them. PostgreSQL stores them. The LLM explains *existing facts* and does not diagnose equipment.

**This is a personal educational demo, not a Seeq product, not live industrial data, and not evidence of professional React expertise.** Display `SIMULATED DATA — NOT LIVE INDUSTRIAL DATA` on the page.

---

# START HERE: How to learn with Codex

## A. What you will see at the end

A single page with a heading, a sensor dropdown, a simple line chart, five statistics (count, minimum, maximum, average, anomaly count), an anomaly list, and an **Explain with AI** button. Two sensors only. **No** login, mobile app, real sensors, Kafka, streaming, cloud hosting, RAG, vector database, agents, routing, or animation.

**A successful week:** the app works locally, the code builds, the API key is private, the README reproduces the setup, and you can explain a data request from browser to PostgreSQL and back without asking Codex.

## B. Seven essential words (read before opening a terminal)

| Word | Meaning in this project | Java analogy |
|---|---|---|
| **Browser** | Chrome/Firefox executes the JavaScript that draws the page | Application runtime, but in the user's computer |
| **HTML** | Describes elements such as headings, paragraphs and buttons | The structure of a view |
| **CSS** | Controls size, spacing and appearance | View styling, not business logic |
| **JavaScript (JS)** | Program that runs in the browser; responds to user actions | A programming language, dynamically typed |
| **Node.js** | Executes JavaScript **outside** the browser, primarily for our build tools | JVM as a runtime, not a framework |
| **npm** | Downloads frontend libraries and runs project scripts | Similar role to Maven for dependencies and commands |
| **TypeScript (TS)** | JavaScript with static type checking before it runs | Like Java types conceptually; TS types do not exist at runtime |
| **React** | Library for creating the browser UI as reusable components | UI functions returning descriptions of elements |
| **Vite** | Starts the frontend development server and builds the production JS/CSS | Build/development tooling, not our Java REST API |
| **LLM** | Model that generates language from instructions and supplied context | An external service, not a deterministic calculation engine |

**Very important distinction:** React runs in the **browser**. Node runs the **development tools**. Spring Boot runs the **Java API**. PostgreSQL runs the **database**. Four different roles; do not confuse their ports or terminal windows.

```text
You click a browser button
  ↓ React / TypeScript (browser, local Vite server on port 5173)
  ↓ HTTP request to /api/... (Vite development proxy)
  ↓ Spring Boot Java API (port 8080)
  ↓ JdbcClient → PostgreSQL (host port 55432)
  ↑ JSON response → React displays chart and numbers

Only after clicking "Explain": Java calls an LLM service.
The browser NEVER gets an LLM API key.
```

## C. Folder names, terminal rules, and visible actions

All paths below start at the **repository root** (the `industrial-trend-explorer` folder). In VS Code choose **File → Open Folder** and select this root folder. In VS Code choose **Terminal → New Terminal** to run a command. The VS Code file explorer is where you create/edit files.

- **`pwd`** shows your current folder. **`ls`** lists files. **`cd folder`** enters a folder; **`cd ..`** returns one level. `Ctrl+C` stops the running command (such as a development server).
- Commands using `npm --prefix frontend ...` run the npm command in `frontend` without changing your terminal's current folder. This avoids a frequent beginner mistake of running `cd frontend` twice.
- Use **Terminal A** for the React/Vite development server, **Terminal B** for the Java backend, and **Terminal C** for short commands and Docker. Keep a running server in its terminal; do not type another command into the same terminal until it is stopped.
- Open the **browser Developer Tools** with `F12` (or Chrome menu → More tools → Developer tools). **Console** shows JS messages/errors. **Network** shows HTTP requests. **Elements** shows the resulting browser elements.
- **`package.json`** describes npm packages and scripts; **`package-lock.json`** records dependency resolution; **`node_modules/`** contains installed dependencies (never commit it). **`pom.xml`** serves a comparable purpose in Java.

## D. The Codex tutor contract (copy this into Codex once)

> Read `Industrial_Trend_Explorer_Absolute_Beginner_Codex_Guide_v2.md`. Act as a patient tutor for a Java programmer who has **zero frontend experience**. Respect the fixed scope and data/API contracts. **Never implement the whole lesson or several lessons at once.** When I say `Start D1.1`, begin with **only micro-step A** of that lesson. First define new words and syntax in plain English, show a tiny example (no more than ten lines), ask me to **predict** its output, and STOP for my response. After I answer, help me type or edit just the current change, identify the exact file path, and explain each new line. Run/show the real verification (browser result, output, or command). Ask me to explain the result in my own words. Do not proceed without my `Next`. Do not hide installation failures, secretly use mock data in live mode, make unrelated changes, install extra frameworks, or expose keys. For a difficult command explain where to run it and what success looks like. After each micro-step, report the file(s) changed, actual test result, and next step ID, then STOP.

**Commands you type to Codex:** `Start D1.1`; `Next` (continue *same* lesson's next micro-step); `I don't understand this line: ...`; `Show me the exact file before and after`; `Explain the error, do not fix it yet`; `Mark D1.1 complete and start D1.2`.

**Your responsibilities:** type at least **one meaningful line** per lesson, predict a result before running it, and answer each lesson's understanding question. Codex can scaffold boilerplate; it must not steal the learning. Maintain `LEARNING_LOG.md`: for each lesson write (1) what I learned, (2) where the data goes, (3) what I actually verified. If you cannot explain a line, ask Codex to teach it before moving on.

**Micro-step pattern used throughout this guide:**

1. **A · Understand:** the tiny idea and a prediction question.
2. **B · Do:** edit one small file or run one command; Codex points to exact lines.
3. **C · Verify:** real observed output (not an assumption).
4. **D · Teach back:** explain without copying Codex's wording.

**Important:** Lessons below give the destination and samples. Codex must unfold each A/B/C/D separately when teaching, rather than dump all code into the repository.

## E. Preflight before Day 1 (30–60 minutes, outside the daily lesson budget)

You previously used WSL/Linux. Use **one WSL terminal for all tools**, not a mixture of Windows Node and WSL npm. Run each line and read its output:

```bash
pwd
node --version
npm --version
java -version
mvn --version
docker --version
docker compose version
docker info
git --version
```

**Expected:** commands exist; `docker info` reaches a running daemon. If Node/npm are missing or too old, install a supported **Node LTS** using official installation instructions **inside WSL**, then reopen your terminal and rerun both version checks. Do **not** install the unrelated Ubuntu `codex` Snap package. The Vite docs currently require Node **20.19+ or 22.12+** (or a newer compatible version); check the current official requirement before choosing a Node release: https://vite.dev/guide/ . Codex should help you inspect, not guess your system state.

Create the root once, in the parent folder where you keep projects:

```bash
mkdir -p industrial-trend-explorer
cd industrial-trend-explorer
pwd
git init
```

Save **this guide** into that root with the exact name in section D. From then on, open this root in VS Code. Before each new day's work, `pwd` should end with `industrial-trend-explorer`.

Create `LEARNING_LOG.md` and a root `.gitignore` with at least:

```gitignore
node_modules/
frontend/dist/
backend/target/
.env
.env.*
!.env.example
*.log
```

**Preflight for live Gemini:** The optional live provider uses a Google AI Studio Gemini API key. Free-tier model access and rate limits may be available, but availability and terms change; check the official pricing/data-use pages before making a request. A ChatGPT subscription is unrelated to Gemini API access. Never paste a key into chat, source code, screenshots, or Git. You can finish the application in visibly labeled **MOCK — NOT AI** mode if live access is unavailable, but you cannot claim a successful Gemini integration without one real request returning `mode: "LIVE"`.

---

# The seven-day plan

| Day | Focus | Visible result | Suggested time |
|---|---|---|---|
| 1 | Browser, HTML, CSS, JavaScript, Node/npm/Vite | First interactive page; understand who runs what | 2.5 h |
| 2 | JavaScript data, TypeScript and first React props | Typed sensor UI with a parent and child component | 2.5 h |
| 3 | React events/state, local data, Recharts | Change sensor; see chart and calculated summary | 2.5–3 h |
| 4 | PostgreSQL + familiar Java REST layer | Two working GET endpoints returning real DB data | 2.5–3 h |
| 5 | Fetch, async/await, useEffect, errors | React connected to Spring/PostgreSQL | 2.5–3 h |
| 6 | LLM idea, prompt, mock, real API, button | Explicitly labeled explanation, safe API key | 2.5–3 h |
| 7 | One frontend test, final checks, README, demo | Reproducible project you can explain | 2 h |

**First priority:** one correct, teachable happy path. **Last priority:** decorative styling. If behind schedule, use the cut list at the end rather than adding hours of complexity or skipping understanding.

---

# Day 1: What is a frontend? Your first browser program

**Goal:** You know exactly what the browser, HTML, CSS, JS, Node, npm, Vite, and React do. You can click a simple button and explain the event.

### [ ] D1.1 · Open the right folder and learn the terminal (15 min)
**Learn:** A terminal runs text commands; `pwd` is current folder, `ls` lists contents. VS Code edits files; a browser displays results. **A:** Predict whether `cd frontend` will work before it exists. **B:** Run `pwd`, `ls`, `git status` from the root. Tell Codex what they print. **C:** Verify the guide is in this root and Git reports a repository. **D:** Explain why commands need a known working directory.

### [ ] D1.2 · Scaffold the frontend (20 min)
**Learn:** Scaffolding means generating starter files. npm is *not* Node; Vite is *not* the Java server. TypeScript is checked and transformed into browser-ready JavaScript.

**A:** Predict which program runs when you type `npm`, and which program actually renders `App.tsx` in the final browser. **B:** From the project root, execute:

```bash
npm create vite@latest frontend -- --template react-ts
npm --prefix frontend install
npm --prefix frontend run dev
```

If a setup prompt asks for installation, follow the documented option; do not create another nested `frontend/frontend` directory. The last command stays running in Terminal A.

**C:** Open the **local URL shown by Vite**, commonly `http://localhost:5173/`. Confirm the generated React page appears. In a separate terminal, run `npm --prefix frontend run build` from the root. **D:** Identify what `package.json`, `src/main.tsx`, and `src/App.tsx` each do. Do not memorize generated configuration files.

### [ ] D1.3 · A little HTML and CSS before React (25 min)
**Learn:** HTML is a hierarchy of elements. Tags such as `<h1>`, `<p>`, `<button>` open and close. CSS changes appearance using selectors and properties. These are not React concepts yet.

**A:** Predict what a heading and paragraph render in a browser. **B:** Create `frontend/public/basics.html` (Vite serves `public` files as static resources). Start with these lines; type at least the heading yourself:

```html
<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8"><title>First Page</title></head>
  <body>
    <h1>My first sensor page</h1>
    <p id="status">No sensor selected</p>
    <button id="choose">Choose a sensor</button>
  </body>
</html>
```

Open `http://localhost:5173/basics.html`. **B continued:** add in `<head>` a `<style>` tag containing `body { font-family: sans-serif; margin: 32px; }`; refresh and observe. **C:** Heading, paragraph, button and spacing appear; F12 → Elements shows those same elements. **D:** Explain HTML vs CSS vs browser DOM. (`DOM` means the browser's object representation of page elements.)

### [ ] D1.4 · JavaScript changes the page (25 min)
**Learn:** JS can select a browser element and listen for an event. `const` creates a binding; `document.querySelector` finds an element; `addEventListener` registers a callback; an arrow `() => { ... }` defines a function.

**A:** Predict whether clicking the button changes anything *before* JS is added. **B:** Add the following just before `</body>` in `basics.html`, one line at a time, asking Codex to explain each symbol:

```html
<script>
  const button = document.querySelector('#choose');
  const status = document.querySelector('#status');
  button.addEventListener('click', () => {
    status.textContent = 'Reactor Temperature selected';
  });
</script>
```

**C:** Refresh and click; paragraph changes. In F12 → Console, try `console.log('browser JavaScript works')`. **D:** Explain event → handler → changed DOM text. This direct DOM approach is only to teach the browser; later **React** updates the DOM for you.

### [ ] D1.5 · Variables, arrays, objects and functions (25 min)
**Learn:** JavaScript has objects `{...}`, arrays `[...]`, functions, and variable bindings. A property is a named value in an object. `const` prevents rebinding, but does not freeze the contents of an object.

**A:** Predict the output of each small expression; ask Codex about every unknown punctuation mark. **B:** In the browser Console, type each separately:

```js
const sensor = { id: 'reactor-temp', name: 'Reactor Temperature', unit: '°C' };
console.log(sensor.name);
const values = [68, 70, 86];
console.log(values[1]);
function above80(value) { return value > 80; }
console.log(above80(values[2]));
```

**C:** Expected outputs: `Reactor Temperature`, `70`, `true`. (If the console says `already declared`, refresh before repeating the `const` lines.) **D:** Compare an object to a simple Java DTO and an array to `List`, while noting the differences.

### [ ] D1.6 · Meet React after seeing plain HTML/JS (20 min)
**Learn:** React describes UI in **JSX**. JSX resembles HTML but appears inside a JavaScript/TypeScript component; `.tsx` means TypeScript **with JSX**. The component is a function. `main.tsx` starts React; `App.tsx` defines the main component.

**A:** Before changing anything, find `<App />` inside `frontend/src/main.tsx` and the `App` function in `frontend/src/App.tsx`. **B:** With Codex, remove the Vite starter graphics/counter and return only:

```tsx
function App() {
  return (
    <main>
      <h1>Industrial Trend Explorer</h1>
      <p>SIMULATED DATA — NOT LIVE INDUSTRIAL DATA</p>
    </main>
  );
}
export default App;
```

Keep CSS simple; don't create new frameworks. **C:** The main Vite URL shows both lines and `npm --prefix frontend run build` succeeds. **D:** Explain the difference between `basics.html` with direct DOM edits and `App.tsx` with React describing the UI.

### [ ] D1.7 · Day 1 checkpoint (10 min)
Add your own explanation to `LEARNING_LOG.md`; run the build; `git add . && git commit -m "Day 1: frontend foundations"`. **Stop if you cannot distinguish Node, npm, Vite, React and the browser.**

---

# Day 2: JavaScript → TypeScript → components

**Goal:** You can read common JS/TS syntax and understand a typed React component. Don't build a big page yet.

### [ ] D2.1 · Transform an array with `map` and `filter` (25 min)
**Learn:** `map` transforms each element; `filter` keeps matching elements. `value => value * 2` is shorthand for a function. `...oldObject` copies its enumerable properties into a new object (shallow copy).

**A:** Predict results before running. **B:** In F12 → Console, use:

```js
const readings = [68, 86, 72];
console.log(readings.map(value => value + 1));
console.log(readings.filter(value => value > 80));
const first = { value: 68, unit: '°C' };
const changed = { ...first, value: 69 };
console.log(first.value, changed.value);
```

**C:** Outputs are `[69, 87, 73]`, `[86]`, and `68 69`. **D:** Why does React favor replacing data instead of mutating the same object in place? No need to master `reduce` yet.

### [ ] D2.2 · Read imports and exports (15 min)
**Learn:** `export` makes a value or type available to other files; `import` brings it into the current file; `./` is a path relative to the importing file.

**A:** In `App.tsx`, identify its imports. Predict what happens when you remove an import whose name is still used. **B:** Codex creates `frontend/src/sensors.ts` with `export const sensorNames = ['Reactor Temperature', 'Pump Pressure']` and helps you import it in `App.tsx`; display the first name. **C:** Browser shows `Reactor Temperature`; build passes. **D:** Explain export → import → JSX display.

### [ ] D2.3 · Your first TypeScript type (25 min)
**Learn:** A TS type describes the expected properties, like a compile-time contract. Unlike a Java class, the type does not create an object at runtime.

**A:** Predict whether a `value` property typed `number` may hold `'86'` with quotes. **B:** Create `frontend/src/types.ts`:

```ts
export type Sensor = {
  id: string;
  name: string;
  unit: string;
  normalMin: number;
  normalMax: number;
};
```

Create an actual `Sensor` in `App.tsx`, using the type. Temporarily change `normalMin: 60` to `normalMin: '60'`. **C:** `npm --prefix frontend run build` should fail with a type error. Restore the number and confirm success. **D:** Distinguish code caught at build time from a network payload that TypeScript hasn't validated.

### [ ] D2.4 · Arrays and optional/nullable types (20 min)
**Learn:** `Sensor[]` is an array of Sensor objects. `value?: number` means the field might be missing; `number | null` explicitly allows `null`; `'LIVE' | 'MOCK'` allows exactly two strings.

**A:** Predict if `const mode: 'LIVE' | 'MOCK' = 'OTHER'` compiles. **B:** Codex adds final data contracts to `types.ts` **one at a time**:

```ts
export type Reading = { timestamp: string; value: number; anomaly: boolean };
export type Summary = {
  count: number; min: number | null; max: number | null;
  avg: number | null; anomalyCount: number;
  firstTimestamp: string | null; lastTimestamp: string | null;
};
export type TrendResponse = { sensor: Sensor; readings: Reading[]; summary: Summary };
export type Explanation = { sensorId: string; text: string; mode: 'LIVE' | 'MOCK' };
```

**C:** TS build passes. **D:** Explain why an empty trend needs nullable min/avg. Recognize `type` and `interface` as two ways to describe object shapes; there is no need to explore all differences this week.

### [ ] D2.5 · JSX expressions and props (30 min)
**Learn:** `{...}` inside JSX evaluates an expression. **Props** are inputs sent from a parent component to a child. They flow downward, like function arguments, and the child should not mutate them.

**A:** Predict what `<h2>{sensor.name}</h2>` displays. **B:** Codex creates `frontend/src/components/SensorDetails.tsx`:

```tsx
import type { Sensor } from '../types';

type Props = { sensor: Sensor };

export function SensorDetails({ sensor }: Props) {
  return <p>{sensor.name} ({sensor.unit})</p>;
}
```

Have Codex explain the curly-brace parameter **destructuring** as the short form of `props.sensor`. In `App.tsx`, create one Sensor object, import the child, and render `<SensorDetails sensor={sensor} />`. **C:** Browser shows its name and unit, build passes. **D:** Trace `App` object → prop → child → JSX → browser.

### [ ] D2.6 · Create a static selector, no state yet (15 min)
**Learn:** A `select` element shows options. `map` can turn an array of sensors into one option per sensor. A `key` gives each element stable identity.

**A:** Predict how many options two sensors produce. **B:** Codex adds both `Sensor` objects in one `frontend/src/demoData.ts` and maps them to `<option key={sensor.id} value={sensor.id}>{sensor.name}</option>`. No `useState` yet. **C:** Two options render. **D:** Why is the sensor ID a better React key than its position in the list?

### [ ] D2.7 · Day 2 checkpoint (10 min)
Run `npm --prefix frontend run build`, log your concepts, and commit `Day 2: TypeScript and props`. You should be able to read `const`, object/array syntax, arrow functions, `map`/`filter`, import/export, `type`, JSX and props.

---

# Day 3: React state, sensor data and chart

**Goal:** Change the sensor from a dropdown, see the correct chart, and explain why React updates the page without manually editing DOM nodes.

### [ ] D3.1 · Understand state before typing code (15 min)
**Learn:** React **state** is a component's memory; calling its setter requests a rerender. `useState` returns a pair `[currentValue, setValue]`. A **controlled input** gets its value from state and informs the parent through an event.

**A:** Predict whether assigning `selectedSensorId = 'pump-pressure'` will properly update React state. **B:** In `App.tsx`, add `useState('reactor-temp')` (with import), display the selected ID, then create a button whose `onClick` calls the setter. **C:** Clicking updates the text without a reload. **D:** Trace click → event handler → setter → React render → DOM. Do not use `useEffect` today.

### [ ] D3.2 · Controlled sensor dropdown (25 min)
**Learn:** Parent `App` owns the selected ID. A child `SensorSelector` accepts `sensors`, `selectedId`, and `onChange` props. `event.target.value` is the selected option's ID.

**A:** Predict the selected ID after choosing Pump Pressure. **B:** Codex creates `frontend/src/components/SensorSelector.tsx`, moves the dropdown there, uses a real `<label htmlFor="sensor">`, `<select id="sensor" value={selectedId} onChange={...}>`, and passes callback to the parent setter. **C:** Selecting either sensor updates `App`; the browser heading/unit change without reload. **D:** Explain props down → callback up. Keep **only** `selectedId` in state; derive the current sensor with `.find(...)` rather than storing a second state copy.

### [ ] D3.3 · Generate 48 predictable readings (25 min)
**Learn:** Fixed test data makes debugging and future comparisons possible. An **anomaly** here only means a value below `normalMin` or above `normalMax`, not machine learning.

**A:** Compute the first normal reactor reading: `70 + ((0 % 5) - 2) = 68`. `%` gives a remainder. **B:** In `demoData.ts`, Codex builds one small pure function `createReadings(sensorId)` and explains `Array.from({ length: 48 }, (_, i) => ...)` line by line. Use UTC timestamps at 30-minute intervals starting `2026-10-01T00:00:00Z` and the exact formulas in **Reference R1**. Override readings 12 and 36. **C:** Console/checks show 48 readings and exactly 2 anomalies per sensor, with no randomness. **D:** Explain what an array index means and why two fixed outliers are easy to test.

### [ ] D3.4 · Build a chart by composing components (30 min)
**Learn:** A chart library is just another set of React components. It receives data through props; it should not fetch from the database.

**A:** Guess what is drawn if the readings array is empty. **B:** From root run `npm --prefix frontend install recharts`. Codex creates `frontend/src/components/TrendChart.tsx` taking `readings: Reading[]` and `unit: string`. Use a basic Recharts `ResponsiveContainer`, `LineChart`, `XAxis`, `YAxis`, `Tooltip`, `Line`; give the wrapper `height: 320px; width: 100%`. No animations or custom SVG. **C:** Chart appears, updates on selection, and shows tooltip values. If invisible, inspect wrapper height first. **D:** Why is `TrendChart` a *presentation* component rather than data-owning component?

### [ ] D3.5 · Pure calculations and summary cards (25 min)
**Learn:** A **pure function** calculates an output from its inputs without changing the inputs or reading hidden state. A derived value should usually not be stored as separate React state.

**A:** Predict whether count changes when only the selected sensor changes (both have 48 readings). **B:** Codex writes one `summarize(readings)` function for local learning and a small `SummaryCards.tsx` receiving a typed `Summary` prop. Introduce `reduce` only for summing values: `array.reduce((total, x) => total + x.value, 0)`. Handle an empty array: count=0, min/max/avg=`null`, anomalies=0. **C:** Reactor average ≈ `70.6667`, pump average `3.59375`, anomaly count `2` each. **D:** Why does Java later become the authoritative statistics calculator instead of asking React/LLM to recompute production numbers?

### [ ] D3.6 · Render simple loading/empty/error examples (15 min)
**Learn:** UI has different states. `if` and conditional JSX can display exactly one branch. **A:** Predict text for `{ status: 'error' }`. **B:** Temporarily display `Loading...`, `No readings`, and `Unable to load data` branches one at a time, then restore normal local data. **C:** You saw all three plus the working chart. **D:** Why should old data not appear as if it belongs to a newly selected sensor?

### [ ] D3.7 · Day 3 checkpoint (10 min)
Build, write a short learning log, commit `Day 3: React state and local trend chart`. **Do not** add routing, custom UI component libraries, Redux, or animation.

---

# Day 4: Java and PostgreSQL become the source of truth

**Goal:** You will recognize most Java pieces. Codex handles boring Spring boilerplate, but you understand the boundaries and can test them yourself.

### [ ] D4.1 · Run PostgreSQL locally (20 min)
**Learn:** Docker runs PostgreSQL in a container; a host-to-container port mapping and a named volume preserve database state.

**A:** Predict the meaning of host `55432:5432`. **B:** Codex creates root `compose.yaml` with exactly one `postgres:17` service named `db`, database `industrial_trends`, user `app`, **local-demo-only** password `local_dev_only`, port mapping `127.0.0.1:55432:5432`, and a named volume. Run from the root:

```bash
docker compose up -d
docker compose ps
docker compose exec db pg_isready -U app -d industrial_trends
```

**C:** Database says ready. **D:** Explain why Spring connects to localhost port 55432 while PostgreSQL listens inside the container at 5432.

### [ ] D4.2 · Two SQL tables (20 min)
**Learn:** The primary key uniquely identifies a record; a foreign key links a reading to its sensor. UTC timestamps should not depend on local computer timezone. **A:** Predict whether two readings for the same sensor can share an identical timestamp. **B:** Codex creates `db/schema.sql` with **Reference R2** schema. Run:

```bash
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/schema.sql
```

**C:** Both tables exist. **D:** Explain why `(sensor_id, observed_at)` is a good composite key.

### [ ] D4.3 · Deterministic, re-runnable SQL seed (20 min)
**Learn:** A repeatable seed gives the same readings every time. **Idempotent** means rerunning it does not create duplicates.

**A:** Predict 48 + 48 rows. **B:** Codex creates `db/seed.sql`, using `generate_series(0,47)`, two sensor rows, fixed timestamps and formulas/overrides from R1, and `ON CONFLICT DO NOTHING`. Run:

```bash
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/seed.sql
docker compose exec -T db psql -U app -d industrial_trends -c 'SELECT sensor_id, COUNT(*) FROM readings GROUP BY sensor_id ORDER BY sensor_id;'
```

**C:** Exactly 48 rows per sensor. Run the seed **a second time** and confirm counts remain 48/48. **D:** Why should a beginner's sample database not depend on a random seed?

### [ ] D4.4 · Start a Spring Boot REST server (20 min)
**Learn:** A controller handles HTTP; a service calculates data; a repository queries the database. HTTP uses methods such as GET and POST and status codes such as 200, 404, 500.

**A:** Predict the meaning of HTTP 404. **B:** Create `backend/` using the current official Spring Initializr with **Maven, Java 17+, Spring Web, JDBC (Spring JDBC), PostgreSQL Driver, and Spring Boot Test**. Confirm JDBC's dependency is present in the POM. Use datasource URL `jdbc:postgresql://localhost:55432/industrial_trends` and local-dev defaults; no Spring automatic schema initialization. Add `GET /api/health` returning `{"status":"ok"}`. Start **Terminal B** from the repo root:

```bash
cd backend
./mvnw spring-boot:run
```

**C:** From a *different terminal* use `curl http://localhost:8080/api/health`; receive `{"status":"ok"}`. **D:** Describe the role of a Java server versus Vite's frontend server. Return your short-command terminal to root before next lesson.

### [ ] D4.5 · Read rows and return JSON (40 min)
**Learn:** `JdbcClient` executes **parameterized SQL**, a row mapper turns rows into Java values, a service calculates summaries, and DTOs become JSON.

**A:** Predict why SQL string concatenation with an external `sensorId` is unsafe. **B:** Codex builds just the **two GET endpoints** in this order, verifying after each:

1. `GET /api/sensors`: two Sensor DTOs from PostgreSQL, including IDs, names, units, ranges.
2. `GET /api/sensors/{sensorId}/trend`: 48 chronological readings and a Java-computed summary using R3 JSON contract.

Use a `JdbcClient` repository, a service, a REST controller, and records/DTOs. The Java service alone calculates anomalies. Unknown sensor → HTTP 404; known sensor with zero readings → `[]`, count 0 and nullable summary values. No JPA/Lombok/ORM framework. **C:** From another terminal:

```bash
curl -s http://localhost:8080/api/sensors
curl -s http://localhost:8080/api/sensors/reactor-temp/trend
curl -i http://localhost:8080/api/sensors/missing/trend
```

Expected: two sensors, 48 temperature readings with correct summary, and 404. **D:** Trace SQL row → Java DTO → JSON field. Use your Java strengths to explain the computation rather than only reading it.

### [ ] D4.6 · Three minimal Java checks (20 min)
**Learn:** A unit test should cover deterministic behavior without requiring a model call. **A:** Predict anomaly status for value exactly equal to max boundary. **B:** Codex adds tests for inclusive boundaries, reactor average with floating tolerance `1e-9`, and empty readings. Add a 404 check if time permits. From root with a separate terminal, run `cd backend && ./mvnw test` and return to root afterward. **C:** All tests pass. **D:** Why should tests compare doubles with tolerances when appropriate?

### [ ] D4.7 · Day 4 checkpoint (5 min)
Commit `Day 4: PostgreSQL and Java trend API`. If stuck, debug DB → Java connection → repository → service → controller, **one layer at a time**. Do not replace PostgreSQL with in-memory final data.

---

# Day 5: Connect React to Java over HTTP

**Goal:** Your browser stops using learning/demo data. It asks Java for JSON and handles real loading and failures.

### [ ] D5.1 · HTTP and JSON in Developer Tools (20 min)
**Learn:** `GET` fetches data, **JSON** is a text data format, `fetch` sends a browser HTTP request, and the **Network** tab shows its response. A proxy forwards `/api` requests from Vite to Java during local development.

**A:** Predict what happens when the browser calls `/api/sensors` while the Java server is stopped. **B:** Codex adds `server.proxy['/api'] = { target: 'http://localhost:8080', changeOrigin: true }` to `frontend/vite.config.ts`, following current Vite syntax. Start Terminal A (`npm --prefix frontend run dev`) and Terminal B (backend). **C:** Open Vite's URL plus `/api/sensors`; it returns two sensors. F12 → Network shows a GET request. **D:** Explain the difference between `http://localhost:5173` and `http://localhost:8080`. Note that Vite's proxy is a **development** convenience, not a deployed reverse proxy.

### [ ] D5.2 · Understand `Promise` and `async/await` (20 min)
**Learn:** Network data takes time. `Promise` represents an eventual result. `async` makes a function return a Promise; `await` pauses that async function, **not the entire browser**.

**A:** Predict whether the body of `fetch(...)` is immediately available. **B:** In a temporary JS console example, ask Codex to walk through:

```js
async function loadSensors() {
  const response = await fetch('/api/sensors');
  if (!response.ok) throw new Error('Request failed');
  const data = await response.json();
  console.log(data);
}
loadSensors();
```

**C:** See two sensor records in the browser Console. **D:** Explain what each `await` waits for and why `response.ok` matters.

### [ ] D5.3 · Typed API functions and runtime safety (25 min)
**Learn:** TypeScript type annotations do **not** validate network JSON. `unknown` makes you check before trusting remote values.

**A:** Predict whether casting malformed JSON `as TrendResponse` changes the JSON. **B:** Codex creates `frontend/src/api.ts` with `getSensors()` and `getTrend(id, signal)`, checking HTTP status and a few **required runtime fields** (arrays, ID strings, numeric values). Return typed data only after guards. No validation library. **C:** Call functions from a temporary test action, verify two sensors and 48 readings. **D:** Explain the difference between compiler confidence and runtime validation.

### [ ] D5.4 · React `useEffect`, loading and errors (35 min)
**Learn:** Rendering produces UI. An **effect** synchronizes React with an external system such as a server. Dependency `[selectedSensorId]` causes a new trend request when selection changes; it is **not** appropriate for the user-initiated AI button.

**A:** Predict whether changing the dropdown should call the GET endpoint again. **B:** Codex uses React state in `App` to load the sensor list on mount and trend on selection. Model four statuses: `loading`, `empty`, `error`, `success`, and use a message on error. Render chart/summary **only** for success. Remove demo-data imports. **C:** Reload: briefly see loading; then real chart. Stop Java: see error. Restart: see success again. **D:** Trace selected ID → effect → fetch → Java/DB → JSON → setState → rerender.

### [ ] D5.5 · Understand an out-of-order response (20 min)
**Learn:** Response A may return after B even if A was requested first. `AbortController` cancels obsolete fetch requests; an effect cleanup runs before its replacement and at unmount.

**A:** Predict what could go wrong if you rapidly choose pressure, temperature, pressure. **B:** Codex adds `AbortController` to the trend effect, passes `.signal` into `getTrend`, and aborts in cleanup. Ignore abort errors but show real failures. Clear the old trend when starting a new sensor load. **C:** Switch quickly: no temperature data under the pressure heading. **D:** Explain the stale-response bug in one sentence.

### [ ] D5.6 · Day 5 checkpoint (10 min)
After both real sensors work, delete `demoData.ts` and any learning-only imports. Verify DB-backed 48 readings, summary values and 2 anomalies. Run `npm --prefix frontend run build`; run backend tests; commit `Day 5: React fetch and error states`.

---

# Day 6: A *real* LLM feature without pretending the model is a calculator

**Goal:** The user presses a button; Spring constructs a factual prompt and optionally calls a real API. It clearly says whether output was mock or live.

### [ ] D6.1 · Understand LLM basics (20 min)
**Learn:** A **model** predicts/generates text; a **prompt** supplies instructions; a **token** is a unit of text processing; **context** is what a request includes; **grounding** means supplying facts; **hallucination** is an unsupported generated claim. A **prompt injection** is hostile content trying to change the model's instructions.

**A:** Decide whether an LLM should count anomalies or Java should. **B:** Review the selected sensor's Java-calculated min/max/avg/range and 2 anomalous timestamps. Write three permissible statements and two statements the model **must not** invent. **C:** Ensure every allowed claim traces to the Java summary. **D:** Explain why a generated explanation is not a source of truth.

### [ ] D6.2 · Write one bounded prompt (15 min)
**Learn:** The backend, not the browser, decides the context and instructions. No chat interface or arbitrary user prompt input is needed. **A:** Predict why a model without input data might invent a trend. **B:** Codex assembles a prompt from the sensor name, unit, normal range, count, min/max/avg, anomaly count and anomaly timestamps/values. Include this direction:

> Explain this **synthetic** sensor summary in 3–5 short sentences. Use only the supplied values. State the anomaly count and how the readings compare with the range. Do not invent causes, predictions, diagnoses, equipment-maintenance advice or live operational facts. Say explicitly that this is simulated data, not operational guidance.

**C:** Print/inspect the prompt in a safe local unit test with **synthetic values only**, not secrets. **D:** Distinguish instructions from factual context.

### [ ] D6.3 · Mock the external service *honestly* (25 min)
**Learn:** Testing with a fake provider is useful, but the UI must never imply it called a real model. Dependency injection lets Java choose an implementation. **A:** Predict why a silent automatic fallback to mock would be misleading. **B:** Codex adds `ExplanationService` plus `LLM_MODE=mock|live`, and `POST /api/sensors/{sensorId}/explanation` (no body). In mock mode, return deterministic text from current Java stats and `mode: "MOCK"`; unknown ID → 404. **C:** `curl -X POST http://localhost:8080/api/sensors/reactor-temp/explanation` returns mock JSON. **D:** Explain why POST is sensible for an action that requests generated output.

### [ ] D6.4 · Add and verify the optional Gemini provider (35 min)
**Learn:** An **SDK** is a language-specific library for an external service. The browser calls Spring; only Spring calls Gemini. Credentials, quotas/costs, timeouts, and provider failures need explicit handling.

**A:** Predict where a Gemini key would be visible if it were placed in React code. It would be included in browser-delivered code or requests and could be inspected in DevTools; therefore, the browser must never receive it.

**B1 · Add the Java SDK:** Check the current official Google GenAI Java SDK documentation for its supported Java version, Maven coordinates, API examples, timeout options, and error types. Add the documented `com.google.genai:google-genai` dependency to `backend/pom.xml`. Do not copy an old or unrelated SDK example. The SDK version is deliberately not frozen in this guide; use a compatible release verified on implementation day.

**B2 · Keep the provider behind the existing interface:** Implement a Gemini provider for the existing `ExplanationProvider` contract. It should be created only when `LLM_MODE=live`; the deterministic mock provider remains active by default when `LLM_MODE` is absent or `mock`. In the Gemini provider, read `GOOGLE_API_KEY` and `GEMINI_MODEL` from the backend environment/configuration, reject missing values clearly, construct the documented Gemini request from the bounded Java prompt, and return only generated text. Configure a finite request timeout. Extract text from the documented response, including typed model-output steps if the convenience text field is absent. Map provider/auth/quota/network failures to a generic non-2xx response (for example HTTP 502). Log only safe diagnostic metadata such as the provider HTTP status/category or I/O exception type—never the key, prompt, or raw provider error message. **Never fall back to mock** after a live request fails. Only report `mode: "LIVE"` after a successful real provider response with non-empty text.

**B3 · Obtain/configure credentials privately:** Create a key in Google AI Studio using its official key page. Each key belongs to a Google Cloud project. Choose the AI Studio **Default Gemini Project** for a personal test, or import a personal project you control; “Import project” is for an existing Google Cloud project, and do not use a workplace/shared project without permission. Review the current free-tier rate limits and data-use terms first. Select a stable text model shown as available to that account; set its exact API model ID in `GEMINI_MODEL` rather than guessing. Keep `LLM_MODE=mock` for normal work and GitHub visitors. For the single live check, stop any existing backend with Ctrl+C. In a **Bash** terminal at the repository root, enter `cd backend` (skip this if already in `backend`). Then run this single line by itself; do not paste the startup commands at the same time:

```bash
read -rsp "Gemini API key (input is hidden): " GOOGLE_API_KEY; printf '\n'
```

When the hidden prompt appears, type/paste the key directly into the terminal and press Enter. The input is not echoed or stored in shell command history. After the shell prompt returns, run:

```bash
export GOOGLE_API_KEY
export LLM_MODE=live
export GEMINI_MODEL='gemini-3.8-flash'
./mvnw spring-boot:run
```

Do not put the key in React, `application.properties`, a tracked `.env`, a screenshot, or a Git commit, and never paste it into chat. After the single check, stop the server with Ctrl+C and run `unset GOOGLE_API_KEY LLM_MODE GEMINI_MODEL`; a fresh backend terminal then uses the mock default. Never use real or confidential sensor data: Google's free-tier content may be used to improve its products.

**C · Verify the real integration:** With the backend running in live mode and the frontend/backend/database already working, click **Explain with AI exactly once**. Confirm the browser sends one POST to `/api/sensors/{sensorId}/explanation`, the Java process makes the provider request, and a successful response contains the selected `sensorId`, non-empty generated text, and `mode: "LIVE"`. Confirm no key appears in the browser Network tab or logs. This single successful call is what proves the Gemini integration works. If the key, quota, model access, billing, or network is unavailable, do **not** claim success: restore explicit mock mode, record **Gemini LIVE NOT VERIFIED** in the README and learning log, and stop rather than repeatedly retrying.

**Negative check:** If you deliberately test invalid credentials, make at most one request. It must return a visible non-2xx error and must not return `mode: "MOCK"` as though the live call succeeded. Do not expose the key while testing.

**D:** Explain why the backend call is an LLM integration, why Java remains the source of truth for statistics, and which production concerns (for example authentication, quotas/cost limits, monitoring, and data governance) this small portfolio demo does not solve.

Official references to re-check on implementation day: Google GenAI Java SDK https://github.com/googleapis/java-genai ; Gemini Java getting started https://ai.google.dev/gemini-api/docs/get-started?lang=java ; API key page https://aistudio.google.com/api-keys ; pricing and data-use terms https://ai.google.dev/gemini-api/docs/pricing .

### [ ] D6.5 · React button, pending state, plain text (30 min)
**Learn:** A **user click** triggers this POST; a boolean pending state disables the button while work runs. LLM output is untrusted text and must not be inserted as HTML.

**A:** Predict whether changing sensor should automatically regenerate an explanation (it should not). **B:** Codex adds `getExplanation(id)` in `api.ts` and `AiExplanation.tsx` with button, `Generating...`, visible success, error, and `LIVE AI` / `MOCK — NOT AI` label. Render text as `{text}`, **not** `dangerouslySetInnerHTML`. Clear old response on sensor change; remount the explanation component using `key={selectedSensorId}` or cancel the old request to prevent stale results. **C:** No AI network request on load/selection; exactly one per click; rapidly changing sensors never shows the wrong explanation. **D:** Explain why API key lives in Spring and output is rendered as plain text.

### [ ] D6.6 · Day 6 checkpoint (10 min)
Run both builds/tests. Check DevTools Network contains **no key**. Ensure `.env` files are ignored. Record mode truthfully, then commit `Day 6: server-side grounded explanation`.

---

# Day 7: Prove you know what you built

### [ ] D7.1 · One beginner-level React behavior test (35 min)
**Learn:** Tests should assert what a user can do, not private component implementation details. **A:** Predict the callback value after choosing Pump Pressure. **B:** Codex installs **Vitest + React Testing Library** as dev dependencies and creates only `frontend/src/components/SensorSelector.test.tsx`. Render the selector with two sensors; choose Pump Pressure using a user event; verify the callback got `pump-pressure`. No chart snapshot tests, no UI framework. **C:** Run frontend tests and `npm --prefix frontend run build`. **D:** Explain why a behavior test is more stable than inspecting React's internal state.

### [ ] D7.2 · Run the entire path and negative checks (30 min)
**Learn:** End-to-end checking here means verifying the complete request manually, not installing a huge browser testing suite. **B:** Verify: two sensor options; 48 chronological readings each; correct unit; temperature avg ~70.6667; pressure avg 3.59375; 2 anomalies each; loading/error/recovery; quick switching; no LLM before click; mock/live labels; no browser key; Java 404 on unknown sensor; backend tests passing. **C:** Write observed results into `LEARNING_LOG.md`; do not mark anything tested that you did not actually execute. **D:** Explain which layer is responsible for each failure.

### [ ] D7.3 · README that a stranger could follow (20 min)
**Learn:** Reproducibility matters more than polished screenshots. **B:** Codex writes `README.md` using only **verified** prerequisites, install commands, compose startup, SQL seed, Java/React terminal commands, endpoints, ports, mock/live env variables, tests, known limitations, and stop commands. Document `LLM_MODE=mock|live`, `GOOGLE_API_KEY`, and `GEMINI_MODEL`; clearly say whether a real Gemini call was actually tested. Include a `.env.example` with **names only** and no secrets—never an actual key. **C:** Follow README from a fresh terminal without relying on Codex memory. **D:** Explain how to restart all components.

### [ ] D7.4 · Two-minute demo and teach-back (30 min)
**Without Codex**: show selecting Reactor → chart/48 values → two anomalies → explanation button; switch to Pump; then explain:

1. Browser vs Node vs npm vs Vite vs React.
2. HTML/CSS vs JavaScript/TypeScript; TS compile-time versus JSON runtime.
3. A component, props, state, JSX, event handler and rerender.
4. Why `useEffect` fetches data and a **click handler** requests an explanation.
5. Async/await and `AbortController` in one concrete example.
6. The route `React → Java controller → service → JdbcClient → PostgreSQL` and back.
7. Why Java owns the anomaly math and the LLM only explains it.
8. How a mock differs from one real LLM call; where the secret lives.
9. What would become harder with millions of points or continuous streaming (discussion only).
10. Which Seeq requirements you have **sample-project experience** in versus those requiring large-scale professional experience.

**C:** If you cannot answer a question, inspect the specific 5–15 lines of code and try again. Avoid reading a Codex-generated script.

### [ ] D7.5 · Final checkpoint (5 min)
Build/test, commit, and mark completed checklist. Remove `frontend/public/basics.html` if you no longer want the learning sandbox in the final app; deleting it must not affect the app. **The project is complete when it works and you can explain it, not when it looks like a corporate dashboard.**

---

# Day 8 (optional): Portfolio visualization polish

**Goal:** Present the completed project as a clear industrial analytics dashboard without changing its data contracts, backend behavior, or learning-project scope.

**Scope lock:** Use only the existing React, TypeScript, Recharts, and CSS dependencies. Keep one page and one trend chart. Do **not** add routing, a sidebar, gauges, animation, a UI framework, an icon package, a theme switcher, extra APIs, or extra sensor calculations. Java remains authoritative for summaries and anomaly flags. Keep the simulated-data notice prominent and the AI explanation secondary to measured data.

### [x] D8.1 · Capture the baseline and define the visual hierarchy (15 min)
**Learn:** A showcase page should make the most important information obvious before adding decoration. **A:** Before editing, identify the current order: title → selector → chart → summary → anomalies → AI. Predict which facts an interviewer should understand in ten seconds. **B:** Save no generated mockup and install nothing. Use this fixed hierarchy: compact product header and simulated-data badge; sensor context row; five summary cards; one large trend chart; anomaly table and AI explanation in a two-column lower section. **C:** At desktop width, sketch the hierarchy on paper or describe it in `LEARNING_LOG.md`. **D:** Explain why one strong chart communicates more than several redundant charts.

### [x] D8.2 · Create the dashboard shell and design tokens (30 min)
**Learn:** CSS custom properties keep spacing, color, borders, and typography consistent. Semantic regions make structure understandable without relying on visual position. **A:** Predict which existing components need class names but no behavior changes. **B:** Replace the remaining starter-oriented rules in `frontend/src/index.css` with a small light industrial palette: off-white page background, white panels, dark navy/slate text, teal/blue accent, amber warning, red anomaly, subtle borders, and restrained shadows. Add a centered responsive page shell and semantic header/main/section layout. Use system fonts; do not download fonts. **C:** At 1280 px the content is centered and readable; no element depends on a fixed viewport height. **D:** Explain the difference between a reusable CSS token and a component-specific class.

### [x] D8.3 · Polish sensor context and summary cards (30 min)
**Learn:** Information hierarchy uses size, grouping, labels, and whitespace—not just color. **A:** Predict which values should be visible without reading the chart. **B:** Turn the page heading and simulated-data notice into a compact dashboard header. Place the selector, sensor name, unit, and inclusive normal range in one sensor-context panel. Update `SummaryCards` to render five responsive cards for count, minimum, maximum, average, and anomaly count. Include the selected unit on numeric values and give the anomaly card a restrained alert treatment when the count is greater than zero. Do not label the machine “healthy,” “safe,” or “live.” **C:** Both sensors show the same layout with their own units and values. **D:** Explain why an anomaly count is evidence while “healthy” would be an unsupported conclusion.

### [x] D8.4 · Make the trend chart explain the data (45 min)
**Learn:** A useful chart shows context, thresholds, and exceptions. Decoration that does not help interpretation is chart junk. **A:** Predict where the two known outliers should appear relative to the normal range. **B:** Extend `TrendChart` props with `normalMin` and `normalMax`. Use existing Recharts features to add a light `CartesianGrid`, time-only X-axis labels, a unit-aware Y axis, a bounded normal-range `ReferenceArea`, dashed `ReferenceLine` limits, a clear series line, visible anomaly markers, and a tooltip containing the full UTC timestamp, value/unit, and anomaly state. Keep animations disabled. Use a responsive container and avoid displaying all 48 timestamp labels at once. **C:** Reactor shows a 60–80 °C band with anomaly points at 86 and 88; Pump shows a 2–5 bar band with anomaly points at 5.8 and 5.9. Switching sensors updates every label, range, and point. **D:** Explain why the frontend visualizes Java-provided anomaly flags instead of reclassifying readings.

### [x] D8.5 · Convert anomalies and AI output into clear panels (30 min)
**Learn:** Tables are better than prose lists for comparing exact timestamp/value pairs. AI output needs provenance and should not dominate measured facts. **A:** Predict how many anomaly table rows each seeded sensor displays. **B:** Change `AnomalyList` to an accessible table with UTC time, value/unit, and normal range columns; keep its empty-state message. Style `AiExplanation` as a neighboring insight panel with a clear button, pending/error states, and the existing `LIVE AI` or `MOCK — NOT AI` provenance label. Render provider text as plain text only. **C:** Each seeded sensor shows exactly two anomaly rows; no explanation appears before a click. **D:** Explain why the table and mode label improve trust.

### [x] D8.6 · Responsive, accessible, and state-complete review (30 min)
**Learn:** A polished screenshot is not enough; loading, error, empty, keyboard, and narrow-screen behavior are part of the interface. **A:** Predict how the lower two-column area should change on a phone. **B:** Add one practical breakpoint that stacks summary cards and lower panels without horizontal page scrolling. Preserve visible labels, heading order, keyboard focus, sufficient contrast, and `role="alert"` error messages. Give the chart a concise accessible name and ensure the anomaly table has a caption or associated heading. Keep loading and empty states inside the same panel area so the page does not appear frozen. **C:** Manually check approximately 375 px, 768 px, and desktop widths; operate the selector and AI button with the keyboard. **D:** Explain why responsive layout and accessibility are engineering features rather than visual extras.

### [x] D8.7 · Regression checks and portfolio checkpoint (20 min)
Run:

```bash
npm --prefix frontend run lint
npm --prefix frontend test
npm --prefix frontend run build
cd backend && ./mvnw test
```

Keep behavior tests focused on user-visible outcomes; do not add brittle SVG snapshots. Verify two sensors, 48 readings, two anomaly rows per sensor, correct units/ranges, loading during rapid switching, no AI request before click, and truthful mock/live labeling. Update the README feature description and verification count only with results actually observed. Add a short `LEARNING_LOG.md` entry explaining the visual decisions, then commit with a focused message such as `Day 8: portfolio dashboard polish`.

**Day 8 acceptance:** The first screen communicates the project purpose, selected sensor, normal range, summary, trend, and anomalies; the chart makes normal versus anomalous readings obvious; the layout works on narrow and wide screens; no backend/API contract changed; lint, frontend tests, frontend build, and backend tests pass.

---

# Reference contracts (Codex must follow these exactly)

## R1. Sensor data and exact expected results

| ID | Name | Unit | Inclusive normal range |
|---|---|---|---|
| `reactor-temp` | Reactor Temperature | °C | 60–80 |
| `pump-pressure` | Pump Pressure | bar | 2–5 |

For each sensor, **48 readings** from `2026-10-01T00:00:00Z`, separated by exactly **30 minutes**, so the last timestamp is `2026-10-01T23:30:00Z`.

For index `i = 0..47`:

- Temperature normal value: `70 + ((i % 5) - 2)`.
- Pressure normal value: `3.5 + 0.1 * ((i % 5) - 2)`.
- Temperature overrides: index `12 → 86`, index `36 → 88`.
- Pressure overrides: index `12 → 5.8`, index `36 → 5.9`.
- A reading is anomalous only if `value < normalMin || value > normalMax`. **Exactly** on the boundary is normal.

| Sensor | count | min | max | avg | anomalies |
|---|---:|---:|---:|---:|---:|
| Reactor | 48 | 68 | 88 | 70.66666666666667 | 2 |
| Pump | 48 | 3.3 | 5.9 | 3.59375 | 2 |

**Only Java** is authoritative for final anomaly classification/statistics; Day 3 React calculations are temporary learning exercises.

## R2. Database schema and initialization

Create `db/schema.sql` exactly (no auto schema creation in Spring):

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

`db/seed.sql` must insert two sensors and generate 48 readings each using `generate_series(0,47)` and `INSERT ... ON CONFLICT DO NOTHING`. Use the formulas above. Running it twice must preserve the counts. Do not drop tables during a normal start. PostgreSQL lives in Docker Compose; Spring uses `JdbcClient` and parameterized queries. Do not add JPA, Flyway, or a second database initialization system during this tutorial.

## R3. API contracts

### `GET /api/sensors`

Real response is an array of **two** elements, with this shape:

```json
[
  { "id": "reactor-temp", "name": "Reactor Temperature", "unit": "°C",
    "normalMin": 60.0, "normalMax": 80.0 }
]
```

### `GET /api/sensors/{sensorId}/trend`

Example abbreviates readings to one; the real array contains all 48 sorted readings:

```json
{
  "sensor": { "id": "reactor-temp", "name": "Reactor Temperature",
              "unit": "°C", "normalMin": 60.0, "normalMax": 80.0 },
  "readings": [
    { "timestamp": "2026-10-01T00:00:00Z", "value": 68.0, "anomaly": false }
  ],
  "summary": {
    "count": 48, "min": 68.0, "max": 88.0,
    "avg": 70.66666666666667, "anomalyCount": 2,
    "firstTimestamp": "2026-10-01T00:00:00Z",
    "lastTimestamp": "2026-10-01T23:30:00Z"
  }
}
```

Unknown sensor → HTTP 404. Known sensor with no measurements → `readings: []`, `count: 0`, `anomalyCount: 0`, and `null` for min/max/avg/firstTimestamp/lastTimestamp. Java should use UTC ISO-8601 timestamps. For an empty array do not divide by zero.

### `POST /api/sensors/{sensorId}/explanation`

No request body. Java reloads authoritative stats and selected anomalies, creates grounded prompt, and returns:

```json
{ "sensorId": "reactor-temp",
  "text": "Simulated reactor temperature ...",
  "mode": "LIVE" }
```

`mode` is **exactly** `LIVE` after a successful genuine provider call or `MOCK` for the explicit deterministic mock. Live provider failures return a non-2xx response, **never silently pretend** a mock is live. Render LLM text as text, not HTML.

## R4. Repository layout at completion

```text
industrial-trend-explorer/
  Industrial_Trend_Explorer_Absolute_Beginner_Codex_Guide_v2.md
  README.md
  LEARNING_LOG.md
  .gitignore
  .env.example
  compose.yaml
  db/
    schema.sql
    seed.sql
  backend/
    pom.xml
    mvnw
    src/main/java/...  (controller, service, repository, records, prompt,
                         ExplanationProvider, mock provider, optional Gemini provider)
    src/main/resources/application.properties
    src/test/java/...
  frontend/
    package.json
    vite.config.ts
    src/
      main.tsx
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

Your learning-only `sensors.ts`, `demoData.ts`, and `public/basics.html` may exist temporarily and are removed once the actual app works. One root `.gitignore` excludes `node_modules`, build artifacts, `.env` and logs.

## R5. Minimum final acceptance test

- [ ] Root folder and README are understandable; no nested `frontend/frontend`.
- [ ] Node/npm, Java, Docker, Git versions are recorded, not assumed.
- [ ] PostgreSQL container starts; seed run twice still 48 + 48.
- [ ] Java has both working GET endpoints and appropriate 404/empty behavior.
- [ ] Java calculates stats (not an LLM); correct 2 anomalies per sensor.
- [ ] React displays two selectable sensors, charts, summary and anomaly list from Java JSON.
- [ ] Normal/loading/empty/error UI paths checked; stale requests not shown.
- [ ] Clicking Explain sends a POST; switching sensor clears prior explanation.
- [ ] `GOOGLE_API_KEY` never appears in frontend, browser requests/logs, screenshots, or committed files.
- [ ] Mock says `MOCK — NOT AI`; Gemini says `LIVE AI` only after a real successful Gemini response.
- [ ] Gemini live status is recorded truthfully: **VERIFIED** only after an actual POST returns non-empty generated text with `mode: "LIVE"`; otherwise **NOT VERIFIED**, with the reason documented.
- [ ] Backend tests, one React behavior test and TypeScript production build pass.
- [ ] At least one genuine Gemini API call tested **if** account/model access is available; otherwise Gemini is explicitly recorded as unverified (never infer live success from mock output or compilation).
- [ ] Can do a 2-minute demo and explain all components without Codex.

---

# Troubleshooting for a complete beginner

**`node: command not found` or `npm: command not found`:** Node/npm are missing in your actual terminal environment. Verify WSL vs Windows. Follow the official Node installation path and recheck. Do not begin TypeScript until the basics run.

**`ENOENT` or `package.json not found`:** Wrong folder. Run `pwd`, `ls`, `ls frontend`; do not create a new project to hide the mistake. `npm --prefix frontend ...` assumes you are at root.

**Vite page doesn't load:** Check Terminal A for the *actual URL*; do not assume port 5173 if another process is using it. Check browser console errors.

**`port 8080 already in use`:** Inspect what currently occupies the port; stop the old instance before starting a duplicate. Don't silently change the API contract.

**React blank page:** F12 Console; inspect first error and the changed component. Check imports, JSX closing tags, and component return. Ask Codex to explain the exact error before changing files.

**Chart invisible:** Verify data nonempty; chart wrapper has a concrete height; read console warnings. Don't add a second chart library.

**Database won't start:** `docker info`, `docker compose ps`, `docker compose logs db`. Check the host port 55432 and Docker daemon. Keep the same database and schema.

**Java cannot query:** Check DB ready → datasource URL/credentials → schema → seed → JdbcClient SQL → controller. One layer at a time. Logs should not expose credentials.

**Fetch fails:** Browser Network tab: URL/status/body; Vite proxy; backend running; then inspect `api.ts`. Never blame TypeScript for network errors.

**React shows wrong sensor after switching:** Check `selectedSensorId`, loading state reset, effect cleanup, request abort, and whether stale data is rendered under a new sensor heading.

**Gemini key/quota/model error:** Do not invent a model or retry repeatedly. Read the sanitized HTTP error and official documentation. Use explicit `mock` mode until you have verified access. Mark live as unverified. Keep `GOOGLE_API_KEY` on the Java server only; never publish it. Free-tier limits and data-use terms can change, so check the current official pages before making a request.

**Running behind schedule:** Finish the core React-to-Java-to-PostgreSQL path first; keep minimal chart; keep mock explanation clearly labeled; postpone extra frontend test until Day 7. Do **not** skip security, truth labeling, fundamental React learning, or your final teach-back. Don't add any Seeq-looking feature that doesn't teach the essential skill.

---

# Interview vocabulary: know what you did and what you did not do

**You can legitimately say after successful completion:** “I built a small React + TypeScript industrial time-series demo, connected it to a Java/PostgreSQL REST API, handled asynchronous loading and state, and integrated an optional backend LLM explanation based on deterministic statistics.” Say **live integration tested** only after an actual API call succeeded.

**You cannot legitimately claim from this week alone:** large-scale React expertise, production AI infrastructure, industrial-domain product experience, AI-powered anomaly detection, advanced model orchestration, high-scale time-series engineering, or a deployed SaaS service.

Concepts to **discuss, not build**: routing, frontend testing pyramid, accessibility, server-side rendering, state-management libraries, streaming, downsampling, retention, query planning, prompt injection defenses, RAG, tool calling, rate limiting, cost controls, observability, authentication and production cloud deployment.

## Official references (for Codex to check when syntax/versions change)

- Node.js downloads: https://nodejs.org/en/download
- Vite: https://vite.dev/guide/
- JavaScript beginner guide: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting
- HTML beginner guide: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- React Learn: https://react.dev/learn
- React TypeScript: https://react.dev/learn/typescript
- React effects: https://react.dev/learn/synchronizing-with-effects
- Recharts: https://recharts.github.io/
- Spring Boot SQL/JdbcClient: https://docs.spring.io/spring-boot/reference/data/sql.html
- PostgreSQL 17: https://www.postgresql.org/docs/17/
- Google GenAI Java SDK: https://github.com/googleapis/java-genai
- Gemini API pricing and free-tier terms: https://ai.google.dev/gemini-api/docs/pricing
- Gemini API Java quickstart: https://ai.google.dev/gemini-api/docs/get-started?lang=java

---

# Tutor prompt for your current checkpoint

```text
Read Industrial_Trend_Explorer_Absolute_Beginner_Codex_Guide_v2.md
completely. I have five years of Java backend experience and have completed
D7.4. This project supplements that background with a hands-on
React/TypeScript and server-side Gemini example; present it as a small
synthetic-data demo, not as professional Seeq or production-scale industrial
experience.

The final project review is complete. Seven backend tests, three frontend
behavior tests, frontend ESLint, the TypeScript/Vite production build, and
the root README startup check pass. The React UI displays the Java-provided
chart, summary, and anomaly list. Changing sensors immediately clears the
old trend, shows a loading state, aborts the obsolete request, and rejects
responses that do not match the current selection. Exact Node, npm, Java,
Docker, Docker Compose, and Git versions are recorded in the README. The
temporary learning data, page, and unused Vite scaffold files were removed.

Both sensors returned 48 chronological readings, expected units/averages,
and 2 anomalies; an unknown sensor returned 404. Mock mode shows
`MOCK — NOT AI` and makes no explanation request until click. A live request
using `gemini-3.8-flash` succeeded: the POST returned HTTP 200 with non-empty
text, `mode: "LIVE"`, and the selected sensor ID; the UI showed `LIVE AI`.
The provider uses typed model-output-step text extraction when the SDK's
`outputText()` convenience field is empty. Live mode was verified but should
not be assumed to be currently enabled. Keep the API key private; do not
expose it or ask me to paste it.

D7.4 teach-back and D8.1–D8.7 are complete. The trend chart displays the
Java-provided anomaly markers, normal band and thresholds, readable time
labels, and a UTC/value/status tooltip. Its responsive canvas has a defined
height; both sensors were checked in the browser. The anomaly panel is an
accessible table beside a click-only AI insight panel with provenance,
pending/error states, and plain-text output. Nine frontend tests pass. At
375, 768, and desktop widths, the page fits without horizontal scrolling;
the lower panels stack on mobile. Keyboard focus and AI-button activation
are tested, and the user confirmed native sensor selection with arrow keys.
Frontend lint, all nine frontend tests, the production build, and all seven
backend tests pass. The frontend bundle-size advisory remains non-blocking.
The README records only observed results. No commit was created because this
workspace is not a Git repository. Preserve the Day 8 scope lock and proceed
one micro-step at a time so I can understand and verify each change.
```

If you understand only one principle this week, make it this: **you control the learning pace; Codex is your pair programmer and teacher, not the person who replaces your understanding.**
