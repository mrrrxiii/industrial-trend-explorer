# Industrial Trend Explorer: Frontend Development from Zero to Deployment

| Document | Value |
|---|---|
| Tutorial version | 1.1 |
| Repository snapshot reviewed | 2026-10-19 |
| Audience | A learner with junior Java/backend knowledge and no assumed frontend experience |
| Project | Industrial Trend Explorer, a completed synthetic sensor analytics portfolio application |

> This is the definitive **post-build learning curriculum** for the finished project. The older [seven-day build guide](./Industrial_Trend_Explorer_Absolute_Beginner_Codex_Guide_v2.md) records how the project was constructed. This tutorial starts from the completed code and teaches the transferable frontend skills inside it.

The goal is not to memorize this repository. The goal is to understand browser application development well enough to read, explain, debug, test, and safely extend a similar frontend without having an AI write everything for you.

---

## 1. How a learner and an AI tutor must use this file

### 1.1 Learning contract

Work through one module at a time. The route groups related sections into sessions, but an AI tutor should teach those sections one at a time in order. For every module, the learner must:

1. Read the named source files before changing them.
2. Predict what the relevant code will do.
3. Run or inspect the real behavior.
4. Explain the behavior in their own words.
5. Make at most one small learning change when an exercise requests one.
6. Run the stated verification.
7. Either keep the change intentionally or restore it safely before continuing.

Do not treat a successful build as proof of understanding. A learner completes a module only when they can explain its checkpoint questions without reading a prepared answer.

### 1.2 Mandatory instructions for any future AI tutor

An AI using this tutorial must follow this protocol:

```text
You are teaching a learner with junior Java/backend knowledge and no assumed
frontend knowledge. Use the finished Industrial Trend Explorer repository as
the source of truth.

1. Read this tutorial and the files named by the current module before acting.
2. Teach exactly one numbered module or one exercise at a time.
3. Begin with a plain-language mental model and connect it to a Java concept
   when that comparison is accurate.
4. Ask the learner to predict behavior or explain a short code fragment before
   giving the explanation.
5. Explain every new symbol and term. Never assume knowledge of Node, npm,
   HTML, CSS, JavaScript, TypeScript, React, Vite, Vitest, the DOM, or fetch.
6. Do not replace a learning task with a large generated solution. Let the
   learner type small changes and inspect the result.
7. Never guess current files, commands, dependency versions, routes, test
   counts, environment values, or runtime state. Inspect them.
8. Never expose, request, print, or commit secret values. The frontend must
   never receive a Gemini API key or database password.
9. After each change, run the narrowest relevant check, then the broader check
   named by the module. Report the actual result; use NOT VERIFIED if it was
   not run.
10. Ask the learner to attempt each self-check before revealing its answer key.
11. Stop at the session marker and wait for the learner's teach-back.
```

The tutor should correct misunderstandings with evidence from the actual code. It should not agree with an incorrect explanation merely to be encouraging.

### 1.3 What “complete” means

At the end, the learner should be able to:

- explain where browser code runs and why Node.js is still needed;
- read `package.json`, use npm scripts, and explain `package-lock.json`;
- write basic HTML, CSS, JavaScript, and TypeScript;
- read and create typed React function components;
- distinguish props, state, derived data, event handlers, rendering, and effects;
- safely request JSON and handle loading, empty, error, and success states;
- prevent an old asynchronous response from replacing newer data;
- build accessible forms, tables, buttons, status messages, and responsive layouts;
- test user-visible behavior with Vitest and React Testing Library;
- trace a request from React through Spring Boot and PostgreSQL and back;
- explain the development build, production build, container, reverse proxy, CI, and release path;
- debug one layer at a time using the terminal and browser developer tools;
- describe the project truthfully in an interview, including its limits.

This is an end-to-end curriculum for **this application**, not a claim to cover the entire frontend profession. It deliberately teaches the browser, language, React, testing, API, accessibility, build, and delivery skills exercised by this repository. Section 30 identifies important frontend subjects that this project does not exercise.

### 1.4 Start here: learning route

Do not read all 2,000-plus lines in one sitting. Use the following sessions in order. A session is a competency checkpoint, not a deadline; 60–120 focused minutes is a reasonable planning range, but repeat or split any session when needed.

| Done | Session | Read and perform | Required evidence before continuing |
|---|---:|---|---|
| [ ] | 1 | Sections 1–4, then first contact below | learner opens the app, identifies the four runtimes and ports, and creates a safe learning branch |
| [ ] | 2 | Section 5 | learner explains Node, npm, scripts, manifest, lockfile, and generated output |
| [ ] | 3 | Section 6 | learner completes the HTML/CSS/JavaScript console labs and explains the results |
| [ ] | 4 | Sections 7–8 | learner writes and checks a small TypeScript module and traces the build entry path |
| [ ] | 5 | Section 9 | learner temporarily renders a typed stateful component and explains props/state/events |
| [ ] | 6 | Sections 10–11 | learner traces fetch, runtime guards, Promise timing, and three failure types |
| [ ] | 7 | Sections 12–13 | learner draws App state transitions and component ownership |
| [ ] | 8 | Sections 14–15 | learner performs CSS and keyboard labs and explains the accessibility behavior |
| [ ] | 9 | Section 16 | learner reads one test line by line and writes one focused component test |
| [ ] | 10 | Sections 17–18 | learner traces an API request through Java and SQL and explains exact window counts |
| [ ] | 11 | Sections 19–21 | learner starts the complete local stack, diagnoses a safe failure, and runs checks |
| [ ] | 12 | Sections 22–24 | learner explains production assets, Caddy, containers, CI, and secret boundaries |
| [ ] | 13+ | Sections 25–26 | learner completes one progressively harder feature exercise on a branch |
| [ ] | Final | Sections 27–30 and the mastery assessment | learner demonstrates, diagnoses, implements, and verifies without scripted answers |

### 1.5 First contact: see the application before studying it

A learner needs a visible system in mind before reading its implementation.

**Fast path:** open the live demo linked in `README.md`. Do not enter private information; it is a public synthetic-data portfolio page.

**Local path:** if Docker, Java, Node, and npm are already installed, follow Section 19 now, then return here. If any command is missing, use the prerequisite route in Section 19.1 instead of guessing an installation command.

Observe without editing:

1. Identify the simulated-data warning.
2. Switch between both sensors and say what changes.
3. Select 1H, 6H, and 24H and compare reading counts and chart captions.
4. Open browser developer tools → Network, reload, and find `/api/sensors` plus the trend request.
5. Click **Explain with AI** once only when the displayed deployment is known to use mock mode; confirm the provenance label.
6. Narrow the browser window and check that the layout stacks without page-level horizontal scrolling.

Record five observations in `docs/learning/LEARNING_LOG.md` only if you are intentionally continuing that log. The tutor must not invent observations for the learner.

**Session 1 pass condition:** the learner can point to something visible in the page, something visible in Network, and the source/runtime responsible for each.

---

## 2. The application before the syntax

The application lets a user select Pump Pressure or Reactor Temperature, choose a 1H, 6H, or 24H window, and view:

- database-backed sensor metadata;
- readings plotted over time;
- a normal operating range;
- backend-calculated minimum, maximum, average, count, and anomaly count;
- readings flagged as anomalies by Java;
- an optional explanation generated only after a button click.

The public portfolio deployment uses deterministic mock explanation mode. The data is synthetic and the UI says so. This is not a real industrial monitoring system.

### 2.1 Four runtimes with four jobs

```text
Browser
  runs compiled React/JavaScript
  renders HTML and CSS
  receives clicks and sends HTTP requests
        |
        | /api requests
        v
Spring Boot, port 8080 during local development
  validates the requested time range
  coordinates repository and calculations
  returns JSON
        |
        | JDBC / SQL
        v
PostgreSQL, container port 5432
  stores sensors and readings

Node.js
  runs frontend development/build/test tools on the developer machine
  does not run the React UI in the user's browser
```

Node.js is to JavaScript tooling roughly what the JVM is to Java tooling, while npm is roughly comparable to Maven. These are analogies, not exact equivalences.

### 2.2 Ports in this repository

| Address | Purpose | Who connects to it? |
|---|---|---|
| `localhost:5173` by default | Vite development server | Local browser |
| `localhost:8080` | Spring Boot during development | Vite proxy or direct API tools |
| `127.0.0.1:55432` | Host mapping for development PostgreSQL | Local Spring Boot / `psql` |
| `db:5432` | PostgreSQL inside the production Compose network | Backend container only |
| `backend:8080` | Spring Boot inside the production Compose network | Caddy container only |
| `127.0.0.1:18080` | Local production-shaped Caddy override | Local browser |
| public `80` / `443` | Production Caddy HTTP/HTTPS | Public browser |

`55432:5432` means host port 55432 forwards to port 5432 inside the database container. It does not change PostgreSQL's internal port.

### 2.3 Development request path

```text
Browser at http://localhost:5173
  -> fetch('/api/sensors')
  -> Vite development proxy
  -> http://localhost:8080/api/sensors
  -> SensorController
  -> SensorService
  -> SensorRepository
  -> PostgreSQL at localhost:55432
  <- Java records serialized as JSON
  <- api.ts validates the JSON at runtime
  <- App updates React state
  <- React renders components
```

The browser uses a relative URL such as `/api/sensors`. This avoids hardcoding different backend hostnames into the UI.

### 2.4 Production request path

```text
Public browser
  -> HTTPS request to Caddy
  -> static request: Caddy serves /srv/index.html or /srv/assets/*
  -> /api request: Caddy proxies it to backend:8080
  -> backend uses jdbc:postgresql://db:5432/industrial_trends
```

Vite's proxy is absent from the compiled production site. Caddy performs the equivalent routing in production.

### Section 2 understanding check

Explain why all four statements are true:

1. React runs in the browser.
2. npm is still required to develop React locally.
3. Vite never talks directly to PostgreSQL.
4. Production can serve the page without running `vite dev`.

---

## 3. Repository tour: every maintained area

```text
industrial-trend-explorer/
├── README.md                         portfolio landing documentation
├── .github/workflows/ci.yml          tests, builds, publishes images
├── .env.example                      names of optional backend variables
├── .env.production.example           production variable template, no secrets
├── compose.yaml                      development PostgreSQL
├── compose.prod.yaml                 three-service production stack
├── compose.local.yaml                safe HTTP override for local container test
├── db/
│   ├── schema.sql                    table definitions and constraints
│   └── seed.sql                      deterministic, repeatable sample data
├── backend/
│   ├── pom.xml                       Java/Maven dependencies and version
│   ├── Dockerfile                    build JAR, run with smaller JRE image
│   └── src/                          Spring application and tests
├── frontend/
│   ├── package.json                  direct packages and npm scripts
│   ├── package-lock.json             exact resolved dependency graph
│   ├── index.html                    browser document and React mount point
│   ├── vite.config.ts                React plugin and development proxy
│   ├── tsconfig*.json                TypeScript rules
│   ├── eslint.config.js              static code-quality rules
│   ├── Dockerfile                    build assets, serve them with Caddy
│   ├── Caddyfile                     production static/proxy routing
│   └── src/                          frontend code and tests
├── scripts/
│   ├── deploy.sh                     explicit SHA deployment and checks
│   └── production-smoke-test.mjs     read-only public acceptance checks
└── docs/                             learning and operations guides
```

Generated directories are deliberately ignored:

- `frontend/node_modules/`: downloaded npm packages;
- `frontend/dist/`: compiled frontend production assets;
- `backend/target/`: compiled Java output;
- `.env` and `.env.*`: private local environments, except the two committed examples.

Never edit generated output as the source of a fix. Edit source or configuration, then regenerate.

### Section 3 understanding check

From the repository root, run:

```bash
pwd
git status --short
find frontend/src -maxdepth 2 -type f | sort
```

Explain which output is source code, which is repository state, and why `node_modules` should not be committed.

---

## 4. Terminal and frontend workflow from zero

The shell has a **current working directory**. Relative paths are interpreted from that directory.

```bash
cd /home/mrrrxiii/industrial-trend-explorer
npm --prefix frontend run build
```

`--prefix frontend` tells npm to operate as though the command were run inside `frontend`. The equivalent is:

```bash
cd frontend
npm run build
```

Useful read-only commands:

| Command | Meaning |
|---|---|
| `pwd` | print the current directory |
| `ls` | list entries in the current directory |
| `rg --files frontend/src` | list source files quickly |
| `rg "getTrend" frontend/src` | find text in source |
| `git status --short` | show changed/untracked files |
| `git diff -- frontend/src/App.tsx` | show unstaged changes to one file |

### The normal edit loop

1. Start from a clean or understood Git state.
2. Read the feature and its tests.
3. Make one small change.
4. Let Vite hot-reload it in the browser.
5. Inspect Console and Network in browser developer tools.
6. Run the narrow test related to the change.
7. Run lint, all frontend tests, and the production build.
8. Inspect `git diff` before committing.

Do not run random commands until an error disappears. Identify which layer owns the failure.

<details>
<summary>Session 1 self-check answers — open after attempting</summary>

- React code runs in the browser; Node runs frontend tools. Spring Boot handles HTTP/API work, and PostgreSQL stores rows.
- The main code areas are `frontend/src`, `backend/src`, and `db`. During development, the browser uses Vite on 5173, Spring Boot on 8080, and the database is mapped to host port 55432.
- A learning branch isolates practice from the starting branch. `git switch -c` creates and switches to it; `git branch --show-current` confirms the current branch.

</details>

> **Stop here for Session 1.** Do not continue until you can describe the visible app, one Network request, and the runtime that owns each part.

### 4.1 Five-minute Git branch lesson

A Git branch is a movable name for a line of project history. It lets you keep a learning exercise separate from the branch you started on. Creating a branch does not publish it to GitHub.

