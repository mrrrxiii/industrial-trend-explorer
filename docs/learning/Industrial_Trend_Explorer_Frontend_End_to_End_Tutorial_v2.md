# Industrial Trend Explorer
## Frontend Development from Zero: A Hands-on, End-to-End Tutorial

> **Version 2.0 | Reviewed against repository source: 2026-10-19**  
> **Audience:** Java/backend developer with **no assumed HTML, CSS, JavaScript, TypeScript, React, or Node.js experience**.  
> **Learning style:** explain → predict → type it yourself → run → test → teach back.  
> **Project:** [Industrial Trend Explorer](https://github.com/mrrrxiii/industrial-trend-explorer)  
> **Status:** This is a *learning guide*, not a claim that the new exercises are already implemented in the repository.

The application is already a working portfolio project. This guide teaches you to understand it, then extend it independently with one carefully scoped full-stack feature: a **threshold checker**. No new third-party frontend libraries, database tables, external APIs, or LLM charges are required.

**The main objective:** by the end of the core path, you can independently create a small typed React component, accept user input, send JSON to a Spring Boot endpoint, display the validated response, test it, and explain what happens in the browser and server.

> [!IMPORTANT]
> **Do not confuse completing the guide with mastering all frontend development.** The seven-day route is a focused foundation, not a guaranteed duration. It assumes your Java skills are already comfortable and you can spend focused time on exercises. If a checkpoint is not passed, repeat it rather than accelerating.

---

## Contents

- [1. How to use this tutorial](#1-how-to-use-this-tutorial)
- [2. Seven-day learning route](#2-seven-day-learning-route)
- [3. Understand the application first](#3-understand-the-application-first)
- [4. Safe setup and verification](#4-safe-setup-and-verification)
- [5. Day 1: browser and language foundations](#5-day-1-browser-and-language-foundations)
- [6. Day 2: JavaScript, TypeScript, and frontend tools](#6-day-2-javascript-typescript-and-frontend-tools)
- [7. Day 3: React components, props, state, and forms](#7-day-3-react-components-props-state-and-forms)
- [8. Day 4: HTTP requests and real project data flow](#8-day-4-http-requests-and-real-project-data-flow)
- [9. Day 5: build the threshold checker end to end](#9-day-5-build-the-threshold-checker-end-to-end)
- [10. Day 6: tests, errors, and accessibility](#10-day-6-tests-errors-and-accessibility)
- [11. Day 7: integration, production build, and independent assessment](#11-day-7-integration-production-build-and-independent-assessment)
- [12. Deeper optional modules](#12-deeper-optional-modules)
- [13. Codex teaching contract](#13-codex-teaching-contract)
- [14. Troubleshooting by layer](#14-troubleshooting-by-layer)
- [15. Glossary and reference map](#15-glossary-and-reference-map)
- [Appendix A: reference implementation](#appendix-a-reference-implementation-open-only-after-your-own-attempt)
- [Appendix B: assessment rubric](#appendix-b-assessment-rubric)

---

## 1. How to use this tutorial

### 1.1 The five-step learning loop

Every lab follows the same process:

1. **Understand:** read the minimum explanation and identify the concept in plain language.
2. **Predict:** write down what a snippet or interaction should do *before* running it.
3. **Build:** manually type or adapt one small piece of code. Do not ask Codex to generate the whole feature.
4. **Verify:** observe the browser, inspect Network or Console, and run the named check. Record the *actual* result.
5. **Teach back:** explain why it works, what can fail, and which part of the system owns it.

A successful build alone does **not** complete a lesson. You should also be able to reproduce the key idea without copying.

### 1.2 A concrete learning log

Create `docs/learning/FRONTEND_V2_LEARNING_LOG.md` on your learning branch. Add an entry after each lesson using this reusable form:

```md
### Lesson 04 — JavaScript arrays
- Prediction:
- Code I typed:
- Actual output:
- Why the output occurred:
- Verification command and result:
- One thing I still cannot explain:
```

The headings are a **template for your own observations**, not facts to prefill. Do not record a test as passed unless you ran it.

### 1.3 Labels used throughout

- **Read:** inspect the named existing file. No change needed.
- **Try:** code the exercise yourself before looking at hints.
- **Expected:** objective behavior you can verify.
- **Pass when:** an observable standard for moving on.
- **Optional:** useful depth, not a seven-day prerequisite.

The existing repository is the source of truth. If a later commit changes a function, package, file, or endpoint, inspect the current file before following this snapshot-specific instruction. Do not change production code simply to make the documentation look correct.

### 1.4 Scope boundaries

**In the core path:** HTML, CSS, JavaScript, TypeScript, Node/npm/Vite, React components and hooks, controlled forms, HTTP/JSON, Spring Boot POST endpoint, response guards, browser debugging, Vitest/Testing Library, accessibility, basic production build.

**Not required for the core path:** Redux, Next.js, state-management libraries, advanced CSS frameworks, authentication, WebSockets, Kubernetes operations, live LLM billing, large redesigns, or additional database tables.

> [!CAUTION]
> Never paste an API key, `.env` secret, database password, private token, or real industrial measurements into browser source, tests, chat, screenshots, or Git. The portfolio's seeded data are synthetic. The public demo's mock AI output must remain labeled as mock.

---

## 2. Seven-day learning route

Complete lessons sequentially. Each day's deliverable is something you can show or explain, not a page-count target.

| Day | Focus | Lessons | What you must demonstrate |
|:--:|---|---|---|
| **1** | Browser essentials | 01–03 | Explain HTML/CSS/JavaScript and modify a tiny page safely |
| **2** | JavaScript, TypeScript, tooling | 04–07 | Write array logic, type a sensor object, run npm scripts |
| **3** | React and forms | 08–10 | Create a typed component with two controlled inputs |
| **4** | API and async data | 11–12 | Trace GET and existing POST; handle HTTP/error/JSON |
| **5** | Independent feature | 13–15 | New Java JSON POST endpoint and React threshold checker |
| **6** | Quality | 16–17 | Test success/failure/invalid input and keyboard behavior |
| **7** | Integration and review | 18–19 | Run complete checks; explain and demo feature end to end |

**Core completion rule:** all checkpoints passed, the threshold checker handles expected and invalid inputs, no existing dashboard behavior breaks, and no private secrets enter the frontend.

**If time is short:** finish through Lesson 15 and run the checks in Lesson 18. Defer optional refactoring and deployment inspection, not input validation or error handling.

---

## 3. Understand the application first

### 3.1 What is already implemented

The existing application has:

- Two synthetic sensors: **Reactor Temperature** and **Pump Pressure**.
- A sensor selector and **1H / 6H / 24H** range selector.
- A chart, summary values, and anomalies calculated on the Java backend.
- A user-triggered explanation request, in mock or optional live mode.
- Spring Boot + PostgreSQL behind the React/TypeScript frontend.

The existing source to read first:

| Existing file | Its job | Start with |
|---|---|---|
| [`frontend/index.html`](../../frontend/index.html) | Page document and mount point | Find `id="root"` |
| [`frontend/src/main.tsx`](../../frontend/src/main.tsx) | Mount React into the document | Find `createRoot` |
| [`frontend/src/App.tsx`](../../frontend/src/App.tsx) | Page state and composition | Find `useState` and `useEffect` |
| [`frontend/src/types.ts`](../../frontend/src/types.ts) | Compile-time data contracts | Find `Sensor` and `TrendResponse` |
| [`frontend/src/api.ts`](../../frontend/src/api.ts) | Browser HTTP requests and response guards | Find `getSensors`, `getTrend`, `getExplanation` |
| [`frontend/src/components/SensorSelector.tsx`](../../frontend/src/components/SensorSelector.tsx) | Controlled select component | Find `value` and `onChange` |
| [`frontend/src/components/AiExplanation.tsx`](../../frontend/src/components/AiExplanation.tsx) | Button-driven POST and async UI | Find `handleExplain` |
| [`frontend/vite.config.ts`](../../frontend/vite.config.ts) | Development server and `/api` proxy | Find `target` |
| [`frontend/package.json`](../../frontend/package.json) | Scripts and dependencies | Find `scripts` |

### 3.2 The four runtimes

```text
Your computer while developing
  ├── Node.js (Vite, npm, TypeScript compiler, tests)
  │      └── Vite serves the frontend in development
  ├── Java / Spring Boot (HTTP API on port 8080)
  └── Docker PostgreSQL (host port 55432 -> container 5432)

Browser
  └── Runs bundled JavaScript produced from React + TypeScript
       └── fetch('/api/...') -> Vite proxy -> Spring Boot -> PostgreSQL

Production
  Browser -> Caddy (HTML/JS/CSS or /api reverse proxy)
          -> Spring Boot -> private PostgreSQL
```

React is **not** a Java server. Node runs frontend tooling; the browser executes the resulting JavaScript. Vite's local proxy and Caddy's production reverse proxy both route `/api` requests, but they are different programs used in different environments.

### 3.3 One important ownership rule

A sensor's `anomaly` is calculated by Java using the backend's normal-range rule. The React app **displays** that result; it does not independently recalculate the official anomaly classification. Our *new learning feature* uses its own user-supplied threshold and must be labeled **Threshold check**, not as a replacement for anomaly detection.

### Checkpoint 00: explain the diagram

Without looking back, answer these questions:

1. Why can the production browser run React without a Node development server?
2. Who owns SQL access: Vite, React, Spring Boot, or PostgreSQL?
3. What happens when the browser requests `/api/sensors` in development?
4. Why must the browser not receive a Gemini key?

**Pass when:** you can name the runtime and relevant file for each answer.

---

## 4. Safe setup and verification

### 4.1 Establish your working directory

Use the existing local clone; **do not clone over an existing working tree**. Open the repository root in VS Code.

**PowerShell (Windows):**

```powershell
Get-Location
git status --short
git branch --show-current
Get-ChildItem frontend\src
```

**Bash (Linux, macOS, WSL, Git Bash):**

```bash
pwd
git status --short
git branch --show-current
ls frontend/src
```

**Do not continue with branch-changing commands if the status shows unexplained existing work.** Inspect it first. Do not run `git reset --hard`, `git clean -fd`, or delete volumes to make a tutorial exercise easier.

Once the working tree is understood, create a practice branch:

```bash
git switch -c learning/frontend-v2
```

The same `git switch` syntax works in PowerShell.

### 4.2 Check required tools

```bash
node --version
npm --version
java -version
docker compose version
```

The reviewed project documents **Node.js 24** and **Java 25** for its CI/development environment. Use versions supported by the current `README.md` and project configuration. If a tool is missing, identify whether you're using PowerShell, WSL, Bash, or macOS before installing it. Official sites: [Node.js](https://nodejs.org/en/download), [Eclipse Temurin](https://adoptium.net/temurin/releases/), and [Docker](https://docs.docker.com/get-docker/).

### 4.3 Install and run frontend checks

From the repository root:

```bash
npm --prefix frontend ci
npm --prefix frontend run lint
npm --prefix frontend test
npm --prefix frontend run build
```

- `ci` installs packages from the committed lockfile.
- `lint` checks configured static rules.
- `test` runs Vitest in jsdom.
- `build` type-checks and generates production assets.

Record actual outcomes. A check can fail because of environment/configuration, not necessarily your source code; inspect the error and do not claim success prematurely.

### 4.4 Start the app if you want real end-to-end Network traces

Read [`README.md`](../../README.md) before startup. From the repository root, start PostgreSQL:

```bash
docker compose up -d db
```

**Bash:** seed the database with existing SQL files:

```bash
docker compose exec -T db psql -U app -d industrial_trends < db/schema.sql
docker compose exec -T db psql -U app -d industrial_trends < db/seed.sql
```

**PowerShell:** PowerShell redirection is not Bash-compatible for this use; pipe file contents explicitly:

```powershell
Get-Content -Raw db/schema.sql | docker compose exec -T db psql -U app -d industrial_trends
Get-Content -Raw db/seed.sql   | docker compose exec -T db psql -U app -d industrial_trends
```

Open another terminal at the repo root and start Java:

**PowerShell:**

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**Bash:**

```bash
cd backend
./mvnw spring-boot:run
```

Open a third terminal at the repo root and start Vite:

```bash
npm --prefix frontend run dev
```

Open the address actually displayed by Vite, normally `http://localhost:5173`. Confirm the Spring Boot server started before expecting live sensor data. If the backend isn't running, frontend-only labs can still proceed.

> [!WARNING]
> Do **not** execute `docker compose down --volumes` as routine cleanup. It deletes Compose-managed volumes and may destroy data. Do not copy production environment values into your learning environment.

### Checkpoint 01: tools and visible behavior

- Find the simulated-data notice in the page.
- Select both sensors and all three time ranges.
- In browser DevTools → **Network**, locate a `GET /api/sensors` request.
- In DevTools → **Console**, verify whether any JavaScript errors appear.
- Record which commands you ran and their actual exit result.

**Pass when:** you can explain one rendered element, one HTTP request, and one build command.

---

## 5. Day 1: browser and language foundations

### Lesson 01: HTML is structure; DOM is what the browser builds

**Mental model.** HTML is a document description. The browser parses it into the **Document Object Model** (DOM), a tree of elements that JavaScript can inspect. React eventually updates this tree.

Start with these tags:

| Element | Meaning |
|---|---|
| `<h1>` | Main heading |
| `<p>` | Paragraph |
| `<label>` | Name of a form control |
| `<input>` | Text/number field |
| `<button>` | User action |
| `<main>` / `<section>` | Page structure |
| `<script>` | Load or execute JavaScript |

**Try 01A: inspect before coding.** Read `frontend/index.html`. Find the root element and the module script. Explain why the root starts empty even though the browser displays a large dashboard.

**Try 01B: create a tiny browser document.** In VS Code, create `frontend/public/learning-html.html` temporarily and type:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HTML Learning Lab</title>
  </head>
  <body>
    <main>
      <h1>Threshold Lab</h1>
      <label for="reading">Sensor reading</label>
      <input id="reading" type="number" value="86" />
      <button type="button">Check</button>
    </main>
  </body>
</html>
```

Start Vite and visit `/learning-html.html` at the displayed Vite origin. This is **plain HTML**, not React. In DevTools → Elements, locate the input.

**Predict:** Does the button do anything yet? Why not?

**Expected:** the input and button appear; clicking the button performs no application calculation because no behavior was attached.

**Pass when:** you can explain `id`, `for`, `type`, and the DOM tree. Keep this lab file only while you are studying; remove it before final verification.

### Lesson 02: CSS changes presentation, not business logic

**Mental model.** CSS tells the browser how matched elements should look. It does not know whether a reading exceeds a threshold.

Within the same HTML file, add this to `<head>`:

```html
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; }
  main { max-width: 30rem; }
  input { display: block; margin-block: 0.5rem 1rem; padding: 0.5rem; }
  button { padding: 0.6rem 1rem; cursor: pointer; }
  button:focus-visible { outline: 3px solid rebeccapurple; }
</style>
```

**Try 02A.** Change the margin and maximum width; inspect the computed style in DevTools. Resize the browser. Explain the difference between `margin`, `padding`, and `max-width`.

**Try 02B.** Use Tab to focus the button. Confirm that the focus outline is visible. Do not remove keyboard focus styling for aesthetic reasons.

**Read next:** `frontend/src/index.css` and one real component's `className`. JSX uses `className`, whereas plain HTML uses `class`.

**Pass when:** you can point to the source and the computed rule that changed the layout, and the control still works by keyboard.

### Lesson 03: JavaScript adds behavior

**Mental model.** HTML provides the controls; JavaScript responds to events and changes the DOM. React will later provide a more structured method of describing those DOM changes.

In the HTML lab, place this just before `</body>`:

```html
<script>
  const readingInput = document.querySelector('#reading');
  const checkButton = document.querySelector('button');

  checkButton.addEventListener('click', () => {
    const reading = Number(readingInput.value);
    console.log('Reading:', reading);
  });
</script>
```

**New terms:** `const` declares a binding; `document.querySelector` finds an element; `addEventListener` registers a callback; `Number(...)` converts text to a number; `console.log` prints to DevTools Console.

**Predict:** What appears in Console when the input is `86` and the button is clicked? What about `72`?

**Try 03A.** Add a `const threshold = 80` and log whether `reading > threshold`.

**Try 03B.** Add a `<p id="result" aria-live="polite"></p>` and update its `.textContent` after clicking. Use the exact outcome labels `Above threshold` and `Within threshold`.

**Safety note:** `Number('')` is `0`. Empty input must be rejected later rather than quietly becoming zero.

**Expected:** your page now reads an input, calculates a Boolean, and updates the displayed result. It still has no backend request.

**Pass when:** you can explain how the click handler gets a value and changes what is visible, without copying the code.

**Day 1 teach-back:** Explain the difference between HTML source, DOM nodes, CSS styles, and JavaScript events. Name the browser tool that reveals each one.

---

## 6. Day 2: JavaScript, TypeScript, and frontend tools

### Lesson 04: JavaScript values, functions, objects, and arrays

**Mental model.** JavaScript objects resemble flexible records or maps. Arrays contain ordered values. Functions receive inputs and return outputs. Unlike Java, JavaScript variables do not declare types at runtime.

Open your browser Console and paste **JavaScript only**:

```js
const readings = [
  { value: 69, anomaly: false },
  { value: 86, anomaly: true },
  { value: 72, anomaly: false },
];

function exceeds(value, threshold) {
  return value > threshold;
}

readings.map(item => item.value);
readings.filter(item => item.anomaly);
readings.find(item => exceeds(item.value, 80));
readings.every(item => typeof item.value === 'number');
```

| Operator/function | Meaning | Expected result here |
|---|---|---|
| `>` | Greater than | `86 > 80` is `true` |
| `===` | Strict equality | `80 === '80'` is `false` |
| `map` | Transform each item | `[69, 86, 72]` |
| `filter` | Keep matching items | One object, value `86` |
| `find` | First match | Object with value `86` |
| `every` | Test all elements | `true` |

**Try 04A.** Write a function `countAbove(values, threshold)` using `filter`. Calling it with `[69, 86, 72]` and `80` must return `1`; with `60` it must return `3`; with an empty array it must return `0`.

**Try 04B.** Write `readingLabel(reading)` that returns `86 - anomaly` or `69 - normal` based on `reading.anomaly`. Then use `map` to produce all three labels.

**Try 04C.** Demonstrate that spreading an object makes a shallow copy:

```js
const original = { value: 69, anomaly: false };
const updated = { ...original, value: 90 };
console.log(original.value, updated.value);
```

**Expected:** `69 90`. Explain why React state changes should replace objects/arrays rather than mutate a value currently used by a component.

**Pass when:** you independently write a function with an argument, condition, array method, and return value.

### Lesson 05: TypeScript adds compile-time checks

**Mental model.** TypeScript is JavaScript with an extra type-checking step. Type annotations are removed when the browser's JavaScript is produced. They do **not** validate a JSON response at runtime.

Read `frontend/src/types.ts`. In your learning branch create `frontend/src/learning/type-lab.ts`:

```ts
type SampleReading = {
  value: number;
  anomaly: boolean;
};

export function isAboveThreshold(reading: SampleReading, threshold: number): boolean {
  return reading.value > threshold;
}

const sample: SampleReading = { value: 86, anomaly: true };
console.log(isAboveThreshold(sample, 80));
```

Run:

```bash
npm --prefix frontend run build
```

**Try 05A.** Temporarily change the number `86` to the string `'86'`. Predict the TypeScript diagnostic, run the build, and restore the number.

**Try 05B.** Change `threshold: number` to `threshold: string`. Explain which comparison now becomes questionable and what the compiler reports.

**Try 05C.** Explain this real type:

```ts
export type TimeRangeHours = 1 | 6 | 24;
```

A value of `12` does not satisfy the current union, even though `12` is a number. This is a set of supported values, not an arithmetic range.

**Important correction:** browser Console accepts `function f(value) {}` but not TypeScript parameter syntax `function f(value: number) {}`. Use `.ts`/`.tsx` files and the build to practice TypeScript.

**Pass when:** you can cause, identify, and fix a deliberate compile-time type error.

### Lesson 06: modules, imports, Node, and npm

**Mental model.** JavaScript modules let one file export values that another imports. Node executes frontend *tooling* on your machine. npm installs and runs tools. Vite serves the site during development and generates deployable assets during a build.

Read `frontend/package.json` and `frontend/src/main.tsx`, then inspect `frontend/src/App.tsx` imports.

| Thing | Role | Similar Java idea, with limits |
|---|---|---|
| `import` / `export` | Share values across JS/TS modules | Imports/packages |
| `node` | Execute JavaScript outside browser | JVM as an execution environment |
| `npm` | Package install and script execution | Maven-like dependency/script role |
| `vite` | Development server and bundler | Build tooling, not a Java backend |
| `package.json` | Declared dependencies and scripts | Build manifest |
| `package-lock.json` | Exact resolved dependency graph | Dependency lock/reproducibility |
| `node_modules` | Installed dependencies | Generated local package directory |
| `dist` | Build output for browser | Compiled/deployable artifacts |

**Try 06A.** Find the exact scripts `dev`, `test`, `lint`, and `build`. Explain what the `build` script does **before** Vite emits assets.

**Try 06B.** Run `npm --prefix frontend run build` and inspect `frontend/dist`. Do not manually edit the generated files.

**Try 06C.** Describe the path: `index.html` → `main.tsx` → `App.tsx` → child components.

**Pass when:** you can say whether a command or file belongs to developer tooling, browser runtime, or source code.

### Lesson 07: JavaScript asynchronous behavior

**Mental model.** A `Promise` represents a result that will arrive later. `await` suspends the current async function, not the whole browser.

Try this in the Console:

```js
async function getAnswer() {
  return 42;
}

const pendingAnswer = getAnswer();
console.log(pendingAnswer);
pendingAnswer.then(value => console.log('Resolved:', value));
```

**Predict:** Why is the immediate result a `Promise`, rather than the number `42`?

Now try:

```js
async function showAnswer() {
  const value = await getAnswer();
  console.log(value);
}

showAnswer();
```

Read `frontend/src/components/AiExplanation.tsx`. Identify its `try`, `catch`, `finally`, `pending`, and `error` logic.

**Pass when:** you can explain the difference between “request started,” “request succeeded,” and “request failed,” and why a UI needs separate messages for them.

**Day 2 teach-back:** Explain why TypeScript cannot guarantee an untrusted HTTP response, and why `await` does not freeze the browser.

---

## 7. Day 3: React components, props, state, and forms

### Lesson 08: JSX and components

**Mental model.** A React component is a function returning a UI description called JSX. React compares desired output with what it previously rendered and updates the DOM. A component name starts with an uppercase letter.

Create `frontend/src/components/LearningMessage.tsx`:

```tsx
type Props = {
  title: string;
};

export function LearningMessage({ title }: Props) {
  return (
    <section aria-label="Learning example">
      <h2>{title}</h2>
      <p>This message was rendered by React.</p>
    </section>
  );
}
```

**Try 08A.** Temporarily import and render `<LearningMessage title="React basics" />` in `App.tsx`, near the top of `<main>`. Confirm it is visible. Remove it after the exercise unless intentionally retained on the learning branch.

**Try 08B.** Change the title passed from the parent. Observe that the child displays a new value without owning any state.

**New ideas:** `Props` describes inputs; `{title}` inserts a JavaScript expression in JSX; React's `className` is the JSX equivalent of HTML `class`.

**Pass when:** you can author a typed child component, import it, pass a prop, and explain which component owns the prop value.

### Lesson 09: state, events, and derived values

**Mental model.** Props come *from a parent*. State is a component's memory. Calling a state setter schedules React to render again. A value that can be calculated from existing state is usually **derived data**, not another state variable.

Create `frontend/src/components/LearningCounter.tsx`:

```tsx
import { useState } from 'react';

export function LearningCounter() {
  const [count, setCount] = useState(0);
  const doubled = count * 2;

  return (
    <section aria-label="Counter practice">
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button type="button" onClick={() => setCount(previous => previous + 1)}>
        Add one
      </button>
    </section>
  );
}
```

**Try 09A.** Render it temporarily inside `App`. Click twice. Predict and verify both displayed values.

**Try 09B.** Add a second button labeled **Reset**. It must reset the number to `0`.

**Try 09C.** Explain why `doubled` is not another `useState` value, and why `onClick={() => setCount(...)}` is different from calling the setter immediately during render.

**Pass when:** you independently create a click event that changes UI, without directly changing the DOM with `querySelector`.

### Lesson 10: controlled inputs and form submission

**Mental model.** In a controlled input, React state supplies the current input value and the `onChange` handler updates that state. Browser number inputs still expose their `value` as a **string**. Validation must distinguish empty strings from real numeric zero.

Create `frontend/src/components/ThresholdFormPractice.tsx`:

```tsx
import { useState, type FormEvent } from 'react';

export function ThresholdFormPractice() {
  const [readingText, setReadingText] = useState('86');
  const [thresholdText, setThresholdText] = useState('80');
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reading = Number(readingText);
    const threshold = Number(thresholdText);

    if (readingText.trim() === '' || thresholdText.trim() === ''
        || !Number.isFinite(reading) || !Number.isFinite(threshold)) {
      setSubmitted('Enter two valid numbers.');
      return;
    }

    setSubmitted(reading > threshold ? 'Above threshold' : 'Within threshold');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="practice-reading">Reading</label>
      <input id="practice-reading" type="number" value={readingText}
        onChange={event => setReadingText(event.target.value)} />
      <label htmlFor="practice-threshold">Threshold</label>
      <input id="practice-threshold" type="number" value={thresholdText}
        onChange={event => setThresholdText(event.target.value)} />
      <button type="submit">Check locally</button>
      {submitted && <p role="status">{submitted}</p>}
    </form>
  );
}
```

**Try 10A.** Render the practice component temporarily. Submit `86` and `80`; then `79` and `80`; then `80` and `80`. Predict the three outputs.

**Try 10B.** Clear one input and submit. Explain why the form must not silently interpret the empty string as `0`.

**Try 10C.** Press Enter in a field instead of clicking. Explain why a `<form onSubmit>` with a submit button supports this naturally.

**Try 10D.** After an outcome appears, change an input. Improve the component so the old result is cleared when the input changes. Explain what stale UI would otherwise imply.

**Expected:** this component calculates **entirely in the browser**, with no HTTP. It is practice for the real POST feature on Day 5.

> [!NOTE]
> The React type for form events depends on the installed React type definitions. The repository's reviewed configuration uses React 19 and `@types/react` 19. If the current compiler rejects an annotation, inspect the installed type definitions rather than changing code blindly.

**Pass when:** you can create two labeled controlled inputs, prevent default form navigation, reject invalid input, and display a result.

**Day 3 teach-back:** Explain the roles of JSX, props, `useState`, event callbacks, and derived values. Be able to implement a new small component without looking at the exact code above.

---
## 8. Day 4: HTTP requests and real project data flow

### Lesson 11: HTTP, JSON, `fetch`, and response validation

**Mental model.** The browser talks to the server by sending an HTTP request: a method, URL, headers, and sometimes a body. The server returns an HTTP status and possibly a JSON body. `fetch` normally resolves to a `Response` even for HTTP 400/500; you need to check `response.ok`.

This is the current project's **real** route table:

| Method | Path | Existing or new? | Purpose |
|---|---|---|---|
| GET | `/api/health` | Existing | Lightweight server health |
| GET | `/api/sensors` | Existing | Sensor list |
| GET | `/api/sensors/{id}/trend?hours=24` | Existing | Readings and Java summary |
| POST | `/api/sensors/{id}/explanation?hours=24` | Existing | On-demand explanation; no JSON input body |
| POST | `/api/threshold-check` | **New in Lesson 13** | User-supplied JSON threshold calculation |

**Read:** `frontend/src/api.ts`. Find `getSensors`, `getTrend`, `getExplanation`, `requireSuccessfulJson`, and `isTrendResponse`.

A simplified GET request:

```ts
async function loadSensorList() {
  const response = await fetch('/api/sensors');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data: unknown = await response.json();
  console.log(data);
}
```

**Try 11A.** In browser DevTools → Network, select `/api/sensors`. Record its method, status code, response Content-Type, and one returned JSON field. Do not infer values if the API is not running.

**Try 11B.** Use the Console to run `loadSensorList()`, then explain why `response.json()` is asynchronous and why its result should initially be treated as `unknown`.

**Try 11C.** Locate the existing runtime guards in `api.ts`. TypeScript's `Sensor` type is erased at runtime; `isSensor(data)` inspects the data that actually arrived.

**Three failures to distinguish:**

1. **Transport failure:** browser cannot reach server; `fetch` may reject.
2. **HTTP failure:** server replies with a non-success status; `response.ok` is `false`.
3. **Contract failure:** server returns successful HTTP and JSON, but fields have unexpected types or values.

**Pass when:** you can identify which case an error belongs to and show evidence from Network or the code.

### Lesson 12: trace existing React state and async requests

**Read:** `frontend/src/App.tsx` and `frontend/src/components/AiExplanation.tsx`.

The existing startup path is:

```text
App initially renders
  -> useEffect calls getSensors()
  -> api.ts sends GET /api/sensors
  -> Java returns sensor metadata
  -> runtime guard verifies shapes
  -> App stores sensors and selects the first sensor
  -> another useEffect requests that sensor's trend
  -> backend returns trend/summary/anomalies
  -> App stores result and renders components
```

On selecting a new range, `App` clears old trend content, starts a new request, and uses `AbortController` to avoid showing a stale previous response. The trend's status is one of `loading`, `empty`, `error`, or `success`.

**Try 12A: draw a state machine.** On paper or in your log, draw:

```text
initial loading -> sensors loaded -> trend loading -> success
                                                   \-> empty
                                                   \-> error
```

Add the state transition when the user changes from 24H to 6H. Explain why stale 24H values should not be displayed as current 6H results.

**Try 12B: inspect POST.** Click **Explain with AI** only in a known mock-mode development/test environment, then inspect the request in Network. Identify the method, URL, query parameter, and response fields. **Notice:** this POST does not send a user-entered JSON body. That is the skill we will add next.

**Try 12C: ownership.** Explain why the sensor selector receives props (`selectedId`, `onChange`) instead of fetching its own sensor list. Explain why the explanation component owns its request's pending/error/result state.

**Pass when:** you can trace one interaction through component → API wrapper → Spring Boot → JSON → state → visible component.

**Day 4 teach-back:** Write three sentences explaining what `GET`, `POST`, and a JSON response guard do. Explain what an effect is for and why the threshold-checking POST should be sent **on submit**, not on every render.

---

## 9. Day 5: build the threshold checker end to end

> [!IMPORTANT]
> This entire section is a **new feature to implement**. As of the reviewed repository snapshot, `/api/threshold-check`, `ThresholdChecker.tsx`, and `checkThreshold` do not exist. Never report this feature as already present or already tested.

### Lesson 13: define and implement a tiny Spring Boot contract

**Feature behavior, fixed for the lesson:** a user enters two finite numbers, `value` and `threshold`. Java returns whether `value` is **strictly greater than** `threshold` and the signed difference `value - threshold`. Equality is **not** above threshold.

#### 13.1 Exact API contract

**Request:** `POST /api/threshold-check`

Request header:

```http
Content-Type: application/json
```

Request body:

```json
{
  "value": 86,
  "threshold": 80
}
```

**Successful response: HTTP 200**

```json
{
  "aboveThreshold": true,
  "difference": 6
}
```

Validation requirements:

- Both fields **must be present** and JSON numbers, not strings.
- Both numbers must be **finite**.
- Their subtraction must also be finite.
- A missing field, a `null`, a string, or a nonfinite arithmetic result must yield **HTTP 400**.
- The endpoint must not write to PostgreSQL or call the LLM.
- This is a standalone comparison, **not** a change to the official anomaly rule.

**Boundary cases:**

| Request (`value`, `threshold`) | HTTP | `aboveThreshold` | `difference` |
|---|:--:|:--:|---:|
| `86`, `80` | 200 | `true` | `6` |
| `79`, `80` | 200 | `false` | `-1` |
| `80`, `80` | 200 | `false` | `0` |
| `0`, `0` | 200 | `false` | `0` |
| `-5`, `-8` | 200 | `true` | `3` |
| `null`, `80` | 400 | N/A | N/A |
| `"86"`, `80` | 400 | N/A | N/A |

#### 13.2 Find the right Java location

**Read:**

- `backend/src/main/java/com/flyinnegg/industrialtrend/sensor/SensorController.java`
- `backend/src/test/java/com/flyinnegg/industrialtrend/sensor/SensorControllerTests.java`

The repository's current Java package is `com.flyinnegg.industrialtrend.sensor` for this area. **Do not** create a second similarly named controller in a guessed package.

**Try 13A: write the contract before code.** In the learning log, write out the request/response JSON for equality, a greater value, and an invalid missing field.

**Try 13B: implement a separate controller.** Create:

`backend/src/main/java/com/flyinnegg/industrialtrend/sensor/ThresholdCheckController.java`

Requirements:

1. Map `POST /api/threshold-check`.
2. Deserialize into `Map<String, Object>`, then explicitly require each input to be an instance of `Number`. This also rejects quoted numeric strings, which some JSON-to-`Double` binding configurations coerce automatically.
3. Reject invalid inputs with HTTP 400 using `ResponseStatusException`.
4. Return a structured response record with `aboveThreshold` and `difference`.
5. Do not modify sensor SQL, anomaly calculations, or explanation providers.

**Why a separate controller?** The exercise is self-contained and does not require changing how sensor trend and explanation endpoints behave.

**Try 13C: verify HTTP without React.** First run the backend, then test the endpoint. **Bash:**

```bash
curl -i -X POST http://localhost:8080/api/threshold-check \
  -H 'Content-Type: application/json' \
  -d '{"value":86,"threshold":80}'
```

**PowerShell (avoids the `curl` alias ambiguity):**

```powershell
$body = @{ value = 86; threshold = 80 } | ConvertTo-Json
Invoke-RestMethod -Method Post `
  -Uri 'http://localhost:8080/api/threshold-check' `
  -ContentType 'application/json' -Body $body
```

Then test equality and an invalid request. **Do not claim the endpoint works until you see the real status and JSON.**

**Try 13D: add a focused Java test.** Follow the current project's `MockMvcBuilders.standaloneSetup(...)` pattern, with a success and at least two HTTP 400 cases. The full reference appears in Appendix A if you become blocked *after* your own attempt.

**Pass when:** Java tests pass, valid POST returns the defined JSON, invalid input returns 400, and existing sensor routes still work.

### Lesson 14: design the typed frontend API boundary

Now connect the browser to Java. Keep the HTTP code in `frontend/src/api.ts`, not embedded inside JSX.

**Try 14A: define types** in `frontend/src/types.ts`:

```ts
export type ThresholdCheckRequest = {
  value: number;
  threshold: number;
};

export type ThresholdCheckResponse = {
  aboveThreshold: boolean;
  difference: number;
};
```

**Try 14B: implement `checkThreshold`.** In `api.ts`, import these types. Follow the existing `requireSuccessfulJson` style and implement a function with this signature:

```ts
export async function checkThreshold(
  request: ThresholdCheckRequest,
): Promise<ThresholdCheckResponse>
```

Its `fetch` options must include the method, JSON Content-Type header, and stringified request body:

```ts
{
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(request),
}
```

**Do not stop after adding types.** Validate the actual returned JSON at runtime. At minimum, verify it is a non-null object, `aboveThreshold` is a Boolean, and `difference` is a finite number. Reject a bad response with a clear error. Optionally strengthen the contract to ensure `difference` equals the mathematical input difference; the core task does not depend on doing so.

**Try 14C: predict the transport.** Draw the exact path:

```text
ThresholdChecker form
  -> checkThreshold({ value: 86, threshold: 80 })
  -> fetch('/api/threshold-check', POST, application/json)
  -> Vite development proxy
  -> Spring ThresholdCheckController
  -> { aboveThreshold: true, difference: 6 }
  -> runtime response guard
  -> React state updated
  -> visible result
```

**Pass when:** the API wrapper can be called with typed data and correctly handles HTTP errors and malformed JSON instead of blindly trusting `as ThresholdCheckResponse`.

### Lesson 15: implement the actual controlled React form

Create `frontend/src/components/ThresholdChecker.tsx`. Implement this independently using your Day 3 form as a starting point.

**UI requirements (precise and testable):**

1. Heading: **Threshold checker**.
2. Two labeled number inputs: **Reading** and **Threshold**.
3. Submit button: **Check threshold**.
4. Submit sends exactly one POST with numeric values for the two fields.
5. Invalid or empty input does **not** trigger a request; display **Enter two valid numbers.**
6. During the request, button is disabled and **Checking...** is visible.
7. Valid success displays **Above threshold** or **Within threshold**, plus a numeric difference.
8. HTTP/network/contract failure displays **Unable to check threshold.** The user can retry.
9. On changing either input, clear the previous result and error so it is not mistaken for the edited values.
10. The result uses a live region or status semantics; errors use `role="alert"`.
11. The component never writes data to a database or uses an LLM.
12. Use a normal form submit handler so Enter submits and no page reload occurs.

**Recommended minimal state:**

| State | Type | Purpose |
|---|---|---|
| `valueText` | `string` | Raw input, keeps empty input distinct from zero |
| `thresholdText` | `string` | Raw input |
| `pending` | `boolean` | Disable submit and show progress |
| `result` | `ThresholdCheckResponse \| null` | Latest successful response |
| `error` | `string \| null` | Current validation or request error |

`Number(valueText)` and `Number(thresholdText)` are **derived values**, not extra state. Reject blank strings *before* converting.

**Try 15A.** Write the JSX layout with labels/inputs/button and no API call. Verify that typing updates state.

**Try 15B.** Add submit validation. Confirm blank and invalid inputs do not send POST. Include `Number.isFinite(...)` to reject nonfinite JavaScript values.

**Try 15C.** Call `checkThreshold` using `await` inside `try/catch/finally`. Set `pending` before starting, and reset it in `finally`. Use one request per submit; disable resubmitting while pending.

**Try 15D.** Display the success and failure paths, then clear stale output when the form changes.

**Try 15E.** Import and render `<ThresholdChecker />` inside the existing `App.tsx` layout **outside** the trend-success-only conditional. This makes the exercise visible even when sensor trend data cannot load. Keep it within `<main>` and add only minimal CSS that respects the current design. Do not restructure the dashboard.

**Try 15F.** Inspect DevTools → Network and check the *actual* request method, Request Payload, status, and Response. There must be numeric JSON values, not quoted numeric strings.

**Acceptance checklist:**

- [ ] `86` / `80` → Above threshold, difference `6`.
- [ ] `79` / `80` → Within threshold, difference `-1`.
- [ ] `80` / `80` → Within threshold, difference `0`.
- [ ] Empty input → validation message; no network request.
- [ ] Stopped backend → error message rather than an infinite spinner.
- [ ] Changing inputs clears stale results.
- [ ] Enter works; visible focus and labels are correct.
- [ ] Existing sensor chart, selection, and explanations still work.

**Pass when:** you built the form yourself and can describe the input string → validation → numeric JSON → Java calculation → guarded JSON response → React state → UI path.

**Day 5 teach-back:** Why is the comparison performed in Java here even though a trivial comparison could be done in the browser? Answer in terms of learning the HTTP boundary, not false claims about performance or security.

---

## 10. Day 6: tests, errors, and accessibility

### Lesson 16: frontend tests test what a user observes

**Mental model.** A React Testing Library test renders a component and interacts with it in a jsdom environment. It can verify behavior, but it does not automatically prove that PostgreSQL or a running Java backend works.

**Read:**

- `frontend/src/components/SensorSelector.test.tsx`
- `frontend/src/components/AiExplanation.test.tsx`
- `frontend/src/App.test.tsx`
- `frontend/src/api.test.ts`

The project uses **Vitest**, **React Testing Library**, and **user-event**. In this tutorial we recommend **two narrow kinds** of tests:

1. **API wrapper test:** mock global `fetch`, assert POST method/body, HTTP failure, malformed response.
2. **Component test:** mock `checkThreshold`, type into inputs, submit, and inspect visible output.

#### 16.1 API wrapper tests

Add tests for these conditions:

| Test | What it proves |
|---|---|
| Posts `86/80` JSON to `/api/threshold-check` | Correct URL/method/header/body |
| HTTP 400 reply | Wrapper rejects unsuccessful HTTP |
| HTTP 200 with missing `difference` | Runtime guard rejects invalid payload |
| HTTP 200 valid JSON | Wrapper returns typed result |

Keep the tests independent. A mock JSON value is test data, not proof of a live backend response.

#### 16.2 Component tests

Create `frontend/src/components/ThresholdChecker.test.tsx`:

- Test labels are associated with inputs.
- Test entering `86`, `80`, and clicking **Check threshold** invokes the API wrapper with `{ value: 86, threshold: 80 }`.
- Test pending UI while a Promise remains unresolved; the button is disabled.
- Test a resolved Promise shows **Above threshold** and difference `6`.
- Test a rejected Promise shows **Unable to check threshold.**.
- Test clearing a field does not call the API.
- Test a change after success clears the old result.

**Try 16A.** Write the happy-path test yourself before consulting Appendix A. Use `screen.getByRole('spinbutton', { name: 'Reading' })` and `user.clear` / `user.type` / `user.click` to interact as a user.

**Try 16B.** Force a mock rejection and verify the exact visible error. Do not modify the backend to simulate a frontend unit test.

**Try 16C.** Run the focused and complete suites:

```bash
npm --prefix frontend test -- ThresholdChecker
npm --prefix frontend test
npm --prefix frontend run lint
npm --prefix frontend run build
```

**Pass when:** the tests pass for the implemented behavior and you can say what they mock and therefore do *not* prove.

### Lesson 17: keyboard access, failure states, and cleanup

**Manual accessibility check:**

1. Use only Tab, Shift+Tab, and Enter to reach and submit the form.
2. Confirm both fields are named by their visible labels.
3. Confirm focus is visible; never remove focus outlines without a replacement.
4. Confirm pending, success, and error messages can be understood without color alone.
5. At a narrow window width, confirm no horizontal page scrolling is introduced by the new feature.

**Failure matrix:**

| Condition | Expected UI | Expected HTTP |
|---|---|---|
| Valid 86/80 | Above threshold; difference 6 | One POST, 200 |
| Valid 80/80 | Within threshold; difference 0 | One POST, 200 |
| Empty number input | Local validation error | None |
| Invalid JSON sent directly | API responds 400 | One POST, 400 |
| Backend disconnected | Friendly request error | Attempt fails |
| Broken JSON shape | Friendly request error | Could be 200 but rejected by client guard |
| Input changed after result | Old result cleared | None until new submit |

**Try 17A.** Temporarily stop Spring Boot *after confirming it is safe to stop your local learning instance*. Submit valid input and describe exactly what error you observe. Restart it before final checks.

**Try 17B.** Confirm your new request doesn't accidentally fire in `useEffect`, during render, or while typing.

**Try 17C.** Remove the temporary HTML, counter, message, and practice form files if they are not intentionally part of the finished exercise. Inspect `git status --short` and the entire diff before finalizing.

**Pass when:** the UI is keyboard-operable, async states are distinct, and you can explain why stale results and duplicate submissions are a correctness problem.

**Day 6 teach-back:** Explain a unit test versus a full-stack smoke test, where errors can arise, and how you prevent a wrong or outdated result from being presented as current.

---

## 11. Day 7: integration, production build, and independent assessment

### Lesson 18: verify across the stack

**Backend tests (run from the repository root):**

**PowerShell:**

```powershell
cd backend
.\mvnw.cmd test
cd ..
```

**Bash:**

```bash
cd backend
./mvnw test
cd ..
```

**Frontend checks:**

```bash
npm --prefix frontend run lint
npm --prefix frontend test
npm --prefix frontend run build
```

**Full-stack manual check:**

1. Start PostgreSQL, Spring Boot, and Vite as documented in Section 4.
2. Verify existing sensor selection, three time ranges, summary, and anomaly list.
3. Submit 86/80 with the new form.
4. Inspect the actual JSON Request Payload and Response in Network.
5. Submit equality 80/80, then invalid/empty input.
6. Reload; verify the app still renders and the new form has predictable initial state.
7. Check browser Console, inspect `git diff`, and ensure no secrets or generated output were committed.

**Evidence format:**

```md
### Final verification (write actual date and results)
- Backend tests: PASS / FAIL / NOT RUN; command and output summary:
- Frontend lint: PASS / FAIL / NOT RUN:
- Frontend tests: PASS / FAIL / NOT RUN:
- Frontend build: PASS / FAIL / NOT RUN:
- POST valid request: actual status and body:
- POST invalid request: actual status and body:
- Network screenshot or observation:
- Existing dashboard regression result:
- Open issues and next steps:
```

**Do not** use the reference README's historical test counts as today's test result. A new feature changes the test set. Do not claim a deployed production feature before it is actually deployed and independently verified.

### Lesson 19: understand the production shape without deploying

The current project uses a Vite production build and Caddy to serve static assets and reverse-proxy `/api` to the Java backend. Read:

- [`frontend/Dockerfile`](../../frontend/Dockerfile)
- [`frontend/Caddyfile`](../../frontend/Caddyfile)
- [`compose.prod.yaml`](../../compose.prod.yaml)
- [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)

**Follow the data path:**

```text
Source .tsx/.css
   -> TypeScript checks
   -> Vite build -> frontend/dist (HTML, CSS, JS assets)
   -> frontend container / Caddy serves static assets
   -> browser POST /api/threshold-check
   -> Caddy reverse proxy to backend:8080
   -> Java controller returns JSON
   -> browser renders guarded result
```

**Try 19A.** Explain why the Vite development proxy will not exist in production. Identify the equivalent `/api` routing in `Caddyfile`.

**Try 19B.** Explain what a new Java route requires when deployed: a backend build/image with the new controller and a frontend build/image with the new UI. Deploying only the UI would produce a failing POST.

**Try 19C.** Inspect CI rather than guessing that any change is automatically deployed. Distinguish build/test/publish from actual production rollout. Do not run an actual deployment or rollback just to complete this lesson.

**Pass when:** you can draw where React source becomes browser assets, and how an HTTP request reaches the Java controller in both local development and production.

### Final independent assessment

Without opening Appendix A or requesting a large Codex-generated answer:

1. **From memory:** create a new typed component with one labeled number input, a button, and a displayed result.
2. **Explain:** which values are raw input state, which are derived, and why validation is needed.
3. **Trace:** user Enter → handler → JSON body → Vite proxy → controller → JSON response → guard → state → render.
4. **Diagnose:** a network failure, HTTP 400, and malformed HTTP 200 JSON separately.
5. **Demonstrate:** the checker handles greater, equal, lower, invalid, and failed-network scenarios.
6. **Test:** explain what a mocked frontend test proves and how you verify the actual backend.
7. **Protect:** explain which data must never enter a browser bundle.
8. **Explain honestly:** call this synthetic portfolio analytics, not live industrial monitoring or AI-driven anomaly detection.

**Graduation criterion:** implement a second tiny feature of comparable complexity on a new learning branch without copying the threshold-checker's full source. If you need help, ask Codex for a hint about a concept, not an entire completed component.

---

## 12. Deeper optional modules

Only start these after the core path passes. They preserve the valuable deeper material from tutorial v1.1 without making it a prerequisite for your first independently built feature.

### O1. Race conditions, effect cleanup, and aborting requests

**Read:** `App.tsx` (`AbortController`, effect dependencies, cleanup), `api.ts` (`signal`).

**Exercise:** rapidly switch 24H → 1H → 6H with DevTools Network throttling. Explain why a slow earlier result must never replace a newer selection. Distinguish stopping the browser from *guaranteeing* that server work has stopped.

**Pass:** you can draw both orderings of two requests and show how current source avoids stale UI.

### O2. Runtime validation beyond TypeScript

**Read:** all guards in `api.ts`.

**Exercise:** list the properties guarded for `TrendResponse` and two domain invariants not currently guaranteed by shape checks alone, such as `summary.count === readings.length` and matching sensor ID. Explain the risk/benefit of stricter checks.

**Pass:** you can explain structural validation versus business consistency, and distinguish compile-time types from runtime evidence.

### O3. Recharts, responsive CSS, and semantic tables

**Read:** `TrendChart.tsx`, `AnomalyList.tsx`, `index.css`.

**Exercise:** trace `readings` into the chart, locate axes/tooltip/normal bounds, and examine layout at narrow width. Explore how the anomaly list uses table headings and timestamps. Do not claim the chart itself computes anomalies.

**Pass:** you can connect a returned reading to one chart mark, one table cell, and the Java anomaly flag.

### O4. Stateful component lifecycle and reset with `key`

**Read:** `AiExplanation.tsx` and the `key` passed from `App.tsx`.

**Exercise:** explain why changing sensor/time range creates a new explanation component instance and clears its prior pending/result/error state. Compare that with keeping the instance and manually synchronizing internal state.

**Pass:** you can explain a deliberate remount without claiming `key` is a network request ID.

### O5. Spring Boot and PostgreSQL trace

**Read:** `SensorController.java`, `SensorService.java`, `SensorRepository.java`, `TrendCalculator.java`, `db/schema.sql`, `db/seed.sql`.

**Exercise:** trace the 1H/6H/24H requests, parameterized SQL, timestamp anchor to latest stored point, and inclusive endpoints. For 30-minute seed data, 1H has 3 samples, 6H has 13, and 24H has 48 available samples in the current seed. Treat counts as fixtures, not universal laws.

**Pass:** you can explain why Java owns anomaly/summary logic and why a selected historical window isn't anchored to current wall-clock time.

### O6. Safe LLM integration boundaries

**Read:** `AiExplanation.tsx`, explanation service/provider classes, `README.md`.

**Exercise:** trace click → backend → mock/live provider → typed response → UI mode label. Explain why the API key remains on the backend and why mock text cannot be represented as a live model response.

**Pass:** you can explain provenance and secret boundaries without exposing a real credential.

### O7. Refactoring without changing behavior

**Exercise:** extract a repeated pure formatter from components into a helper module. Add focused tests before and after. Run lint, tests, and build. Avoid unrelated formatting changes.

**Pass:** UI output remains unchanged, tests pass, and you can explain why pure functions are easier to test.

### O8. More feature practice

Choose exactly one after the core path:

- **Latest timestamp card:** display nullable `summary.lastTimestamp` with an intentional fallback.
- **Retry failed trend:** add a request retry without reloading the page, preserving cleanup and correct loading state.
- **12H selection:** add a new supported range across frontend types, runtime guards, Java validation, tests, explanation requests, and UI. Do not modify only the button.

For any choice, state acceptance criteria before changing code; verify them at the relevant boundaries.

---

## 13. Codex teaching contract

Paste the following into a Codex instruction/chat when using this file as the curriculum. This contract is intentionally strict because AI-generated code can bypass the learning step.

```text
You are the interactive tutor for:
docs/learning/Industrial_Trend_Explorer_Frontend_End_to_End_Tutorial_v2.md

The learner understands Java/backend development but has no assumed
frontend knowledge. The goal is independent skill, not fastest code output.

Mandatory behavior:
1. Read this tutorial and the current repository files named in the active
   lesson. The repository is the source of truth when it differs from notes.
2. Teach only ONE lesson or sub-exercise at a time. Start by explaining every
   new term in plain language and connect it to Java only when accurate.
3. State the exact learning goal and acceptance condition. Ask the learner to
   predict before executing. Ask the learner to type the smallest useful edit.
4. Do not auto-implement the full feature, rewrite large files, or skip tests
   unless the learner explicitly changes the tutoring mode.
5. Give progressive help: conceptual hint -> file/function pointer -> small
   snippet -> reference solution only after a sincere attempt and request.
6. Never guess commands, file paths, endpoints, versions, response formats,
   test counts, or runtime state. Inspect current source and actual output.
7. Never print, request, expose, or commit secrets. Do not run destructive
   Git, database-volume, cloud, or production operations for a learning lab.
8. Before any code change, inspect git status and explain the intended diff.
9. Run the narrowest relevant check, then broader checks. Report actual
   PASS, FAIL, or NOT RUN. Never claim tests/deployments were verified if not.
10. End each lesson with a teach-back question and STOP. Continue only when
    the learner has explained the concept and passed the checkpoint.
11. Treat the threshold checker as NEW functionality, not an existing route.
12. Preserve existing dashboard, anomaly calculation, and mock/live labels.

At the start of a session, identify the active lesson, required files,
current Git status, the next single exercise, and its verification.
```

### How to ask Codex for help without surrendering the lesson

**Good:** "I'm on Lesson 10B. Explain why an empty HTML number field becomes an empty string and help me predict the result of `Number('')`. Do not change code yet."

**Good:** "Review the three lines I wrote in `checkThreshold`. Point out the first bug and give me a hint, not a complete rewrite."

**Avoid during learning:** "Implement Lessons 10–17, run all tests, and create a PR." That can produce a working application while leaving the essential frontend skills unlearned.

---

## 14. Troubleshooting by layer

When something fails, identify the responsible layer before editing code.

| Symptom | First evidence | Likely starting point |
|---|---|---|
| Vite won't start | Terminal error | Node version, npm install, port conflict |
| Blank page | Browser Console | JSX/import/runtime error |
| Wrong CSS | DevTools Elements → Computed | Stylesheet/class/specificity |
| Submit reloads page | Form handler behavior | Missing `preventDefault` |
| POST never sent | Network + Console | Client validation or handler |
| POST has quoted numbers | Network Request Payload | Sending raw input strings |
| POST 404 | Network URL/status | New Java controller not built/running |
| POST 400 | Request body and backend validation | Invalid/null/string input or overflow |
| POST 500 | Backend stack trace (redact secrets) | Server exception/configuration |
| POST 200 but UI errors | JSON body, `api.ts` guard | Contract mismatch |
| Pending forever | Promise path/test double/Network | Request never settles, pending state |
| Results don't clear | Controlled input onChange | Stale state not invalidated |
| Vitest test fails | First failing assertion | Mock shape, event timing, implementation |
| Build type error | `tsc -b` diagnostic | Incorrect or missing TS type |
| Works in dev, fails in production | Caddy route and deployed image versions | Missing backend update/proxy configuration |

### A reproducible debugging record

Write: **expected behavior → actual behavior → smallest reproduction → Console/Network evidence → owning layer → minimal correction → rerun result**. Avoid changing random configuration knobs until an error disappears.

---

## 15. Glossary and reference map

| Term | Concise meaning |
|---|---|
| DOM | Browser's in-memory tree of the page |
| HTML | Semantic page structure |
| CSS | Rules controlling visual presentation |
| JavaScript | Language executed by the browser |
| TypeScript | Compile-time types layered onto JavaScript |
| JSX / TSX | Syntax for React UI elements; TSX supports TypeScript |
| Node.js | JavaScript runtime used for local tooling |
| npm | Package installer and command runner |
| Vite | Development server and production frontend builder |
| React component | Function describing part of the UI |
| Props | Read-only inputs from a parent component |
| State | Values remembered by a component between renders |
| Hook | React function such as `useState` or `useEffect` |
| Controlled input | Form value driven by React state |
| Derived value | Computed from existing data; generally no extra state needed |
| Callback | Function passed for later invocation |
| Promise | An eventually settled asynchronous result |
| `fetch` | Browser HTTP request API |
| JSON | Serialized data format for requests/responses |
| Runtime guard | Check that actual data satisfies expected shape |
| HTTP 400 | Client request was invalid |
| HTTP 404 | Resource/route not found |
| HTTP 500 | Internal server error |
| Proxy | Server forwarding a request to another server |
| Vitest | Frontend test runner |
| React Testing Library | Test React UI through observable behavior |
| jsdom | DOM simulation used for tests, not a full browser |
| Caddy | Serves compiled frontend and forwards production `/api` calls |

**Quick reference links:** [repository README](../../README.md) · [React documentation](https://react.dev/learn) · [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) · [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) · [MDN HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content) · [MDN CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics) · [MDN fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) · [Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

---
## Appendix A: reference implementation (open only after your own attempt)

The following is a **proposed implementation for the new exercise**, not code already in the GitHub project. It is written to fit the reviewed project's package and frontend patterns. As with all new code, compile and test in the actual repository: **the code below has not been executed against your local project in this document-generation session.**

<details>
<summary><strong>A1. Spring Boot controller: expand after attempting Lesson 13</strong></summary>

Create `backend/src/main/java/com/flyinnegg/industrialtrend/sensor/ThresholdCheckController.java`:

```java
package com.flyinnegg.industrialtrend.sensor;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/threshold-check")
public class ThresholdCheckController {

    public record ThresholdCheckResponse(boolean aboveThreshold, double difference) {}

    @PostMapping
    public ThresholdCheckResponse check(@RequestBody Map<String, Object> body) {
        if (body == null
                || !(body.get("value") instanceof Number valueNumber)
                || !(body.get("threshold") instanceof Number thresholdNumber)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "value and threshold must be JSON numbers");
        }

        double value = valueNumber.doubleValue();
        double threshold = thresholdNumber.doubleValue();
        double difference = value - threshold;

        if (!Double.isFinite(value)
                || !Double.isFinite(threshold)
                || !Double.isFinite(difference)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "value and threshold must produce a finite result");
        }

        return new ThresholdCheckResponse(value > threshold, difference);
    }
}
```

**Why a map rather than a `record(double value, double threshold)`?** Primitive doubles can silently receive default values for missing properties depending on binding configuration, and numeric strings may be coerced to numbers. This exercise explicitly rejects missing, null, and quoted numeric values. `Map<String, Object>` is acceptable for this tiny lesson; larger production APIs would normally use explicit DTOs with deliberate validation/deserialization rules.

**Why check the difference?** Even if both numbers are finite, subtracting extremely large numbers can overflow to infinity.

</details>

<details>
<summary><strong>A2. Java controller tests: expand after attempting Lesson 13D</strong></summary>

Create `backend/src/test/java/com/flyinnegg/industrialtrend/sensor/ThresholdCheckControllerTests.java`:

```java
package com.flyinnegg.industrialtrend.sensor;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class ThresholdCheckControllerTests {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(
                new ThresholdCheckController()).build();
    }

    @Test
    void returnsTrueAndDifferenceWhenValueExceedsThreshold() throws Exception {
        mockMvc.perform(post("/api/threshold-check")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"value\":86,\"threshold\":80}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.aboveThreshold").value(true))
                .andExpect(jsonPath("$.difference").value(6.0));
    }

    @Test
    void equalNumbersAreNotAboveThreshold() throws Exception {
        mockMvc.perform(post("/api/threshold-check")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"value\":80,\"threshold\":80}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.aboveThreshold").value(false))
                .andExpect(jsonPath("$.difference").value(0.0));
    }

    @Test
    void rejectsNullInput() throws Exception {
        mockMvc.perform(post("/api/threshold-check")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"value\":null,\"threshold\":80}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void rejectsNumericString() throws Exception {
        mockMvc.perform(post("/api/threshold-check")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"value\":\"86\",\"threshold\":80}"))
                .andExpect(status().isBadRequest());
    }
}
```

The test uses the same standalone MockMvc approach as the existing `SensorControllerTests`. Add cases for missing input and a value below threshold if you want to strengthen the suite.

</details>

<details>
<summary><strong>A3. Frontend types and API wrapper: expand after attempting Lesson 14</strong></summary>

Append these types to `frontend/src/types.ts`:

```ts
export type ThresholdCheckRequest = {
  value: number;
  threshold: number;
};

export type ThresholdCheckResponse = {
  aboveThreshold: boolean;
  difference: number;
};
```

Extend the type-only import at the start of `frontend/src/api.ts` to include `ThresholdCheckRequest` and `ThresholdCheckResponse`, then append:

```ts
function isThresholdCheckResponse(value: unknown): value is ThresholdCheckResponse {
  return isObject(value)
    && typeof value.aboveThreshold === 'boolean'
    && isFiniteNumber(value.difference);
}

export async function checkThreshold(
  request: ThresholdCheckRequest,
): Promise<ThresholdCheckResponse> {
  const response = await fetch('/api/threshold-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const data = await requireSuccessfulJson(response);
  if (!isThresholdCheckResponse(data)) {
    throw new Error('Invalid threshold-check response');
  }
  return data;
}
```

`isObject`, `isFiniteNumber`, and `requireSuccessfulJson` are **existing functions** in the reviewed `api.ts`. Reuse them rather than duplicate them. If their names change in the repository, inspect the current equivalents.

</details>

<details>
<summary><strong>A4. React component: expand after attempting Lesson 15</strong></summary>

Create `frontend/src/components/ThresholdChecker.tsx`:

```tsx
import { useState, type FormEvent } from 'react';
import { checkThreshold } from '../api';
import type { ThresholdCheckResponse } from '../types';

export function ThresholdChecker() {
  const [valueText, setValueText] = useState('86');
  const [thresholdText, setThresholdText] = useState('80');
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ThresholdCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function changeValue(next: string) {
    setValueText(next);
    setResult(null);
    setError(null);
  }

  function changeThreshold(next: string) {
    setThresholdText(next);
    setResult(null);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const value = Number(valueText);
    const threshold = Number(thresholdText);

    if (valueText.trim() === '' || thresholdText.trim() === ''
        || !Number.isFinite(value) || !Number.isFinite(threshold)
        || !Number.isFinite(value - threshold)) {
      setResult(null);
      setError('Enter two valid numbers.');
      return;
    }

    setPending(true);
    setError(null);
    setResult(null);
    try {
      setResult(await checkThreshold({ value, threshold }));
    } catch {
      setError('Unable to check threshold.');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="panel threshold-checker" aria-labelledby="threshold-heading">
      <h2 id="threshold-heading">Threshold checker</h2>
      <p>Compare a custom reading with a custom threshold using Java.</p>
      <form className="threshold-checker-form" onSubmit={event => void handleSubmit(event)}>
        <div className="threshold-checker-fields">
          <label htmlFor="threshold-reading">
            Reading
            <input id="threshold-reading" type="number" step="any"
              value={valueText} disabled={pending}
              onChange={event => changeValue(event.target.value)} />
          </label>
          <label htmlFor="threshold-limit">
            Threshold
            <input id="threshold-limit" type="number" step="any"
              value={thresholdText} disabled={pending}
              onChange={event => changeThreshold(event.target.value)} />
          </label>
        </div>
        <button type="submit" disabled={pending}>
          {pending ? 'Checking...' : 'Check threshold'}
        </button>
      </form>
      {pending && <p role="status">Checking...</p>}
      {error && <p role="alert">{error}</p>}
      {result && (
        <p role="status">
          {result.aboveThreshold ? 'Above threshold' : 'Within threshold'}.
          {' '}Difference: {result.difference}
        </p>
      )}
    </section>
  );
}
```

In `frontend/src/App.tsx`, add:

```tsx
import { ThresholdChecker } from './components/ThresholdChecker';
```

Within the existing `<main className="dashboard-content">`, render it **outside** the conditional dependent on successful sensor loading, for example immediately before `</main>`:

```tsx
<ThresholdChecker />
```

This ensures it remains usable if the existing trend API has an unrelated problem. Do not nest it inside another `<form>`.

Add these conservative layout rules near the bottom of `frontend/src/index.css`:

```css
.threshold-checker {
  display: grid;
  gap: 1rem;
}

.threshold-checker-form {
  display: grid;
  gap: 1rem;
}

.threshold-checker-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: 1rem;
}

.threshold-checker-fields label {
  display: grid;
  gap: 0.4rem;
}

.threshold-checker-fields input {
  width: 100%;
  min-width: 0;
  padding: 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 0.4rem;
}

.threshold-checker-fields input:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

.threshold-checker-form button {
  min-height: 44px;
  justify-self: start;
}
```

These rules are intentionally small, but still inspect the live design to ensure they work with your existing global styles and tokens. If CSS variables have been renamed, use the current names instead of introducing an accidental invalid declaration.

**Concurrency note:** this reference disables inputs while the POST is pending. Therefore there is no in-flight input edit that would render an old request result against new editable values. For a design that allows editing while pending, introduce an explicit request identity/cancellation strategy rather than relying only on clearing the display.

</details>

<details>
<summary><strong>A5. Focused frontend tests: expand after attempting Lesson 16</strong></summary>

Example tests for `frontend/src/components/ThresholdChecker.test.tsx`:

```tsx
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { checkThreshold } from '../api';
import { ThresholdChecker } from './ThresholdChecker';

vi.mock('../api', () => ({ checkThreshold: vi.fn() }));

beforeEach(() => vi.resetAllMocks());
afterEach(cleanup);

it('submits numeric JSON values and displays the response', async () => {
  vi.mocked(checkThreshold).mockResolvedValue({ aboveThreshold: true, difference: 6 });
  const user = userEvent.setup();
  render(<ThresholdChecker />);

  const valueInput = screen.getByRole('spinbutton', { name: 'Reading' });
  const thresholdInput = screen.getByRole('spinbutton', { name: 'Threshold' });
  await user.clear(valueInput);
  await user.type(valueInput, '86');
  await user.clear(thresholdInput);
  await user.type(thresholdInput, '80');
  await user.click(screen.getByRole('button', { name: 'Check threshold' }));

  expect(checkThreshold).toHaveBeenCalledWith({ value: 86, threshold: 80 });
  expect(await screen.findByText(/Above threshold\. Difference: 6/)).toBeTruthy();
});

it('does not send empty input to the server', async () => {
  const user = userEvent.setup();
  render(<ThresholdChecker />);
  await user.clear(screen.getByRole('spinbutton', { name: 'Reading' }));
  await user.click(screen.getByRole('button', { name: 'Check threshold' }));

  expect(screen.getByRole('alert').textContent).toBe('Enter two valid numbers.');
  expect(checkThreshold).not.toHaveBeenCalled();
});

it('shows a friendly error when the request fails', async () => {
  vi.mocked(checkThreshold).mockRejectedValue(new Error('network unavailable'));
  const user = userEvent.setup();
  render(<ThresholdChecker />);
  await user.click(screen.getByRole('button', { name: 'Check threshold' }));

  expect((await screen.findByRole('alert')).textContent)
    .toBe('Unable to check threshold.');
});
```

**Important:** existing `App.test.tsx` mocks the `./api` module. If you import the newly created `ThresholdChecker` inside `App`, add `checkThreshold: vi.fn()` to the `vi.mock('./api', ...)` factory in `App.test.tsx` as well. Otherwise the test's mocked module can lack the new export, even though a standalone `ThresholdChecker` test passes.

For the API wrapper itself, verify the actual request options separately. A small example of the core assertion is:

```ts
expect(fetch).toHaveBeenCalledWith('/api/threshold-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ value: 86, threshold: 80 }),
});
```

A complete API wrapper test must stub global `fetch`, await `checkThreshold`, and restore the stub after the test. See existing `frontend/src/api.test.ts` for the project's current mocking approach.

</details>

---

## Appendix B: assessment rubric

**Evaluate what you can demonstrate, not how many paragraphs you read.**

| Skill | Not yet | Working foundation | Independent |
|---|---|---|---|
| HTML/CSS | Cannot identify elements/styles | Modifies a page with guidance | Builds a labeled responsive form |
| JavaScript | Confuses values/functions | Writes conditions and array operations | Writes/test pure functions alone |
| TypeScript | Types are opaque | Defines interfaces/types, fixes errors | Models APIs without unsafe casts |
| React | Only reads JSX | Builds components and state with cues | Builds a form from an empty component |
| Async/HTTP | Treats Promise as result | Handles POST and errors | Diagnoses network, HTTP, and contract failures |
| Full-stack flow | Cannot find owner | Traces controller/UI with help | Owns one complete request/response path |
| Tests | Runs scripts only | Adds behavioral tests with support | Independently tests success, failure, invalid cases |
| Accessibility | Mouse-only | Labeled inputs/focus/status messages | Verifies keyboard/error/loading flows |
| Debugging | Random edits | Uses Console/Network/logs | Isolates layer and proves fix |
| Delivery | Confuses dev/build | Explains assets and proxy | Verifies both images/contracts in intended environment |

### Final delivery checklist

- [ ] I can explain the core browser/Java architecture.
- [ ] I can write a typed controlled React form without copying a full solution.
- [ ] I can send a JSON body to Spring Boot and validate the JSON response.
- [ ] I can distinguish strict `>` from `>=`, including equality.
- [ ] I can handle blank input, HTTP 400, network failure, and malformed response.
- [ ] I can verify the outcome using Network and automated tests.
- [ ] Existing dashboard behavior still works.
- [ ] My working tree contains only intended changes; no secrets or generated artifacts.
- [ ] I have recorded actual PASS/FAIL/NOT RUN results.
- [ ] I can describe the feature and its limits accurately in a technical interview.

---

*End of Tutorial v2.0. The next step is Lesson 01, not copying Appendix A into the repository. The aim is to turn an existing AI-assisted project into durable engineering skill.*