Start from the repository root. First check for existing work:

```bash
git status --short
git branch --show-current
```

If `git status --short` lists changes you do not understand, stop and ask before switching branches. Do not hide or discard someone else's work. Note the current branch name; the command below uses `master` only as an example of a name, not as a required branch.

Create and switch to a new exercise branch:

```bash
git switch -c learning/frontend-basics
git branch --show-current
git status --short
```

The second command should print `learning/frontend-basics`. `git status --short` shows whether the exercise changed files. During the lab, use these read-only commands to inspect your work:

```bash
git status --short
git diff
```

After removing temporary exercise edits, and only when `git status --short` is clean, return to the branch name you noted earlier and remove the now-empty learning branch:

```bash
git switch <the-branch-name-you-noted>
git branch -d learning/frontend-basics
```

Replace the angle-bracket placeholder with the actual name; do not type the brackets. If Git refuses to delete the branch, stop and inspect the message. Never force-delete with `-D`. If you intentionally keep the exercise, leave it on the learning branch and ask the tutor how to review it. Never run `git reset --hard`, `git clean`, or `git restore` just to make status look clean.

---

## 5. Node.js, npm, packages, and scripts

### 5.1 Node.js

JavaScript was created for browsers, but Node.js also executes JavaScript outside a browser. In this project Node runs:

- Vite's development server and production builder;
- the TypeScript compiler;
- ESLint;
- Vitest and jsdom;
- the production smoke-test script.

Node does not replace Spring Boot. It is mainly frontend tooling here.

### 5.2 npm

npm has two roles:

1. install packages declared in `frontend/package.json`;
2. run named commands from the `scripts` object.

The current scripts are:

| Command | Actual action | Use |
|---|---|---|
| `npm --prefix frontend run dev` | `vite` | development server and hot reload |
| `npm --prefix frontend run build` | `tsc -b && vite build` | type-check, then make production assets |
| `npm --prefix frontend run lint` | `eslint .` | find static code problems |
| `npm --prefix frontend test` | `vitest run --environment jsdom` | run tests once in a simulated DOM |
| `npm --prefix frontend run preview` | `vite preview` | preview built assets, not a production server |

The shell operator `&&` runs `vite build` only if `tsc -b` succeeds.

### 5.3 Dependencies and development dependencies

Runtime dependencies are code the application imports:

- `react`: component/state rendering model;
- `react-dom`: connects React to the browser DOM;
- `recharts`: chart components.

Development dependencies support building or testing, such as TypeScript, Vite, ESLint, Vitest, jsdom, type definitions, and Testing Library.

“Runtime dependency” in `package.json` does not mean a Node server loads React in production. Vite bundles needed library code into browser assets.

At the reviewed snapshot, `package.json` requests React 19.2.8, React DOM 19.2.8, Recharts 3.10.1, TypeScript 6.0.2, Vite 8.3.0, and Vitest 5.0.5 through version ranges. The lockfile contains the exact installed graph. Do not memorize these numbers: inspect both files because dependencies change.

### 5.4 `package.json` versus `package-lock.json`

`package.json` declares acceptable direct versions such as `^19.2.8`. The caret normally permits compatible updates within the same major version. TypeScript uses `~6.0.2`, which is narrower and normally permits patch updates within 6.0.

`package-lock.json` records the exact resolved direct and transitive dependency graph, integrity hashes, and lockfile version. It makes CI and another developer install the same graph.

Use:

```bash
npm --prefix frontend ci
```

for a clean, reproducible install from the lockfile. `npm ci` requires the lockfile to agree with `package.json` and replaces the existing installation. Use `npm install <package>` when intentionally changing dependencies; commit both manifest and lockfile changes.

### 5.5 `node_modules`, imports, and bundles

`node_modules` contains installed package files and can be recreated, so Git ignores it. During a production build Vite follows imports, transforms code, removes development-only machinery, minifies output, and writes hashed assets to `frontend/dist`.

A filename such as `index-C5jhUsAa.js` includes a content hash. A changed bundle receives a new name, which helps browsers cache immutable assets safely.

### Section 5 understanding check

Explain:

- the difference between Node and npm;
- why React is under `dependencies` but Vitest is under `devDependencies`;
- why CI uses `npm ci` rather than deleting individual package problems manually;
- why `dist` and `node_modules` are not source files.

<details>
<summary>Session 2 self-check answers — open after attempting</summary>

- Node.js executes JavaScript; npm installs packages and runs package scripts.
- `package.json` declares dependencies and scripts; `package-lock.json` records the resolved dependency graph. `npm ci` installs that locked graph.
- React is bundled for browser use; Vitest is a development/test tool. `node_modules`, `dist`, and `target` are generated and reproducible, not maintained source.

</details>

> **Stop here for Session 2.** Do not continue until you can explain which tools run in the browser and which run on your development machine.

---

## 6. Browser foundations: HTML, DOM, CSS, and JavaScript

### 6.1 HTML describes meaning and structure

`frontend/index.html` contains:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

The `div` is the mount point. The module script begins the frontend program. Other important elements include:

- `<head>` for metadata rather than visible page content;
- `<meta charset="UTF-8">` so symbols such as `°C` decode correctly;
- the viewport meta tag so responsive CSS uses the device width;
- `<title>` for the browser tab and search context;
- a favicon link.

The browser parses HTML into the **Document Object Model**, or DOM: an in-memory tree of nodes. React updates that DOM to match component output.

### 6.2 Semantic HTML in the components

The project uses elements for their meaning:

- `<header>` for page introduction;
- `<nav>` for portfolio links;
- `<main>` for unique primary content;
- `<section>` plus an accessible heading for grouped content;
- `<label>` and `<select>` for sensor selection;
- `<fieldset>` and `<legend>` for related range buttons;
- `<button type="button">` for actions;
- `<table>`, `<caption>`, `<th scope="col">`, and `<time>` for anomalies.

Semantic elements give browsers and assistive technology useful structure before CSS is applied.

### 6.3 CSS controls presentation

A CSS rule has a selector and declarations:

```css
.metric-card {
  padding: var(--space-3);
  border: 1px solid var(--color-border);
}
```

`.metric-card` selects elements whose `class` contains `metric-card`. Each declaration has a property and value.

The cascade decides which matching declaration wins using importance, origin, specificity, and source order. Prefer reusable classes over highly specific selectors because they are easier to reason about.

### 6.4 JavaScript adds behavior

JavaScript values used in this project include:

```ts
const title = 'Pump Pressure';              // string
const hours = 24;                           // number
const anomaly = false;                      // boolean
const sensor = { id: 'pump-pressure' };     // object
const readings = [3.3, 3.4, 5.8];          // array
const absent = null;                        // intentional no-value
```

`const` prevents reassignment of the variable binding. It does not make an object deeply immutable. Use `let` only when the binding itself must change.

Functions package behavior:

```ts
function isOutside(value: number, min: number, max: number) {
  return value < min || value > max;
}
```

An arrow function is another syntax:

```ts
const anomalyValues = readings.filter(reading => reading.anomaly);
```

Important array operations:

- `map`: make one output per input;
- `filter`: keep inputs that satisfy a condition;
- `find`: return the first matching item or `undefined`;
- `every`: verify all items satisfy a condition.

These do not mutate the source array. That fits React's preference for immutable state updates.

### 6.5 Comparisons, logical operators, and conditional values

JavaScript has strict equality and inequality:

```js
hours === 24
sensor.id !== 'missing'
value >= 60 && value <= 80
```

Prefer `===` and `!==`. The loose operators `==` and `!=` perform automatic type conversion, which makes beginner code harder to predict.

Logical operators short-circuit:

- `a && b` evaluates `b` only when `a` is truthy;
- `a || b` uses `b` when `a` is falsy;
- `!a` reverses truthiness.

The values `false`, `0`, an empty string, `null`, `undefined`, and `NaN` are falsy. Arrays and objects are truthy even when empty. This explains conditional JSX such as `sensorError && <p>...</p>`, but explicit comparisons are clearer when zero or an empty string is a legitimate value.

A ternary expression chooses a value:

```js
const label = reading.anomaly ? 'Anomaly' : 'Normal';
```

It is an expression, so React can use it inside braces. Avoid deeply nested ternaries.

### 6.6 Objects, destructuring, spread, and template strings

Read properties with dot syntax:

```js
sensor.name
reading.timestamp
```

Destructuring pulls named properties into local variables:

```js
const { name, unit } = sensor;
```

React component parameters use the same language feature:

```ts
function SensorDetails({ sensor }: Props) {
  // ...
}
```

Object spread makes a shallow copy with selected replacements:

```js
const sixHourTrend = { ...trend, hours: 6 };
```

Array spread supplies or copies elements:

```js
const values = [68, 70, 86];
const copy = [...values];
Math.max(...values);
```

A shallow copy does not recursively clone nested objects. The spread syntax has different effects depending on whether it appears in an object, array, or function call.

Template strings use backticks and interpolate expressions:

```js
const message = `Request failed with status ${response.status}`;
```

### 6.7 Functions, scope, and closures

Declarations and arrow functions both create callable values:

```js
function formatValue(value, unit) {
  return value + ' ' + unit;
}

const formatValueArrow = (value, unit) => value + ' ' + unit;
```

Variables declared inside a function are local to that function. JavaScript uses lexical scope: code can access bindings from the surrounding source scopes.

A callback can remember those surrounding values. In `TimeRangeSelector`:

```tsx
onClick={() => onChange(hours)}
```

the function closes over the `hours` value for that mapped button. This remembered surrounding environment is called a **closure**.

### 6.8 Immutability and React-friendly updates

Do not mutate an array received through props or stored in state:

```js
// Avoid
readings.push(newReading);

// Create a new array
const nextReadings = [...readings, newReading];
```

For an object:

```js
const nextSensor = { ...sensor, name: 'Updated name' };
```

React compares identities while scheduling and reconciling updates. Creating new arrays/objects makes a change explicit and prevents one component from unexpectedly modifying another component's data.

### 6.9 Lab: inspect HTML and CSS without changing source

Use the running page from Session 1.

1. Open developer tools → Elements.
2. Find `<main class="dashboard-content">`.
3. Expand it and locate the sensor `<select>`, one metric `<article>`, and the chart section.
4. Select a metric card. In Styles, temporarily add `outline: 3px solid magenta`.
5. Disable and re-enable its `padding` declaration.
6. Temporarily edit the dashboard subtitle text in Elements.
7. Reload the page.

Expected result: the temporary DOM/style edits disappear after reload because developer tools changed the browser's current DOM, not `App.tsx` or `index.css`.

Teach-back: identify the element, its classes, which rule supplied the padding, and why the source file remained unchanged.

### 6.10 Lab: write JavaScript in the browser console

The browser console accepts JavaScript, not TypeScript type annotations. Paste the following data:

```js
const tutorialReadings = [
  { timestamp: '2026-10-01T05:30:00Z', value: 69, anomaly: false },
  { timestamp: '2026-10-01T06:00:00Z', value: 86, anomaly: true },
  { timestamp: '2026-10-01T06:30:00Z', value: 72, anomaly: false },
];
```

Before running each expression, predict its result:

```js
tutorialReadings.map(reading => reading.value)
tutorialReadings.filter(reading => reading.anomaly)
tutorialReadings.find(reading => reading.value > 80)
tutorialReadings.every(reading => typeof reading.timestamp === 'string')
```

Expected results:

- `map` returns `[69, 86, 72]`;
- `filter` returns a new one-item array containing the 86 reading;
- `find` returns that reading object, not an array;
- `every` returns `true`.

Now write and call:

```js
function labelReading(reading) {
  const status = reading.anomaly ? 'Anomaly' : 'Normal';
  return `${reading.value} °C — ${status}`;
}

tutorialReadings.map(labelReading)
```

Expected output is an array of three labels. Explain the parameter, local variable, return value, callback, input array, and output array.

### 6.11 Lab: connect syntax to the real source

Find one real use of `map`, `filter`, `find`, and `every` under `frontend/src`. For each, write:

1. the input value and its type;
2. what the callback returns;
3. the operation's final result;
4. whether the source array changes.

Then find one real example of destructuring, spread, a ternary, short-circuit `&&`, and a template string.

### Section 6 understanding check

The learner passes when they can write a small object, array, function, conditional, `map`, and `filter` without copying; distinguish HTML structure from CSS presentation and JavaScript behavior; and explain why the console lab does not accept TypeScript annotations.

<details>
<summary>Session 3 self-check answers — open after attempting</summary>

- HTML describes structure and meaning; the browser builds a DOM tree. CSS controls presentation; JavaScript adds behavior.
- The console expressions return `[69, 86, 72]`, a one-item array containing the anomaly, the anomaly object, and `true`, respectively.
- Mapping the formatter returns three strings: `69 °C — Normal`, `86 °C — Anomaly`, and `72 °C — Normal`. The browser console accepts JavaScript, not TypeScript type annotations.

</details>

> **Stop here for Session 3.** Do not continue until you can predict and explain the console results without copying them.

---

## 7. TypeScript: JavaScript checked before it runs

Browsers execute JavaScript, not TypeScript source types. TypeScript checks code during development/build and then the types are erased.

### 7.1 Object types

`frontend/src/types.ts` defines:

```ts
export type Sensor = {
  id: string;
  name: string;
  unit: string;
  normalMin: number;
  normalMax: number;
};
```

This says what a valid `Sensor` value must look like. It creates no runtime class and no constructor.

Java comparison:

```text
Java record Sensor(...)       TypeScript object type Sensor
enforced at Java runtime      checked only while TypeScript is compiled
serialized/deserialized       disappears from emitted JavaScript
```

### 7.2 Arrays, functions, and props

```ts
type Props = {
  sensors: Sensor[];
  selectedId: string;
  onChange: (id: string) => void;
};
```

- `Sensor[]` means an array of `Sensor` objects.
- `(id: string) => void` means a function accepting a string and returning no useful value.
- A component receives one props object, then destructures its fields.

### 7.3 Union types constrain states

```ts
export type TimeRangeHours = 1 | 6 | 24;
type LoadStatus = 'loading' | 'empty' | 'error' | 'success';
```

These types prevent unsupported values in checked frontend code. They are safer than a general `number` or `string`, but API data still requires runtime validation.

### 7.4 Null and undefined

The summary allows missing measurements:

```ts
min: number | null;
```

The backend returns `null` for min/max/avg when no readings exist. `find` returns `undefined` if no sensor matches. These are distinct JavaScript values.

The UI narrows nullable values before use:

```ts
if (value === null) return 'No data';
```

### 7.5 `unknown` and narrowing

Network JSON is not trusted merely because a function claims it will return `TrendResponse`. `response.json()` can contain any shape. `api.ts` treats it as `unknown` and proves properties step by step.

```ts
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
```

`value is Record<string, unknown>` is a **type predicate**. If the function returns true, TypeScript narrows the value inside the caller's true branch.

### 7.6 Useful syntax found in the project

| Syntax | Meaning |
|---|---|
| `import type { Sensor }` | import only a compile-time type |
| `trend?.sensor.id` | optional chaining; stop with `undefined` if `trend` is nullish |
| `payload?.[0]?.payload` | safely follow possibly missing array/property values |
| `document.getElementById('root')!` | non-null assertion; developer promises the element exists |
| `error instanceof Error` | runtime narrowing before reading `.message` |
| `alert?: boolean` | optional property |
| `alert = false` | default during destructuring |
| `[number, number]` | fixed two-item tuple |
| `as Reading` | type assertion; developer takes responsibility for this claim |
| `...reactorTrend` | shallow object spread/copy |

Use assertions sparingly. An assertion does not validate a runtime value.

### 7.7 TypeScript compiler configuration

`frontend/tsconfig.json` is a project-reference root. It points to:

- `tsconfig.app.json` for browser source under `src`;
- `tsconfig.node.json` for the Node-executed Vite configuration.

Important app settings:

- `target: es2023`: emitted language target;
- `lib: [ES2023, DOM]`: standard JavaScript and browser API types;
- `module: esnext` and `moduleResolution: bundler`: Vite resolves modern modules;
- `jsx: react-jsx`: compile JSX with the modern React transform;
- `noEmit: true`: TypeScript checks; Vite emits the bundle;
- `noUnusedLocals` / `noUnusedParameters`: catch dead declarations;
- `noFallthroughCasesInSwitch`: prevent accidental switch fallthrough;
- `verbatimModuleSyntax`: preserve explicit import/export intent;
- `erasableSyntaxOnly`: keep source to syntax that can be safely type-erased.

The Node config uses Node types and `nodenext` module behavior because `vite.config.ts` runs under tooling rather than in the browser.

### 7.8 Lab: write and type-check a small TypeScript module

Work on a learning branch and create `frontend/src/learning.ts` in the editor:

```ts
import type { Sensor } from './types';

export function formatNormalRange(sensor: Sensor): string {
  return `${sensor.normalMin}–${sensor.normalMax} ${sensor.unit}`;
}

const exampleSensor: Sensor = {
  id: 'practice-temperature',
  name: 'Practice Temperature',
  unit: '°C',
  normalMin: 60,
  normalMax: 80,
};

console.log(formatNormalRange(exampleSensor));
```

The module is not imported by `main.tsx`, so Vite does not put it in the browser bundle, but `tsconfig.app.json` includes all source files and TypeScript checks it.

Run:

```bash
npm --prefix frontend run build
```

Then deliberately change `normalMin: 60` to `normalMin: '60'` and run the build again. Read the exact type error. Restore the number and confirm the build passes.

Use `git status --short` to confirm the new learning file. After the teach-back, remove it through the editor only if it was created solely for this exercise; confirm the status no longer lists it. Never remove an unfamiliar file merely because a tutorial expects a name.

Teach-back:

- Which parts exist at runtime?
- Which parts are erased?
- What does the parameter type protect?
- What does the return annotation protect?
- Why did an unimported file still receive type checking?

### Section 7 understanding check

Explain why `TimeRangeHours` prevents `2` in TypeScript source but cannot stop a server from returning `{ "hours": 2 }`. Identify the separate runtime code that catches the server problem. The learner must also complete the TypeScript lab without leaving the intentional error in the repository.

---

## 8. ES modules, entry points, Vite, and ESLint

### 8.1 Imports and exports

Named export/import:

```ts
export function getSensors() { /* ... */ }
import { getSensors } from './api';
```

Default export/import:

```ts
export default App;
import App from './App.tsx';
```

Local relative imports begin with `./` or `../`. Package imports such as `react` are resolved from installed dependencies.

`"type": "module"` in `package.json` makes `.js` files in this package use modern ECMAScript module rules.

### 8.2 Startup sequence

1. Browser loads `frontend/index.html`.
2. Its module script loads `/src/main.tsx` in development.
3. `main.tsx` imports global CSS and `App`.
4. `createRoot` attaches React to `<div id="root">`.
5. React renders `<App />`.
6. `App` renders child components and begins effects after commit.

`StrictMode` enables extra development checks. In development React can deliberately run an effect setup/cleanup cycle again to reveal unsafe effects. A duplicate-looking development request can therefore be a Strict Mode diagnostic; production does not perform that extra development cycle. Effects still must be written so cleanup is correct.

### 8.3 Vite configuration

`frontend/vite.config.ts`:

- enables React transformation/refresh through `@vitejs/plugin-react`;
- starts the development server;
- forwards paths beginning `/api` to `http://localhost:8080`;
- sets `changeOrigin: true` for the forwarded request host header.

The proxy works only while Vite is the server. It is not compiled into browser code.

### 8.4 Hot module replacement

During development Vite updates changed modules without a full manual rebuild. This fast feedback is for development; always run the production build before declaring a change complete.

### 8.5 ESLint

`eslint.config.js` applies recommended JavaScript, TypeScript, React Hooks, and Vite React Refresh rules to `ts` and `tsx` files. It defines browser globals and ignores `dist`.

TypeScript and ESLint overlap but are not identical:

- TypeScript checks type consistency.
- ESLint checks code patterns, Hook usage, and other static quality rules.
- Tests check behavior.
- The production build checks that deployable assets can be generated.

Passing one does not imply all others pass.

<details>
<summary>Session 4 self-check answers — open after attempting</summary>

- TypeScript checks source during development/build and erases its types; it does not validate incoming JSON. `api.ts` performs runtime guards for network data.
- `main.tsx` is the browser app entry imported by `index.html`; Vite serves/transforms it during development and builds deployable assets.
- TypeScript checks types, ESLint checks configured code patterns, and Vite emits assets. Each check proves something different.

</details>

> **Stop here for Session 4.** Do not continue until the type error has been corrected and the temporary module is removed or intentionally retained.

---

## 9. React mental model

### 9.1 A component is a function of inputs

```ts
export function SensorDetails({ sensor }: Props) {
  return <h2>{sensor.name}</h2>;
}
```

A React function component receives props and returns JSX, a description of UI. JSX resembles HTML but is JavaScript syntax transformed by the build tool.

Differences visible here:

- use `className`, not HTML's `class`;
- JavaScript expressions go inside `{}`;
- component tags start with uppercase letters;
- event handlers receive functions, not strings;
- all opened elements must be closed.

### 9.2 Props flow down

`App` passes values into children:

```tsx
<SensorSelector
  sensors={sensors}
  selectedId={selectedSensorId}
  onChange={handleSensorChange}
/>
```

Props are read-only inputs from the child's perspective. The child reports an event by calling the callback prop; the parent decides how state changes.

### 9.3 State is component memory

```ts
const [timeRangeHours, setTimeRangeHours] = useState<TimeRangeHours>(24);
```

- `timeRangeHours` is the current value;
- `setTimeRangeHours` schedules a new value;
- `24` is the initial value;
- calling the setter causes React to render again.

State updates are scheduled, not immediate mutation of the current render's variable.

### 9.4 Derived data is not extra state

```ts
const selectedSensor = sensors.find(sensor => sensor.id === selectedSensorId);
```

`selectedSensor` can be calculated from existing state on every render, so storing it independently would create two sources of truth that might disagree.

Likewise, `AnomalyList` derives its list with `readings.filter(...)` instead of keeping another anomaly state.

### 9.5 Events

```tsx
onClick={() => onChange(hours)}
```

This passes a function for React to call later. Writing `onClick={onChange(hours)}` would call it during rendering instead.

The selector reads the browser event:

```tsx
onChange={event => onChange(event.target.value)}
```

### 9.6 Controlled inputs

The sensor `<select>` receives `value={selectedId}`. React state is the source of truth. A change event asks the parent to update that state, then the selected option follows the new prop.

This cycle is:

```text
state -> value prop -> visible selection
user action -> event callback -> state setter -> rerender
```

### 9.7 Conditional rendering

```tsx
{sensorError && <p role="alert">...</p>}
{status === 'loading' && <p>Loading trend...</p>}
```

The left condition controls whether the JSX exists. A ternary chooses one of two branches:

```tsx
{anomalies.length === 0 ? <p>No anomalous readings.</p> : <table>...</table>}
```

### 9.8 Lists and keys

```tsx
{sensors.map(sensor => (
  <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
))}
```

The stable `key` helps React match list elements between renders. Use a stable domain identity, not a random value.

### 9.9 Effects synchronize with systems outside React

Fetching is an external synchronization, so `App` uses `useEffect`.

```ts
useEffect(() => {
  // start synchronization
  return () => controller.abort(); // stop the old synchronization
}, [selectedSensorId, timeRangeHours]);
```

React runs the effect after rendering. It reruns when a dependency changes, calling the prior cleanup first. Do not use an effect for a calculation that can happen during rendering.

### 9.10 Hook rules

Hooks such as `useState` and `useEffect` must be called at the top level of a React component or custom Hook, not inside a condition or loop. React relies on a consistent call order.

### 9.11 Render, commit, and functional state updates

A simplified update cycle is:

1. an event handler asks for a state change;
2. React schedules rendering;
3. React calls the affected components to calculate new JSX;
4. React commits necessary DOM changes;
5. effects whose dependencies changed synchronize afterward.

Rendering should stay pure: given the same props and state, calculate the same JSX without starting network requests or changing external systems.

When the next state depends on the previous state, pass an updater function:

```ts
setCount(current => current + 1);
```

React supplies the latest queued value as `current`. This is safer than closing over an older render's value when multiple updates are scheduled.

### 9.12 Lab: write a typed stateful component

On a learning branch, create `frontend/src/components/LearningCounter.tsx`:

```tsx
import { useState } from 'react';

type Props = {
  label: string;
};

export function LearningCounter({ label }: Props) {
  const [count, setCount] = useState(0);

  return (
    <section className="panel">
      <h2>{label}</h2>
      <p>Observations: {count}</p>
      <button
        type="button"
        onClick={() => setCount(current => current + 1)}
      >
        Add observation
      </button>
    </section>
  );
}
```

Then, with the tutor, temporarily:

1. import `LearningCounter` in `App.tsx`;
2. render `<LearningCounter label="React practice" />` as the first child inside `<main className="dashboard-content">`;
3. let Vite reload;
4. click the button three times;
5. change the label prop and observe the result;
6. inspect the component's DOM in developer tools;
7. run lint and the production build.

Predict before clicking: changing state rerenders `LearningCounter`, while its parent-owned label still arrives through props.

After the teach-back, remove the temporary import, element, and learning file unless you intentionally want to keep the feature. Use `git diff` plus `git status --short` to prove the original application source is restored.

### Section 9 understanding check

For `selectedSensorId`, identify:

1. where it is initialized;
2. where it is updated;
3. which UI is controlled by it;
4. which effect depends on it;
5. which value is derived from it.

The learner also passes when they can create the practice component, identify its prop/state/event/render flow, and restore the project without asking the tutor to type the solution.

<details>
<summary>Session 5 self-check answers — open after attempting</summary>

- Props are read-only inputs from a parent; state is component memory changed through a setter, which schedules a rerender.
- `selectedSensorId` is initialized in `App`, changed by the selector callback, controls the selected sensor, and is a dependency of the trend effect. `selectedSensor` is derived by finding that id in the sensor list.
- The practice counter's label is a prop; its count is local state; clicking calls the setter and updates the rendered count.

</details>

> **Stop here for Session 5.** Do not continue until you can trace one prop, one state value, and one event through a render.

---

## 10. The shared frontend data contract

Read `frontend/src/types.ts` and the Java records beside it.

| Frontend type | Backend record | Purpose |
|---|---|---|
| `Sensor` | `Sensor` | id, display name, unit, normal limits |
| `Reading` | `Reading` | ISO timestamp, numeric value, anomaly flag |
| `Summary` | `Summary` | count/statistics/time coverage |
| `TrendResponse` | `TrendResponse` | selected sensor, rows, summary, hours |
| `Explanation` | `ExplanationResponse` | sensor id, plain text, LIVE/MOCK mode |

JSON naming matches TypeScript property naming because Java records serialize to camel-case field names.

### 10.1 Why the frontend does not calculate anomalies

The backend owns the rule:

```java
value < sensor.normalMin() || value > sensor.normalMax()
```

The boundary itself is normal. React displays the returned `anomaly` flag. This avoids the chart, table, Java tests, and API disagreeing about the business rule.

### 10.2 Empty summary contract

For no readings, Java returns:

```json
{
  "count": 0,
  "min": null,
  "max": null,
  "avg": null,
  "anomalyCount": 0,
  "firstTimestamp": null,
  "lastTimestamp": null
}
```

This is why TypeScript uses nullable fields and `SummaryCards` can say `No data` rather than display JavaScript's `Infinity` or `NaN`.

---

## 11. API programming: promises, fetch, HTTP, and runtime validation

Read `frontend/src/api.ts` from top to bottom.

### 11.1 A Promise represents a future result

`fetch` cannot block the browser while the network responds. It immediately returns a `Promise<Response>`.

```ts
const response = await fetch('/api/sensors');
```

`await` pauses only this async function's continuation. The browser remains able to render and receive events.

When a browser console prints `Promise { <pending> }`, it shows the immediate Promise, not an error. Log or await the eventual value inside an async function.

A Promise has three conceptual states:

- **pending:** no result yet;
- **fulfilled:** completed with a value;
- **rejected:** completed with an error/reason.

### 11.2 The event loop and what `await` actually does

Browser JavaScript normally runs one piece of main-thread JavaScript at a time. The browser also provides network, timer, rendering, and event systems. A simplified fetch timeline is:

```text
React click/effect code runs on the JavaScript call stack
  -> fetch asks the browser network system to start a request
  -> the async function reaches await and yields
  -> the call stack becomes available; the browser can handle input/rendering
  -> the network response settles the Promise
  -> the continuation after await is queued as a microtask
  -> after the current stack is empty, the event loop runs that continuation
  -> a React state setter schedules another render
```

`await` does not freeze the page and does not make the network synchronous. It makes the continuation readable in a top-to-bottom style.

The same asynchronous operation can be expressed with Promise methods:

```ts
getSensors()
  .then(data => setSensors(data))
  .catch(error => setSensorError(String(error)))
  .finally(() => setSensorsLoaded(true));
```

`App` uses that form for the catalog and trend requests. `AiExplanation` uses `async`/`await` plus `try/catch/finally`. Both styles operate on Promises.

### 11.3 HTTP success must be checked

`fetch` rejects for failures such as an unavailable network, but a server response with HTTP 404 or 500 normally resolves to a `Response`. Therefore:

```ts
if (!response.ok) {
  throw new Error(`Request failed with status ${response.status}`);
}
```

`response.ok` is true for 2xx status codes.

### 11.4 JSON parsing does not validate a contract

`response.json()` parses JSON syntax. It does not prove the expected fields or types. This project validates:

- a response object is not null;
- strings are strings;
- numbers are finite;
- counts are integers;
- nullable fields are correct;
- arrays contain only valid items;
- `hours` is supported and equals the requested window.

These guards are useful **structural validation**, not complete semantic validation. The current frontend does not prove that:

- timestamps are parseable or chronological;
- counts are nonnegative;
- `summary.count` equals `readings.length`;
- `anomalyCount` equals the number of flagged readings;
- normal minimum is below normal maximum;
- the returned sensor ID equals the requested sensor ID;
- the explanation's sensor ID equals the requested sensor ID.

The public smoke test checks some cross-field facts, and the backend is currently trusted to produce the others. For a higher-risk client, extend the guard with expected sensor ID and domain invariants. Do not claim that a type predicate automatically validates every business rule.

One current consequence is worth noticing: if a trend response has valid field types and matching hours but the wrong sensor ID, `getTrend` accepts it. `App` then refuses to render it through `trend.sensor.id === selectedSensorId`, which can leave a success state with no trend panels instead of a clear contract error.

This creates two defenses:

1. TypeScript prevents mistakes written in the frontend source.
2. Runtime guards reject invalid data arriving across the network.

### 11.5 Endpoints

| Frontend function | HTTP request | Expected result |
|---|---|---|
| `getSensors()` | `GET /api/sensors` | `Sensor[]` |
| `getTrend(id, hours, signal)` | `GET /api/sensors/{encodedId}/trend?hours=...` | `TrendResponse` |
| `getExplanation(id, hours)` | `POST /api/sensors/{encodedId}/explanation?hours=...` | `Explanation` |

`encodeURIComponent(id)` prevents a path value from accidentally being interpreted as path/query syntax. The range is safe because its TypeScript union permits only numeric literals 1, 6, and 24; the server validates independently.

### 11.6 Why explanation uses POST

The request triggers generation work and is explicitly user initiated. Although no database row is created, POST communicates an action better than a cacheable read. It is not called during initial rendering.

### 11.7 Abort signals

`getTrend` accepts an `AbortSignal` and passes it to `fetch`. Aborting the controller tells the browser that the obsolete request is no longer needed.

### Section 11 understanding check

Describe three different failures:

1. backend is not running;
2. backend returns HTTP 500 JSON;
3. backend returns HTTP 200 with `hours: 2`.

For each, explain which code detects it and what `App` displays.

<details>
<summary>Session 6 self-check answers — open after attempting</summary>

- If the backend is unreachable, `fetch` rejects and the trend effect's catch displays an error alert.
- An HTTP 500 normally resolves to a `Response`; `requireSuccessfulJson` sees `ok === false` and throws, which also becomes the visible error state.
- HTTP 200 with `hours: 2` parses as JSON but fails `isTrendResponse`; the frontend rejects it instead of accepting an invalid contract.
- `AbortController` tells the browser to stop needing an obsolete trend response; it does not guarantee the server stopped processing.

</details>

> **Stop here for Session 6.** Do not continue until you can distinguish a network failure, HTTP failure, and invalid JSON contract.

---

## 12. `App.tsx`: page orchestration and asynchronous state

`App` is the composition root for the page. It does not draw the chart itself; it owns data-loading state and passes validated data to presentation components.

### 12.1 State inventory

| State | Initial value | Responsibility |
|---|---|---|
| `sensors` | `[]` | sensor catalog from API |
| `selectedSensorId` | `''` | current controlled selection |
| `timeRangeHours` | `24` | selected window |
| `sensorError` | `null` | catalog failure message |
| `trend` | `null` | current validated trend response |
| `status` | `'loading'` | trend loading/empty/error/success state machine |
| `trendError` | `null` | trend failure detail |
| `sensorsLoaded` | `false` | distinguishes not-yet-finished from empty result |

### 12.2 Initial sensor request

The first effect has `[]` dependencies, meaning it is tied to the component mount lifecycle. It:

1. calls `getSensors`;
2. stores the array;
3. selects the first sensor if one exists;
4. stores an error if rejected;
5. marks the catalog attempt finished in `finally`.

The first sensor is Pump Pressure because the repository SQL orders by id, and `pump-pressure` sorts before `reactor-temp`.

### 12.3 Trend request effect

The second effect depends on the selected id and hours. If the id is blank, it returns without requesting. Otherwise it:

1. creates an `AbortController`;
2. calls `getTrend` with its signal;
3. ignores resolution if already aborted;
4. stores data;
5. chooses `empty` or `success` based on returned rows;
6. stores a failure and chooses `error` when appropriate;
7. aborts during cleanup.

### 12.4 Why old UI is cleared before requesting

Both change handlers perform:

```ts
setStatus('loading');
setTrend(null);
setTrendError(null);
```

before updating selection. This immediately tells the user work is happening and avoids displaying Reactor numbers under a newly selected Pump heading.

### 12.5 Race-condition defense

Suppose the user selects Reactor, then quickly selects Pump:

```text
request A: Reactor starts
request B: Pump starts
request B finishes and displays Pump
request A finishes later
```

Without cancellation, A could overwrite B. Cleanup aborts A. The success handler also checks `controller.signal.aborted`. Rendering additionally requires `trend.sensor.id === selectedSensorId`. These are complementary safeguards.

#### Current cancellation boundaries

Be precise about what the finished project does:

- the trend GET request receives an `AbortSignal` and is canceled during effect cleanup;
- the initial sensor-catalog GET has no abort controller, so Strict Mode can expose an extra development request and an unmount does not cancel that network work;
- the explanation POST has no abort signal;
- disabling the explanation button prevents concurrent clicks in the same mounted component;
- changing sensor/range changes the component `key` and clears visible explanation state, but an already-started backend/model request may continue on the server.

These are acceptable tradeoffs for this small demo, not a universal async pattern. A costly or long-running provider should support a deliberate cancellation/idempotency design; aborting a browser connection alone does not guarantee remote work stopped.

### 12.6 UI states

The page represents separate situations rather than leaving stale content visible:

- sensor catalog loading;
- sensor catalog error;
- no sensors;
- trend loading;
- no readings for the selected range;
- trend error;
- success.

This is a small UI state machine. Adding independent booleans such as `isLoading`, `isEmpty`, `hasError`, and `hasData` could allow contradictory combinations. The union status permits one trend state at a time.

### 12.7 Component composition

Successful data flows down as:

```text
App
├── SensorDetails
├── SensorSelector
├── TimeRangeSelector
├── SummaryCards
├── TrendChart
└── insight panels
    ├── AnomalyList
    └── AiExplanation
```

`AiExplanation` has a `key` made from sensor id and hours. When either changes, React treats it as a new component instance, so its local result/error/pending state resets. This is a deliberate lifecycle tool.

### Section 12 understanding check

Draw the state transitions for:

```text
page opens -> sensors arrive -> trend arrives -> user selects 6H -> trend fails
```

Name the state values and visible message/content at each stage.

---

## 13. Component-by-component walkthrough

### 13.1 `SensorSelector.tsx`

Concepts:

- typed props;
- accessible label associated through `htmlFor="sensor"` and `id="sensor"`;
- controlled `<select>`;
- array `map` into `<option>` elements;
- stable keys;
- callback from child to parent.

The component does not fetch data and does not own selected state. That makes it reusable and easy to test.

### 13.2 `TimeRangeSelector.tsx`

The three valid values are a typed array. A `fieldset` groups the controls. `aria-pressed` communicates the toggle state to assistive technology and also gives CSS a reliable styling attribute.

Every button declares `type="button"`, preventing accidental form submission if the component is later placed inside a form.

### 13.3 `SensorDetails.tsx`

This pure presentation component displays the selected sensor and normal range. Its `<h2 id="sensor-context-heading">` labels the containing section through `aria-labelledby` in `App`.

### 13.4 `SummaryCards.tsx`

This file demonstrates component extraction:

- `SummaryCards` lays out the section;
- private `MetricCard` removes repeated markup;
- private `formatMeasurement` centralizes null/unit/decimal behavior.

The average uses two decimal places; min and max use their ordinary string representation. The anomaly card receives alert styling only when the count is greater than zero.

### 13.5 `AnomalyList.tsx`

The component filters only backend-flagged readings. It renders either:

- an explicit empty message; or
- a semantic table with a visually hidden caption.

`<time dateTime={reading.timestamp}>` preserves a machine-readable ISO timestamp while showing a friendlier UTC string. The formatting uses string replacement because the API produces a known ISO `...T...Z` form; a locale-sensitive production application might use `Intl.DateTimeFormat` instead.

### 13.6 `AiExplanation.tsx`

This component owns state specific to one on-demand action:

- `pending` disables repeated clicks and changes button/status text;
- `explanation` stores successful validated data;
- `error` stores a failure message.

`handleExplain` uses `try/catch/finally`, the async equivalent of Java exception handling structure. It clears the previous result/error before starting and always clears pending state.

The click uses:

```tsx
onClick={() => void handleExplain()}
```

The `void` explicitly discards the Promise returned by the async function because React's click handler does not await it.

React renders `explanation.text` inside a normal `<p>`. React escapes strings, so model text such as `<b>...</b>` is shown as text rather than executed as HTML. The project does not use `dangerouslySetInnerHTML`.

The mode label is truthful:

- `LIVE AI` only when the backend provider reports `LIVE`;
- `MOCK — NOT AI` for deterministic mock output.

The component does not pass an `AbortSignal` to `getExplanation`. Its `key`-based remount clears the old visible state, but it is not cancellation of the HTTP/provider operation. This distinction is part of the project's honest async model.

### 13.7 `TrendChart.tsx`

Recharts provides React components rather than a separate imperative drawing API.

Data preparation:

1. extract numeric values with `map`;
2. include normal min/max when finding chart bounds;
3. add 10% padding, with a minimum of 0.1;
4. round domain boundaries outward to one decimal.

The chart is rendered only for the success state, so `readings` is nonempty when spread into `Math.min` and `Math.max`.

Chart pieces:

- `ResponsiveContainer`: follows the CSS-sized wrapper;
- `LineChart`: establishes data and margins;
- `CartesianGrid`: horizontal visual guide;
- `XAxis`: timestamp values formatted to `HH:mm`;
- `YAxis`: calculated sensor-specific domain and unit label;
- `ReferenceArea`: shaded normal range;
- two `ReferenceLine` components: lower and upper bounds;
- `Tooltip`: custom timestamp/value/status card;
- `Line`: monotone trend line and active point.

`AnomalyDot` returns `null` for normal readings and a red SVG circle for anomaly readings. It checks `cx` and `cy` at runtime because the chart library may omit coordinates. It trusts the Java-provided anomaly flag.

The chart wrapper needs an explicit height (`340px`, `280px` on phones). A percentage-height SVG cannot become visible if every ancestor has automatic zero content height.

The chart container has a concise `role="img"` label. The anomaly table supplies exact accessible values; a complex SVG chart alone is not a complete accessible data representation.

### Section 13 understanding check

Choose any two components and explain:

- what data they own;
- what data they receive;
- what events they emit;
- what derived data they compute;
- why those responsibilities belong there.

<details>
<summary>Session 7 self-check answers — open after attempting</summary>

- `App` owns the sensor list, selected id, time range, request status, current trend, and errors. `selectedSensor` is derived from the list and selected id.
- A sensor/range change clears the old trend and error, sets loading, then the effect requests new data. Cleanup aborts the previous trend request; success, empty, and error responses render distinct UI.
- Selector and range controls emit changes through callbacks. Summary, chart, and anomaly components receive data as props and focus on presentation.

</details>

> **Stop here for Session 7.** Do not continue until you can draw the state transitions and explain why stale data is cleared.

---

## 14. CSS from first principles to this dashboard

Read `frontend/src/index.css` by section, not as one 736-line wall.

### 14.1 Design tokens

`:root` defines custom properties such as:

```css
--color-accent: #0f6b78;
--space-4: 1.5rem;
--radius-large: 18px;
```

Use them with `var(...)`. Tokens keep visual decisions consistent and make a future theme change localized.

### 14.2 Units

- `px`: fixed CSS pixel, useful for borders and explicit chart height;
- `rem`: relative to the root font size, useful for spacing/type;
- `%`: relative to a containing dimension;
- `vw`: percentage of viewport width;
- `ch`: approximate width of the `0` character, useful for readable text lines.

`clamp(2rem, 5vw, 3.25rem)` gives the heading a minimum, fluid preference, and maximum.

### 14.3 The box model

Every element has content, padding, border, and margin. The global rule:

```css
* { box-sizing: border-box; }
```

makes a declared width include padding and border, which makes layout sizing easier to predict.

### 14.4 Cascade, specificity, inheritance, and normal flow

When multiple declarations target the same property, use this beginner debugging order:

1. Is the rule loaded and does its selector match?
2. Is another declaration marked `!important`? This project avoids it except defensive reduced-motion declarations.
3. Which selector is more specific? An ID is stronger than a class/attribute/pseudo-class, which is stronger than an element selector.
4. If specificity is equal, which declaration appears later?

For example, `button` supplies shared button styling, while `.time-range-button` is more specific and overrides selected properties. `.time-range-button[aria-pressed="true"]` adds an attribute selector and represents the selected variation.

Some properties inherit from a parent, including much text color and font behavior. Box properties such as margin, padding, border, width, and grid definitions normally do not inherit. In developer tools, the Computed panel shows the winning value; the Styles panel shows crossed-out declarations that lost the cascade.

Before Flexbox/Grid positioning, elements participate in normal document flow. Block elements generally stack vertically; inline content flows inside lines. Flex and Grid change the layout of a container's direct children, not every descendant automatically.

### 14.5 Reusable panel class

`.panel` owns the common white surface, padding, border, radius, and shadow. Components combine it with a responsibility class such as `chart-panel` or `ai-panel`.

This is ordinary class composition:

```tsx
<section className="panel chart-panel">
```

### 14.6 Flexbox versus Grid

Use Flexbox for primarily one-dimensional arrangement:

- header content side by side;
- sensor controls;
- button rows;
- legends.

Use Grid for rows and columns:

- page panel stack and gaps;
- auto-fitting summary cards;
- two insight panels;
- internal card layout.

`grid-template-columns: repeat(auto-fit, minmax(145px, 1fr))` creates as many cards as fit, never narrower than 145px, sharing remaining space.

`minmax(0, 1fr)` permits grid children to shrink instead of forcing page overflow because of their content's intrinsic width.

### 14.7 Responsive design

The desktop layout is the default. Media queries adjust it:

- 721–900px: sensor identity takes its own row;
- at most 720px: header and controls stack, chart legend moves below heading, chart height reduces, insight panels become one column, spacing tightens.

Responsive design is not a separate mobile application. The same semantic content adapts to available width.

### 14.8 Overflow

The anomaly table wrapper uses `overflow-x: auto`. If a narrow screen cannot fit the table columns, that panel can scroll without forcing the entire page wider.

### 14.9 Interaction and accessibility styles

- controls have a minimum 44px height for comfortable targets;
- `:hover:not(:disabled)` avoids hover styling a disabled button;
- `:focus-visible` gives keyboard users a clear focus ring;
- status error colors are not the only indication because text and `role="alert"` are present;
- `.visually-hidden` keeps a table caption available to assistive technology;
- the reduced-motion query minimizes transitions for users requesting it.

Do not remove focus outlines without supplying a visible replacement.

### 14.10 Specific selectors worth reading

- `.metric-card--alert`: modifier class for one variation;
- `.time-range-button[aria-pressed="true"]`: state styling from an accessibility attribute;
- `.anomaly-table tbody tr:last-child td`: remove the final row border;
- `.sensor-content > .insight-panels`: direct-child selection to constrain layout scope;
- `li + li`: adjacent sibling spacing only between list items.

### Exercise 14A: write and apply one CSS class

On a learning branch, add this temporary rule to the bottom of `index.css`:

```css
.learning-outline {
  padding: 1rem;
  outline: 3px dashed #7c3aed;
  background: #f5f3ff;
}
```

Temporarily add `learning-outline` to the `className` of the sensor-context section in `App.tsx`. Predict which properties affect the section's box and which existing `.panel` properties remain. Inspect the winning rules in developer tools at desktop and phone widths.

Then remove the temporary class name and CSS rule. Confirm the visual page returns to normal and `git diff` no longer shows either source change.

### Exercise 14B: change design tokens safely

Change only `--color-accent` and `--color-accent-strong` to another readable pair, observe all consumers, then restore the original values. Verification:

```bash
npm --prefix frontend run lint
npm --prefix frontend run build
git diff -- frontend/src/index.css
```

Teach-back: explain why two token edits affect buttons, headings, range shading, chart line, focus states, and links.

---

## 15. Accessibility is part of implementation

Accessibility is not a later visual polish step. Examples already in the code:

| Need | Implementation |
|---|---|
| named sensor control | `<label htmlFor="sensor">` and `<select id="sensor">` |
| grouped range controls | `<fieldset>` and `<legend>` |
| selected toggle state | `aria-pressed` |
| named content regions | headings plus `aria-labelledby` |
| announced asynchronous progress | `role="status"` |
| announced errors | `role="alert"` |
| table context | hidden `<caption>` and column scopes |
| dates | `<time dateTime="...">` |
| keyboard focus | `:focus-visible` CSS |
| new-tab safety | `rel="noopener noreferrer"` |
| reduced movement preference | `prefers-reduced-motion` |

Prefer queries and tests by accessible role/name because they resemble how users and assistive technology find controls.

Accessibility limitation to understand: the Recharts visual itself cannot communicate every plotted point to a screen reader. The surrounding label, summary cards, and anomaly table supply meaningful alternatives, but a production analytics product could add a full data table or downloadable dataset.

### Section 15 understanding check

Navigate the page using Tab, Shift+Tab, arrow keys for the select, and Enter/Space for buttons. Explain which behavior comes from native HTML and which comes from React code.

<details>
<summary>Session 8 self-check answers — open after attempting</summary>

- Native labels, select, fieldset, buttons, table markup, and keyboard behavior provide semantics and basic interaction. React controls selected values and event callbacks.
- CSS supplies layout, focus-visible styling, and responsive changes; the media query at 720px stacks paired content for narrow screens.
- The chart is SVG-based, so its surrounding accessible label, summary cards, and anomaly table provide textual context and values.

</details>

> **Stop here for Session 8.** Do not continue until you can operate the controls by keyboard and explain the semantic element used for each.

---

## 16. Frontend testing

### 16.1 Tools

- **Vitest**: test runner, assertions, mocks;
- **jsdom**: simulated browser DOM in Node;
- **React Testing Library**: render and query UI by user-facing semantics;
- **user-event**: simulate realistic clicks, typing, selection, and keyboard use.

These tests do not start Spring Boot or a real browser. API functions are mocked for component tests.

### 16.2 Test structure

```ts
it('describes behavior', async () => {
  // Arrange
  // Act
  // Assert
});
```

The comments are conceptual; tests need not literally include them.

### 16.3 Read one real test line by line

The selector test begins with tools:

```ts
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it, vi } from 'vitest';
```

- `it` declares one behavior example;
- `expect` makes an assertion;
- `vi` creates mocks/spies;
- `render` mounts a React component into jsdom;
- `screen` queries the document the way a user or assistive tool finds it;
- `userEvent` performs browser-like interaction;
- `cleanup` removes the rendered DOM between tests;
- `afterEach(cleanup)` registers that cleanup after every test.

A simplified version of the real test is:

```tsx
it('passes the selected sensor ID to the change callback', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(
    <SensorSelector
      sensors={sensors}
      selectedId="reactor-temp"
      onChange={onChange}
    />,
  );

  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Choose a sensor:' }),
    'pump-pressure',
  );

  expect(onChange).toHaveBeenCalledWith('pump-pressure');
});
```

Read it as Arrange, Act, Assert:

1. Arrange a user and a recording callback.
2. Arrange the component with controlled props.
3. Act by selecting an option through the accessible combobox.
4. Assert that the component reported the domain ID to its parent.

The test does not assert internal state or private functions. It verifies the public component contract.

### 16.4 Mock functions, modules, and asynchronous results

`vi.fn()` records calls. It can also return controlled values:

```ts
const callback = vi.fn();
expect(callback).not.toHaveBeenCalled();
```

`vi.mock('./api', ...)` replaces the API module for the test file. Vitest processes module mocks before imports are used. `vi.mocked(getTrend)` gives a mock-aware typed view of the imported function.

Common configurations in this project:

```ts
vi.mocked(getSensors).mockResolvedValue(sensors);
vi.mocked(getExplanation).mockRejectedValue(new Error('Request failed'));
```

- `mockResolvedValue` makes an async function return a fulfilled Promise;
- `mockRejectedValue` makes it return a rejected Promise;
- `mockImplementation` supplies behavior that depends on arguments;
- `vi.resetAllMocks()` clears call history and configured behavior between tests.

The App loading test returns a Promise that never resolves for the second sensor. That is intentional test control, not production code: it freezes the UI in loading so the assertion can inspect it.

`api.test.ts` uses `vi.stubGlobal('fetch', fetchMock)` because `fetch` is a browser global rather than an imported project function. `vi.unstubAllGlobals()` restores it afterward.

### 16.5 Component tests in this repository

`SensorSelector.test.tsx` verifies:

- selecting Pump calls the callback with `pump-pressure`;
- Tab can focus the combobox.

`TimeRangeSelector.test.tsx` verifies visible choices, pressed state, and the 6-hour callback.

`AnomalyList.test.tsx` verifies only backend-flagged rows appear, semantics are present, timestamps/units/range are correct, and an empty state replaces the table.

`AiExplanation.test.tsx` verifies:

- no request before click;
- correct request after click;
- mock/live provenance labels;
- model markup is rendered as safe text;
- keyboard activation;
- visible pending/disabled state;
- visible error state.

### 16.6 App integration-style tests

`App.test.tsx` mocks the API module but renders the real component tree. It verifies:

- portfolio links and safe new-tab attributes;
- old trend content disappears when sensor selection changes;
- 24H is the default;
- choosing 6H reloads and updates summary/chart caption;
- a no-readings response shows the empty message.

The pending Promise in the sensor-change test is intentional: it freezes the new request so the test can inspect the loading state.

### 16.7 API unit tests

`api.test.ts` replaces global `fetch` with a mock. It verifies the hours query and proves a response with a different `hours` value is rejected.

`vi.unstubAllGlobals()` prevents the fake `fetch` from leaking into another test.

### 16.8 Good queries

Prefer:

```ts
screen.getByRole('button', { name: '6H' })
screen.getByRole('combobox', { name: 'Choose a sensor:' })
screen.findByRole('heading', { name: 'Summary' })
```

over brittle implementation queries such as CSS class names. Classes can change without changing user behavior.

### 16.9 Synchronous and asynchronous queries

- `getBy...`: must exist now or throw;
- `queryBy...`: return null when absence is expected;
- `findBy...`: wait for asynchronous appearance.

`userEvent` operations are awaited because they can trigger asynchronous browser-like event sequences.

### 16.10 Mocking boundary

Mock at a system boundary appropriate to the test:

- component behavior: mock `getSensors`, `getTrend`, or `getExplanation`;
- API wrapper: mock global `fetch`;
- full end-to-end acceptance: run the real browser/API/database or public smoke test.

If every internal function is mocked, a test can pass while the real feature is disconnected.

### 16.11 Lab: add a summary behavior test

This is a guided test-only exercise. You will create one file; no production component changes are needed.

1. Create `frontend/src/components/SummaryCards.test.tsx`.
2. Paste this starter. It includes the required imports, cleanup, and every field in the `Summary` type:

```tsx
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import type { Summary } from '../types';
import { SummaryCards } from './SummaryCards';

const summary: Summary = {
    count: 2,
    min: 69,
    max: 88,
    avg: null,
    anomalyCount: 1,
    firstTimestamp: null,
    lastTimestamp: null,
};

afterEach(cleanup);

it('shows no average data and marks a nonzero anomaly count', () => {
    render(<SummaryCards summary={summary} unit="°C" />);

    expect(screen.getByRole('heading', { name: 'Summary' })).toBeTruthy();

    // Add the three assertions from the steps below.
});
```

3. First assert the visible empty value:

   ```tsx
   expect(screen.getByText('No data')).toBeTruthy();
   ```

   `SummaryCards` renders this text when `avg` is `null`.
4. Find the Anomalies article, then check its value and alert modifier:

   ```tsx
   const anomalyArticle = screen.getByText('Anomalies').closest('article');
   expect(anomalyArticle?.querySelector('.metric-value')?.textContent).toBe('1');
   expect(anomalyArticle?.classList.contains('metric-card--alert')).toBe(true);
   ```

   The label locates the correct card; its parent `<article>` is the element that receives `metric-card--alert` when the count is greater than zero.
5. Run the focused test, then the full frontend test suite:

```bash
npm --prefix frontend test -- SummaryCards
npm --prefix frontend test
```

The test should pass without production code changes. If it fails, compare the test file with `SummaryCards.tsx` and the `Summary` type before changing the component.

<details>
<summary>Session 9 self-check answers — open after attempting</summary>

- Create exactly `frontend/src/components/SummaryCards.test.tsx`. The starter imports `render`, `screen`, cleanup, Vitest assertions, the `Summary` type, and the component.
- A complete `Summary` has `count`, `min`, `max`, `avg`, `anomalyCount`, `firstTimestamp`, and `lastTimestamp`; nullable statistics/timestamps may be `null`.
- `avg: null` renders `No data`. The `Anomalies` label locates its article; count `1` appears in `.metric-value`, and the article gets `metric-card--alert`.
- The test uses jsdom and the real component, but does not test the backend or database.

</details>

> **Stop here for Session 9.** Do not continue until the focused test and full frontend test suite pass, and you can explain what each proves.

---

## 17. Backend knowledge needed by a frontend developer

The frontend developer does not need to reimplement Java, but must understand the contract and failure points.

### 17.1 Layer flow

```text
SensorController
  maps HTTP paths/parameters
        -> SensorService
           validates range and coordinates behavior
                -> SensorRepository
                   executes parameterized SQL
                -> TrendCalculator
                   calculates anomaly flags and summary
  returns records serialized as JSON
```

### 17.2 Routes and statuses

| Method/path | Behavior |
|---|---|
| `GET /api/health` | `{ "status": "ok" }`; does not prove a DB query |
| `GET /api/sensors` | ordered sensor catalog |
| `GET /api/sensors/{id}/trend?hours=1|6|24` | validated window response |
| `POST /api/sensors/{id}/explanation?hours=1|6|24` | mock/live explanation |
| unknown sensor | HTTP 404 |
| unsupported hours | HTTP 400 before repository access |
| live Gemini request/output failure | HTTP 502 with safe server-side logging |
| live mode missing key/model at startup | application startup fails rather than pretending mock/live success |

### 17.3 Time-window behavior

The sample timestamps are historical. The service anchors a requested window to that sensor's **latest stored timestamp**, not the current wall clock. It subtracts the requested hours and queries both endpoints inclusively.

At 30-minute spacing this returns:

- 1H: 3 points (start, half-hour, end);
- 6H: 13 points;
- 24H: all 48 available points, because the dataset itself spans 23.5 hours.

This is why “hours × 2” is not the count for an inclusive window.

### 17.4 Parameterized SQL

The repository uses named parameters:

```java
WHERE sensor_id = :sensorId
```

followed by `.param("sensorId", sensorId)`. It does not concatenate untrusted ids into SQL, which protects against SQL injection and handles values correctly.

### 17.5 Explanation provider boundary

`ExplanationProvider` is an interface. Spring selects:

- `MockExplanationProvider` when `llm.mode=mock` or is absent;
- `GeminiExplanationProvider` when `llm.mode=live`.

The explanation service first obtains the same selected trend, then creates a grounded prompt. The model does not calculate the summary or anomaly rule. Live mode requires server-only `GOOGLE_API_KEY` and `GEMINI_MODEL` values and uses a 30-second client timeout.

The prompt explicitly limits invention, predictions, diagnoses, maintenance advice, and live claims. A model response is still untrusted text, which is why the frontend validates shape and renders plain text.

---

## 18. PostgreSQL schema and deterministic data

### 18.1 `sensors`

- `id TEXT PRIMARY KEY`: stable frontend/API identity;
- name and unit are required;
- normal min/max are double precision and required;
- check constraint requires min below max.

### 18.2 `readings`

- `sensor_id` references `sensors(id)`;
- `observed_at TIMESTAMPTZ` keeps an absolute timestamp;
- `value` is required;
- composite primary key `(sensor_id, observed_at)` means one reading per sensor at a timestamp, while two different sensors may share a timestamp.

### 18.3 Seed generation

`generate_series(0, 47)` creates 48 indexes. Each timestamp is midnight UTC plus 30 minutes times the index.

Reactor normal values repeat 68–72 °C, with 86 at index 12 (06:00) and 88 at index 36 (18:00). Pump normal values repeat 3.3–3.7 bar, with 5.8 and 5.9 at the same indexes.

`ON CONFLICT ... DO NOTHING` makes seed execution repeatable. Re-running does not add duplicates.

### 18.4 First initialization versus startup

Development setup runs the SQL explicitly through `psql`. Production mounts the files as `01-schema.sql` and `02-seed.sql` in `/docker-entrypoint-initdb.d`. The official PostgreSQL entrypoint executes those only when it initializes an empty data directory. It does not rerun them on every container restart when the named volume already contains a database.

Never use `docker compose down -v` as an ordinary restart or deployment command; `-v` removes named data volumes.

---

## 19. Running the application locally

### 19.1 Prerequisites

The repository expects Docker Compose, Java 25, and Node.js 24 for the documented/CI environment. Verify actual tools:

```bash
docker compose version
java -version
node --version
npm --version
```

If all four commands work, record their actual versions and continue. If one is missing:

1. Stop; do not paste an installation command intended for a different operating system.
2. Identify whether the terminal is Linux, macOS, Windows PowerShell, or WSL. Tools installed in Windows are not automatically installed inside WSL.
3. Use the current official installation documentation for that actual environment:
   - Node.js: https://nodejs.org/en/download
   - Java/Temurin: https://adoptium.net/temurin/releases/
   - Docker: https://docs.docker.com/get-docker/
4. Install Node itself; npm is distributed with normal Node installations.
5. Open a new terminal and rerun all four version commands.
6. If `npm ci` later reports an engine mismatch, read the exact required Node range from the output and lockfile rather than downgrading packages randomly.

The older beginner guide's preflight section contains additional environment checks. A future tutor must verify current official instructions before advising system-level installation; this tutorial intentionally does not freeze OS-specific package-manager commands that can become unsafe or obsolete.

### 19.2 First-time database setup

From the repository root:

```bash
docker compose up -d db
docker compose exec db pg_isready -U app -d industrial_trends
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/schema.sql
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d industrial_trends < db/seed.sql
```

`-T` disables a pseudo-terminal so shell input redirection can feed the SQL file. `ON_ERROR_STOP=1` makes `psql` stop on SQL errors.

### 19.3 Backend terminal

```bash
cd backend
./mvnw spring-boot:run
```

The Maven Wrapper uses the project's Maven setup. Leave the process running.

### 19.4 Frontend terminal

From a second terminal at the repository root:

```bash
npm --prefix frontend ci
npm --prefix frontend run dev
```

Open the URL Vite actually prints. Do not assume 5173 if that port was occupied.

### 19.5 Quick API observations

```bash
curl -i http://localhost:8080/api/health
curl -s http://localhost:8080/api/sensors
curl -s 'http://localhost:8080/api/sensors/reactor-temp/trend?hours=6'
curl -i 'http://localhost:8080/api/sensors/reactor-temp/trend?hours=2'
```

Quote URLs containing `?` or `&` so the shell does not interpret them. Type plain URLs in commands; Markdown link syntax such as `[text](url)` is not shell syntax.

### 19.6 Stop without deleting data

- stop Vite and Spring foreground processes with Ctrl+C in their terminals;
- stop the development database with `docker compose stop db` when desired;
- `docker compose up -d db` starts it again with the same named volume.

---

## 20. Debugging method: locate the broken layer

### 20.1 Browser tools

Open developer tools:

- **Elements**: actual DOM and applied CSS;
- **Console**: JavaScript errors and logs;
- **Network**: URL, method, status, timing, request, response;
- **Application/Storage**: browser-managed storage and cache when relevant.

For “Unable to load trend,” inspect Network before changing React:

1. Was a request sent?
2. Is its URL and method correct?
3. What status returned?
4. Is the body JSON or unexpected HTML?
5. Does the JSON match the runtime contract?

### 20.2 Failure isolation table

| Symptom | First check | Likely layer |
|---|---|---|
| no Vite URL | frontend terminal output | Node/Vite startup |
| blank page | browser Console | import/JS/render failure |
| page styled incorrectly | Elements computed styles | CSS selector/layout |
| request stays pending | Network timing, backend logs | backend/DB/provider |
| `/api` returns proxy error | Spring process on 8080 | Vite-to-backend boundary |
| backend connection refused | `docker compose ps`, `pg_isready` | database runtime |
| HTTP 404 sensor | requested id and DB rows | API/domain input |
| HTTP 400 range | query and allowed union | validation |
| HTTP 200 but frontend error | response body and runtime guard | contract mismatch |
| chart area empty with data | wrapper dimensions in Elements | CSS/chart sizing |
| older selection appears | effect cleanup/request ordering | async race |
| explanation 502 | sanitized backend log | external provider |

### 20.3 Common beginner mistakes

- running npm from the wrong directory;
- copying Markdown links into the shell;
- assuming a `Promise` is the response data;
- forgetting `await response.json()`;
- assuming fetch rejects on HTTP 500;
- storing derived data in separate state;
- invoking an event handler during render;
- mutating arrays or objects in state;
- forgetting stable keys in a mapped list;
- putting a Hook inside a condition;
- using `class` rather than `className`;
- expecting TypeScript types to validate network data at runtime;
- putting a backend secret in a `VITE_` variable;
- debugging CORS when the actual development proxy/backend is down.

### Section 20 understanding check

Have the tutor choose one non-destructive failure simulation, such as stopping Spring Boot or temporarily returning a mismatched mocked `hours` in a test. Diagnose it through evidence, then restore and rerun checks.

---

## 21. Quality checks and definition of done

Run from the repository root:

```bash
cd backend && ./mvnw --batch-mode test
cd ..
npm --prefix frontend run lint
npm --prefix frontend test
npm --prefix frontend run build
```

At this reviewed snapshot, source contains 13 JUnit test methods and 15 Vitest `it(...)` cases. Counts can change; the command result is authoritative.

Verified on 2026-10-19:

- backend: 13 tests passed, 0 failures, 0 errors;
- frontend: 6 test files and 15 tests passed;
- frontend ESLint: passed;
- TypeScript/Vite production build: passed, transforming 597 modules;
- Vite reported one non-blocking warning because the minified JavaScript chunk was larger than 500 kB.

What each check proves:

- backend tests: current Java unit/controller/context behaviors;
- lint: configured static rules;
- frontend tests: selected behaviors in jsdom;
- TypeScript/Vite build: types check and deployable assets are emitted.

What they do **not** prove alone:

- a real PostgreSQL instance contains the expected data;
- browser layout looks correct at every width;
- Caddy routing works;
- the public TLS certificate works;
- a real Gemini call works;
- every accessibility need is satisfied;
- production data persists after maintenance.

The known Vite bundle-size advisory is a warning, not a failed build. Recharts contributes substantial code. Do not add code splitting merely to silence a threshold unless measurement shows a user problem and the added complexity is justified.

### Git completion loop

```bash
git status --short
git diff --check
git diff
```

`git diff` and `git diff --check` show tracked working-tree changes; they do **not** display the contents of a brand-new untracked file. `git status --short` identifies such files with `??`.

Review a particular new file without staging it:

```bash
git diff --no-index -- /dev/null path/to/new-file
```

That command normally exits with status 1 because it found a difference; in this use, the displayed diff is the expected result rather than a test failure. Supply the exact known file path—do not use a broad glob.

After intentionally staging files, use:

```bash
git diff --cached
git diff --cached --check
```

to review what the commit would contain. Review every changed and new line. Stage only intended files, commit a description of behavior, and verify `git status --short` is empty afterward. Never assume an untracked exercise file is included because ordinary `git diff` looked clean.

---

## 22. Production frontend and containers

### 22.1 Why `vite dev` is not production hosting

The development server optimizes developer feedback and source transformation. A production build produces static, optimized HTML/CSS/JS. A real web server should serve those assets and route API traffic.

### 22.2 Frontend multi-stage Dockerfile

Build stage:

1. start from Node 24 Alpine;
2. set `/app` as the working directory;
3. copy manifest and lockfile first;
4. run `npm ci`;
5. copy source;
6. run the production build.

Runtime stage:

1. start from Caddy 2 Alpine;
2. copy the Caddy configuration;
3. copy only built `dist` assets from the build stage into `/srv`;
4. expose HTTP/HTTPS ports.

Node and the source tree are not needed in the final frontend runtime image.

### 22.3 Caddy routing

```caddyfile
handle /api/* {
    reverse_proxy backend:8080
}

handle {
    root * /srv
    try_files {path} /index.html
    file_server
}
```

API routing comes first, so an API failure is not replaced by the React HTML file. `try_files` provides single-page-app fallback for client routes. `encode zstd gzip` compresses responses when supported. The persisted Caddy volumes retain certificate/config state.

### 22.4 Backend Dockerfile

The build stage uses a Java 25 JDK, caches dependencies after copying Maven metadata, copies source, and packages the JAR while skipping tests because CI runs tests separately. The runtime uses a smaller Java 25 JRE, creates a non-login system user, copies the JAR with correct ownership, switches away from root, and runs `java -jar app.jar`.

### 22.5 Compose responsibilities

Development `compose.yaml` runs only PostgreSQL and binds it to loopback host port 55432.

Production `compose.prod.yaml` runs:

- `db`: PostgreSQL 17, initialization mounts, health check, persistent volume;
- `backend`: immutable GHCR SHA image, private DB URL, memory/JVM settings;
- `web`: immutable GHCR SHA image, Caddy ports 80/443, Caddy volumes.

Only `web` publishes production host ports. Backend and database use Compose service names on the private network.

`compose.local.yaml` overrides production images with locally built tags, uses mock mode, disables automatic restarts, changes the site address to HTTP `:80`, and binds Caddy only to `127.0.0.1:18080`.

### 22.6 Secrets and configuration

Production requires:

- full commit SHA `APP_VERSION`;
- private random `DB_PASSWORD`;
- hostname-only `SITE_DOMAIN`;
- `LLM_MODE`, kept `mock` for the public portfolio.

`.env.production.example` contains names, not values. The real `.env.production` must remain ignored and private. The frontend bundle is public: anything compiled into it can be downloaded by visitors. Therefore database credentials and model API keys belong only in server/container environment.

---

## 23. CI, image publication, deployment, and smoke tests

### 23.1 CI pipeline

On pushes and pull requests, GitHub Actions runs two independent jobs:

**Backend:** checkout, Temurin Java 25 with Maven cache, Maven tests.
**Frontend:** checkout, Node 24 with npm cache, `npm ci`, lint, tests, production build.

On a push to `master`, and only after both succeed, a third job logs in to GHCR with the workflow token and builds/pushes Linux amd64 backend and frontend images tagged with the full Git commit SHA.

This is continuous integration plus artifact publication. Deployment remains a deliberate manual action.

### 23.2 Why SHA tags matter

A full commit SHA identifies the exact source revision used to build both images. A mutable `latest` tag cannot answer “which code is running?” reliably.

### 23.3 Deployment script behavior

`scripts/deploy.sh` requires exactly one lowercase 40-character SHA. Before changing containers it validates:

- argument format;
- required Compose and private environment files;
- file ownership/type/permissions assumptions;
- `.env.production` is ignored and untracked;
- exactly one `APP_VERSION` line;
- required commands and non-interactive Docker Compose access;
- resolved Compose configuration.

It prepares a mode-600 temporary environment copy, pulls matching backend/web images, starts without building, checks all three services and PostgreSQL readiness, and only then atomically records the deployed SHA in `.env.production`.

It does not delete volumes. Rollback calls the same script with the previously recorded known-good SHA. An application image rollback does not reverse database schema/data changes.

### 23.4 Public smoke test

`scripts/production-smoke-test.mjs` uses Node's built-in `fetch` and accepts only a clean HTTPS origin. It checks:

- trusted HTTPS and successful homepage;
- HTML content type, React root, and built asset references;
- same-origin nonempty JS/CSS assets;
- both exact expected sensors;
- 1H, 6H, and 24H trends for each sensor;
- response shape and summary count agreement;
- seeded 24H anomaly values;
- HTTP 400 for unsupported `hours=2`.

It marks browser responsiveness, explanation label, refresh/controls, persistence across restart, and secret review as `NOT TESTED` because those require deliberate manual checks or could invoke an external provider. `NOT TESTED` is not a pass.

Read the exact operational procedures in:

- `docs/deployment-runbook.md`;
- `docs/production-smoke-checklist.md`;
- `docs/Industrial_Trend_Explorer_Low_Traffic_Deployment_Codex_Guide_v1.md`.

Do not improvise cloud changes from this frontend tutorial.

---

## 24. Security and trust boundaries

### 24.1 Browser input and server input

TypeScript helps developers but cannot make the network trustworthy. The backend validates hours and uses parameterized SQL. The frontend validates returned JSON before rendering it.

### 24.2 Secret rule

Never place `DB_PASSWORD`, `GOOGLE_API_KEY`, registry tokens, or private environment contents in:

- React source;
- `VITE_` variables;
- public HTML or bundled JavaScript;
- Git history;
- screenshots, logs, tests, or chat.

Vite-exposed environment variables are browser-visible by design.

### 24.3 Rendering untrusted text

React escapes interpolated strings. Keep provider output as text. Introducing raw HTML rendering would create an XSS risk unless a rigorously designed sanitization boundary were added.

### 24.4 Links opened in a new tab

`target="_blank"` is paired with `rel="noopener noreferrer"` so the opened site cannot use `window.opener` to control the source tab and referrer data is limited.

### 24.5 Network exposure

Production exposes only Caddy on 80/443. PostgreSQL and Spring Boot have no production host `ports` mapping. Same-origin browser API calls avoid a broad CORS configuration.

### 24.6 Honest AI/data labels

The public site must not imply mock text is a live model response or synthetic readings are live sensors. Truthful provenance is a product and security quality, not merely marketing language.

---

## 25. Guided learning exercises in increasing difficulty

Complete these in a separate branch. Each exercise has a precise acceptance condition; do not make unrelated changes.

### Exercise A: trace without editing

Trace the initial page load using source files and the browser Network panel. Produce a sequence containing the exact component/function, request, backend method, SQL method, response guard, state setter, and visible component.

**Pass:** every step exists in the current repository and the learner can point to it.

### Exercise B: write a pure formatter

Extract `formatUtcTimestamp` into a small `formatters.ts` module used by both `AnomalyList` and `TrendChart`. Add focused tests for a valid current API timestamp.

**Skills:** named exports, imports, pure functions, reuse, tests.
**Pass:** no output changes; lint, tests, and build pass.

### Exercise C: add a “Latest” summary card

Use `summary.lastTimestamp` to display the latest UTC timestamp or `No data`. Do not calculate it from the readings in React because the summary contract already provides it.

**Skills:** nullable types, props, formatting, UI tests, responsive grid.
**Pass:** value matches selected window response and empty data is handled.

### Exercise D: add a retry for trend failures

Design a retry control without a page reload. Add a numeric `retryVersion` state in `App`, include it in the trend effect dependency list, and increment it on Retry. Preserve loading reset, abort cleanup, and accessible button naming.

**Skills:** state machine evolution, effects, accessibility, error recovery.
**Pass:** a test mocks first rejection and second success; old data never appears during retry.

### Exercise E: add a 12H time range end to end

This is intentionally full stack. Update the frontend union/button/guards/tests, backend validation/tests, and API behavior. Do not change only the UI.

At 30-minute intervals with inclusive endpoints, the seeded response should contain 25 readings when the full window is present.

**Skills:** cross-layer contracts and regression testing.
**Pass:** 12H works through UI, API, Java query, summary, explanation range, and tests; unsupported ranges still return 400.

### Exercise F: improve chart tick density

Replace the fixed X-axis interval with a small pure function based on reading count so 1H, 6H, and 24H display reasonable tick counts. Unit-test the function rather than taking screenshots as the only evidence.

**Skills:** derived presentation logic and testable chart decisions.
**Pass:** no dense/empty axis at supported windows and existing chart behavior remains.

### Exercise G: error-detail policy

Review whether exposing raw backend status messages in UI is appropriate. Define a user-facing message and a developer-diagnostic approach, then implement it without exposing secrets or provider internals.

**Skills:** UX, observability, trust boundaries.
**Pass:** users get an actionable stable message; developers retain safe evidence in the proper environment.

---

## 26. A repeatable feature-development method

For any new frontend feature, use this sequence:

1. **Define behavior:** What can the user observe? What are loading, empty, error, and success cases?
2. **Locate ownership:** Is the fact owned by database, Java business logic, API wrapper, page state, or a presentational component?
3. **Define the contract:** Types, HTTP fields, allowed values, null behavior, statuses.
4. **Design state minimally:** Store only independent memory; derive everything else.
5. **Design accessibility:** semantic element, label/name, keyboard use, status announcement.
6. **Write the smallest behavior test:** query like a user, mock only the external boundary.
7. **Implement:** pure functions/components first; effects only for external synchronization.
8. **Inspect manually:** desktop, narrow viewport, keyboard, Network, Console.
9. **Run checks:** narrow test, all tests, lint, build; backend tests for contract changes.
10. **Review diff:** no secrets, generated files, unrelated formatting, or stale code.
11. **Explain it:** data path, state transitions, failures, and tradeoffs.

This method is more transferable than memorizing React APIs.

---

## 27. Interview-ready explanation

### 27.1 Two-minute technical story

> Industrial Trend Explorer is a React and TypeScript single-page dashboard backed by Spring Boot and PostgreSQL. The browser first fetches a sensor catalog, then requests a selected 1-, 6-, or 24-hour trend through relative `/api` URLs. In development Vite proxies those calls; in production Caddy serves compiled assets and reverse-proxies the same paths. The backend anchors the window to each sensor's latest reading, uses parameterized JDBC queries, calculates summaries and anomalies in Java, and returns JSON. The frontend validates that JSON at runtime, models loading, empty, error, and success states, cancels stale trend requests, and composes accessible summary, chart, anomaly, and on-demand explanation components. Vitest and Testing Library cover user behaviors, while CI runs backend tests plus frontend lint, tests, and production build before publishing SHA-tagged containers.

### 27.2 Honest scope

You may say the project demonstrates:

- React/TypeScript component and state fundamentals;
- async API integration and runtime validation;
- responsive/accessibility practices;
- Spring/JDBC/PostgreSQL integration;
- frontend/backend tests;
- Docker/Caddy/CI and a manual versioned deployment workflow.

Do not call it:

- live industrial/IoT monitoring;
- AI-based anomaly detection;
- a high-availability or large-scale platform;
- fully automated continuous deployment;
- a system with real user authentication or streamed ingestion.

### 27.3 Questions you must be able to answer

1. Why do you need both compile-time TypeScript types and runtime response guards?
2. Why is selected sensor state in `App`, not `SensorSelector`?
3. What race condition does `AbortController` prevent?
4. Why are anomalies calculated in Java?
5. Why does `fetch` need `response.ok` checking?
6. Why does explanation happen on click rather than in an effect?
7. How does the page work with one URL in production without CORS?
8. What does the Caddy SPA fallback do, and why must API handling come first?
9. What do frontend tests prove, and what requires an end-to-end check?
10. Why are production images tagged with a Git SHA?

---

## 28. Glossary

| Term | Meaning here |
|---|---|
| API | HTTP contract exposed by Spring Boot |
| async | work whose result arrives later without blocking the browser |
| bundle | browser JavaScript assembled by Vite from modules |
| callback | function passed for another component/system to call later |
| component | React function that returns UI description |
| controlled input | input whose current value comes from React state |
| CSS cascade | rules that determine which style declaration wins |
| dependency array | values telling an effect when synchronization must rerun |
| derived data | value calculated from current props/state rather than stored |
| DOM | browser's in-memory document tree |
| effect | React synchronization with an external system after render |
| event | user/browser occurrence such as click or selection change |
| HMR | development module update without a full page refresh |
| hook | React function such as `useState` or `useEffect` |
| hydration | attaching React to server-rendered markup; not used by this Vite SPA |
| JSX | syntax for describing element trees inside JavaScript/TypeScript |
| lint | static pattern/style/quality checking |
| module | file with imports/exports and its own scope |
| npm | package manager and script runner used by the frontend |
| Node.js | JavaScript runtime used for tooling and scripts |
| prop | read-only input passed from a parent component |
| proxy | server forwarding a request to another server |
| render | React calls components to calculate desired UI |
| responsive design | layout adapting to available viewport size |
| runtime guard | code that inspects an actual value and verifies its shape |
| semantic HTML | elements chosen for meaning, not merely appearance |
| SPA | single-page application whose UI is updated client-side |
| state | component memory that can trigger rerender when updated |
| type narrowing | proving a value has a more specific TypeScript type |
| Vite | frontend development server and production build tool |
| Vitest | test runner integrated with the Vite ecosystem |

---

## 29. Final mastery assessment

The learner completes this curriculum only after all four parts pass.

### Part 1: explain

Without notes, draw and explain:

- local development architecture;
- initial and sensor-change data flows;
- React state and effect lifecycle;
- production request routing;
- build/test/release pipeline.

### Part 2: diagnose

Diagnose one tutor-created safe failure using terminal and browser evidence. State the broken layer before editing.

### Part 3: implement

Complete one exercise from B–F on a branch with appropriate tests and no unrelated changes.

### Part 4: verify

Run and interpret:

```bash
cd backend && ./mvnw --batch-mode test
cd ..
npm --prefix frontend run lint
npm --prefix frontend test
npm --prefix frontend run build
git diff --check
git status --short
```

The learner must explain what each command proves and what it does not prove.

---

## 30. Frontend skills beyond this project

Completing this curriculum means the learner understands this application and its transferable foundations. It does not make every frontend subject complete. Learn the following only after the mastery assessment, choosing them because a new project needs them rather than adding them to this showcase without purpose.

| Next subject | Why it is not taught deeply here | Suitable next practice |
|---|---|---|
| Client-side routing | this dashboard has one page | create two routes with navigation and a not-found view |
| Forms and validation | controls select existing values; there is no data-entry form | build a typed form with labels, validation, submission, and server errors |
| Authentication/authorization | the public demo has no accounts | learn sessions/tokens and protected UI with a purpose-built backend |
| Server-state caching | this app has tiny on-demand fetches | compare manual effects with a server-state library in a separate app |
| Error boundaries | expected request failures are represented as state | create a component-render failure and a recovery boundary |
| Real-browser E2E tests | current UI tests run in jsdom | automate the real page with Playwright or an equivalent browser runner |
| Performance profiling | the only current signal is a bundle advisory | use browser performance tools and React Profiler before optimizing |
| Code splitting | the single dashboard is small in scope | split a genuinely separate route or heavy feature and measure impact |
| Internationalization/time zones | the demo intentionally displays UTC English text | format locale, unit, plural, and time-zone variations |
| Design systems | this app needs only a small CSS token system | extract documented reusable components in a multi-page application |
| Advanced state management | App/local state is sufficient here | compare reducer, context, and external stores when shared state justifies them |
| SSR/framework React | this Vite application is client-rendered | build a separate SEO/content-oriented app with a React framework |
| Streaming/WebSockets | sample readings are static | design reconnect, ordering, backpressure, and retention for simulated live data |
| Browser security policy | no authentication or user HTML exists | study CSP, CSRF, cookies, dependency risk, and threat modeling |
| Cross-browser/device testing | only selected viewport checks are recorded | create a supported-browser matrix and automate representative checks |

Do not expand Industrial Trend Explorer merely to collect technologies. A small explainable application is stronger than unrelated features added without a user need.

---

## 31. Source-of-truth rule

This tutorial describes the repository snapshot reviewed on 2026-10-19. Source code evolves. Before teaching a future session, compare this file with:

- `frontend/package.json` and lockfile;
- `frontend/src/types.ts`, `api.ts`, `App.tsx`, components, CSS, and tests;
- backend controller/service/repository/records/tests;
- database SQL;
- Compose, Dockerfiles, Caddyfile, CI, deploy, and smoke-test scripts.

When documentation and executable code disagree, do not silently choose one. Identify the mismatch, verify intended behavior with tests and the learner, then update the stale artifact deliberately.

The central principle is:

> A frontend is not “the colorful part.” It is a stateful program running in an untrusted, asynchronous browser environment. Good frontend development combines language fundamentals, explicit data ownership, user-visible state, accessible HTML, careful network boundaries, tests, and a reproducible delivery workflow.

---

## 32. File-by-file responsibility index

Use this index to make sure a review does not skip a maintained part of the finished project. Generated contents under node_modules, dist, and target are intentionally excluded.

### 32.1 Root, automation, database, and operations

| Path | Responsibility |
|---|---|
| README.md | public portfolio overview, screenshot, architecture, local setup, truthful scope |
| .gitignore | dependency, build, private environment, editor, and log exclusions |
| .env.example | optional backend environment names without values |
| .env.production.example | production environment template without secrets |
| .github/workflows/ci.yml | Java/frontend checks and master-only SHA image publication |
| compose.yaml | loopback-only development PostgreSQL and named data volume |
| compose.prod.yaml | private database/backend plus public Caddy production stack |
| compose.local.yaml | local HTTP overrides for production-shaped testing |
| db/schema.sql | tables, foreign key, range constraint, sensor-time primary key |
| db/seed.sql | two sensors, deterministic readings/anomalies, repeatable inserts |
| scripts/deploy.sh | validated explicit-SHA deploy/rollback without volume deletion |
| scripts/production-smoke-test.mjs | public HTTPS/assets/API/seed/negative checks |

### 32.2 Frontend configuration and application

| Path | Responsibility |
|---|---|
| frontend/package.json | direct packages and npm scripts |
| frontend/package-lock.json | exact resolved dependency graph and integrity data |
| frontend/index.html | metadata, favicon, React root, module entry |
| frontend/vite.config.ts | React plugin and development API proxy |
| frontend/tsconfig.json | root TypeScript project references |
| frontend/tsconfig.app.json | browser and JSX TypeScript rules |
| frontend/tsconfig.node.json | Node rules for the Vite configuration |
| frontend/eslint.config.js | JS, TypeScript, Hook, and refresh rules |
| frontend/public/favicon.svg | static browser icon |
| frontend/.gitignore | frontend-generated and editor exclusions |
| frontend/.dockerignore | frontend Docker context exclusions |
| frontend/Dockerfile | Node build and Caddy runtime stages |
| frontend/Caddyfile | compression, API proxy, SPA/static serving |
| frontend/src/main.tsx | CSS import, React root, Strict Mode, App render |
| frontend/src/types.ts | compile-time API and domain contracts |
| frontend/src/api.ts | fetch, HTTP checks, encoding, abort, runtime guards |
| frontend/src/App.tsx | page state, effects, state machine, composition |
| frontend/src/index.css | tokens, layout, components, responsiveness, accessibility |
| frontend/src/components/SensorSelector.tsx | controlled labeled sensor dropdown |
| frontend/src/components/TimeRangeSelector.tsx | pressed 1H, 6H, and 24H controls |
| frontend/src/components/SensorDetails.tsx | selected sensor metadata |
| frontend/src/components/SummaryCards.tsx | formatted summary metrics |
| frontend/src/components/TrendChart.tsx | Recharts plot, range, dots, tooltip |
| frontend/src/components/AnomalyList.tsx | flagged anomaly table and empty state |
| frontend/src/components/AiExplanation.tsx | click-only request and result states |

### 32.3 Frontend tests

| Path | Responsibility |
|---|---|
| frontend/src/api.test.ts | query construction and response-hours validation |
| frontend/src/App.test.tsx | links, loading reset, range/default, empty trend |
| frontend/src/components/SensorSelector.test.tsx | callback and keyboard focus |
| frontend/src/components/TimeRangeSelector.test.tsx | options, pressed state, callback |
| frontend/src/components/AnomalyList.test.tsx | rows, semantics, empty state |
| frontend/src/components/AiExplanation.test.tsx | click, safety, keyboard, pending, modes, failure |

### 32.4 Backend build and entry

| Path | Responsibility |
|---|---|
| backend/pom.xml | Spring Boot, Java 25, JDBC, web, tests, Gemini dependencies |
| backend/mvnw and wrapper files | reproducible Maven entry and wrapper configuration |
| backend/.gitattributes | repository text and line-ending attributes |
| backend/.gitignore | Maven and IDE exclusions |
| backend/.dockerignore | backend Docker context exclusions |
| backend/Dockerfile | JDK build and non-root JRE runtime |
| backend/src/main/resources/application.properties | datasource and LLM configuration |
| IndustrialTrendApiApplication.java | Spring Boot process entry |
| HealthController.java | lightweight API health route |

The final two Java paths above are under backend/src/main/java/com/flyinnegg/industrialtrend/.

### 32.5 Backend sensor package

All paths in this table are under backend/src/main/java/com/flyinnegg/industrialtrend/sensor/.

| Path | Responsibility |
|---|---|
| Sensor.java | sensor API record |
| StoredReading.java | package-private database reading |
| Reading.java | API reading with calculated anomaly flag |
| Summary.java | nullable statistics and time coverage |
| TrendResponse.java | sensor, readings, summary, selected hours |
| ExplanationResponse.java | sensor id, text, provider mode |
| SensorController.java | catalog, trend, explanation routes |
| SensorService.java | validation, lookup, window, response coordination |
| SensorRepository.java | parameterized SQL and result mapping |
| TrendCalculator.java | inclusive anomaly rule and summaries |
| ExplanationService.java | trend-to-prompt-to-provider coordination |
| ExplanationPrompt.java | grounded, bounded prompt |
| ExplanationProvider.java | provider abstraction |
| MockExplanationProvider.java | default deterministic labeled output |
| GeminiExplanationProvider.java | live client, timeout, safe errors, output extraction |

### 32.6 Backend tests

All paths in this table are under backend/src/test/java/com/flyinnegg/industrialtrend/.

| Path | Responsibility |
|---|---|
| IndustrialTrendApiApplicationTests.java | Spring context startup |
| sensor/TrendCalculatorTests.java | boundaries, deterministic and empty summaries |
| sensor/SensorServiceTests.java | window, empty rows, early range rejection |
| sensor/SensorControllerTests.java | default/selected range and HTTP 400 |
| sensor/ExplanationPromptTests.java | grounded range/anomaly/safety instructions |
| sensor/GeminiExplanationProviderTests.java | direct and typed-step text extraction |

### 32.7 Documentation and evidence

| Path | Responsibility |
|---|---|
| docs/deployment-runbook.md | release, rollback, database limitation |
| docs/production-smoke-checklist.md | automated results and manual checks |
| docs/Industrial_Trend_Explorer_Low_Traffic_Deployment_Codex_Guide_v1.md | deployment learning/scope/safety plan |
| docs/learning/Industrial_Trend_Explorer_Absolute_Beginner_Codex_Guide_v2.md | historical build curriculum |
| docs/learning/LEARNING_LOG.md | learner observations and verification history |
| docs/screenshots/dashboard-full-page.png | portfolio screenshot evidence |
| this file | finished-project frontend/full-stack curriculum and AI tutor contract |

---

## 33. Instructor-only checkpoint rubric

A future AI tutor should use this section **after** the learner attempts a checkpoint. Do not read it aloud as a script before the attempt. These are evidence criteria, not required exact wording.

### 33.1 Passing rules

A checkpoint passes only when the learner can:

1. explain the causal relationship, not merely repeat a definition;
2. point to the relevant current file or browser/terminal evidence;
3. distinguish compile-time, browser-runtime, server-runtime, and database behavior;
4. correct an intentionally changed example and restore the workspace;
5. say what the verification proves and what it does not prove.

If one part is missing, teach that part and ask a new question. Do not mark a guess correct because it contains familiar vocabulary.

### 33.2 Expected evidence by section

| Section | Minimum correct evidence |
|---|---|
| 2 | React code executes in the browser; Node runs development tools; Vite forwards HTTP but never queries PostgreSQL; Caddy serves compiled assets without the Vite development server |
| 3 | source files are maintained inputs; node_modules/dist/target are reproducible outputs; Git status is repository state; dependencies are not committed |
| 5 | Node is a JavaScript runtime, npm installs/runs packages/scripts, the manifest declares ranges, the lockfile records the resolved graph, and npm ci uses that graph |
| 6 | learner produces the exact console-lab outputs and explains map/filter/find/every, object access, destructuring, ternary, closure, and immutable copy behavior |
| 7 | TypeScript rejects the intentional string/number mismatch before runtime; types are erased; untrusted JSON still needs guards |
| 9 | props come from the parent, state belongs to the component, an event schedules state, rendering recalculates JSX, and React commits the DOM update |
| 11 | learner distinguishes a rejected network Promise, an HTTP non-2xx response, and a valid-JSON contract failure; learner names at least two invariants the current guards do not check |
| 12 | learner traces catalog loading → first selection → trend loading → success, then range-change clearing/loading → error, including visible UI at every state |
| 13 | learner correctly identifies owned state, received props, emitted callbacks, derived values, and why business anomaly rules remain in Java |
| 15 | native elements provide Tab/select/button behavior and semantics; React supplies controlled state and callbacks; CSS supplies visible focus; roles announce status/error |
| 20 | learner gathers evidence first, identifies one broken layer, predicts the repair, restores the fault, and reruns the narrow plus broad checks |

### 33.3 Expected locations for the Section 6 source search

Valid examples include:

- `map`: sensor options, time-range buttons, chart values, or prompt/test construction;
- `filter`: anomaly list or explanation anomaly selection;
- `find`: selected sensor in `App.tsx`;
- `every`: API runtime array guards;
- destructuring: component props;
- spread: test response variations or chart numeric arguments;
- ternary: status labels, CSS class selection, or empty/table branches;
- short-circuit `&&`: conditional JSX;
- template string: API URLs or error messages.

The learner should explain the actual chosen example rather than list these locations.

### 33.4 Section 11 failure answer key

1. **Backend unavailable:** browser `fetch` rejects; `getTrend` rejects; the effect's catch stores an error and sets status to error; the alert is rendered.
2. **HTTP 500:** `fetch` resolves to a `Response`, `response.ok` is false, `requireSuccessfulJson` throws before accepting the body, and App enters the same error state.
3. **HTTP 200 with hours 2:** JSON parsing succeeds, `isTrendResponse` rejects the unsupported/mismatched hours, `getTrend` throws `Invalid trend response`, and App displays the trend error.
4. **Wrong but structurally valid sensor ID:** the current guard can accept it; the render identity condition hides the panels. This is a documented validation limitation, not a successful user state.

### 33.5 Section 12 state-transition answer key

```text
initial render
  sensors=[], selectedSensorId='', sensorsLoaded=false, trend status=loading
  visible: Loading sensors

catalog resolves
  sensors set, first ID selected, sensorsLoaded=true
  visible inside sensor content: Loading trend

24H trend resolves with rows
  trend set, status=success
  visible: details, summary, chart, anomalies, explanation panel

learner chooses 6H
  handler sets status=loading, clears trend/error, changes hours
  old summary/chart disappear; Loading trend is visible
  cleanup aborts the previous trend request

6H request fails
  trendError set, status=error
  visible: trend error alert; stale trend remains absent
```

The learner must mention why clearing old trend prevents mismatched labels and values.

### 33.6 Lab cleanup rubric

Before completing any temporary exercise:

- intentional code produces the predicted visible or compiler/test result;
- the learner explains the result;
- the deliberate error is repaired;
- temporary learning imports/elements/files are removed unless explicitly retained;
- `git status --short` lists only intended work;
- tracked and untracked contents have been reviewed;
- the relevant narrow check passes;
- lint, tests, or build are run in proportion to the change.

### 33.7 Common misconceptions to correct

| Misconception | Required correction |
|---|---|
| React and Node are the same runtime | React application code runs in the browser; Node runs tooling here |
| TypeScript validates API JSON automatically | TypeScript types are erased; runtime guards inspect actual values |
| fetch rejects for every HTTP error | fetch normally resolves for 404/500; code must inspect response.ok |
| useEffect is for every calculation | derive pure values during render; effects synchronize external systems |
| setting state mutates the current variable immediately | it schedules a later render with new state |
| key is ordinary data passed to the child | React consumes key for identity; it is not a normal child prop |
| abort guarantees server work stopped | it cancels/abandons the client operation; remote work may continue |
| a passing unit test proves production works | it proves only the tested behavior in that test environment |
| git diff shows every new file | untracked files appear in git status and need separate review |
| responsive means a separate mobile site | one semantic UI adapts through flexible layout and media queries |

---

## 34. Primary learning references

When syntax, browser behavior, or tool versions may have changed, a future tutor should verify against current official documentation rather than guessing:

- MDN Learn Web Development: https://developer.mozilla.org/en-US/docs/Learn_web_development
- JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- React Learn: https://react.dev/learn
- React TypeScript: https://react.dev/learn/typescript
- Vite Guide: https://vite.dev/guide/
- Vitest Guide: https://vitest.dev/guide/
- Testing Library guiding principles: https://testing-library.com/docs/guiding-principles/
- Recharts documentation: https://recharts.github.io/
- WAI accessibility tutorials: https://www.w3.org/WAI/tutorials/

Use these to clarify a concept, not to replace observing and explaining the actual repository.
