day 1:

 basic htlm and react code, and react project built by vite

 runs on vite server, borwser run react and render the page

verified the html css can change, how button click work, react how to change the content, and build with npm comment: npm --prefix frontend run build

day 2:
learning basic typescript and react code.
export import 
how define type and function
create dropdown list
Sensor describes a sensor object at TypeScript build time, while Props describes the inputs passed to SensorDetails; and you verified that both sensor options appeared and npm --prefix frontend run build passed

day 3;
I learn react states and derived data
demoData.ts through app to chart and summary
verify the chart and summary data when selecting sensor

day 4:
learned creating docker compose file and configure postgresql
desgin controller and service and repo to implement get method
verified seed file , get api, 404 behavior and unit test
data is fetch from postgresql to sensorrepository then service then controller then response

day 5.3:
requireSuccessfulJson checks HTTP success and parses the response; runtime guards such as isTrendResponse then check the JSON’s shape and field types
path from vite is localhost:5173/api/*** and proxy foward to localhost:8080
verified the api works from onsole result 2 sensors, 48 readings, 2 anomalies plus the successful build

day 5.4
how effect take controll when dropdown list is selected which trigger the api proxy - java/db - and after reponse to vite, validate the reponse and set trend and states. based on the states value, render the chart

day 5.5
stale response can misleading the data showing and cleanup/AbortController stop old request when send the new request to ensure always show latest result on latest selection.
after quickly swithc, chart and summary always match the dropdown selctions

Day 6.1–6.3:
java get the facts and prompt is based on the java class summary with instructions specified. use a mock as configurated  and verified the response in test also with unknow sensor

day 6.4:
optional Java-side Gemini provider uses GOOGLE_API_KEY and GEMINI_MODEL; mock remains default. Created a private AI Studio key and confirmed nonzero quota for Gemini 2.5 Flash and 3.8 Flash. The 2.5 Flash request returned HTTP 502 before safe provider diagnostics existed. A 3.8 Flash request returned an interaction, but the SDK's `outputText()` accessor was empty and the app returned HTTP 502. Added safe status/step-type logging and a tested fallback that extracts text from typed model-output steps. Two local provider tests and all seven backend tests pass. The successful live verification is recorded under Day 7.4. The key stayed out of the browser and chat; production still needs usage/cost limits.

Day 6.5
the click-only POST, visible mock label, clearing on sensor change, and plain-text rendering for untrusted model output; live Gemini was not yet verified at this point.

Day 7.1:
Added `SensorSelector.test.tsx` with Vitest and React Testing Library. Selecting Pump Pressure calls the parent callback with `pump-pressure`. The test passed, and the frontend production build passed.

Day 7.2:
Both sensors returned 48 chronological readings with the expected units, averages (reactor ~70.6667 °C; pump 3.59375 bar), and 2 anomalies each. An unknown sensor returned HTTP 404. In mock mode, page load and sensor selection made GET requests only; one button click returned HTTP 200 with `mode: "MOCK"` and the visible `MOCK — NOT AI` label. Switching sensors cleared the prior explanation and made only a trend GET. D5 loading/error/recovery and stale-request cancellation checks had already passed. Two initial live attempts returned HTTP 502; the successful live verification is recorded under Day 7.4.

Day 7.3:
Created the root `README.md` and a names-only `.env.example`. Followed the startup steps from fresh terminals: Spring started in mock mode, Vite loaded the sensor page, and the PostgreSQL schema/seed steps ran twice without duplicates (48 readings per sensor).

Day 7.4:
After adding the typed output-step fallback, one real click-triggered request using `gemini-3.8-flash` returned HTTP 200 with `mode: "LIVE"`, the selected `pump-pressure` sensor ID, and non-empty generated text consistent with Java's summary. The UI displayed `LIVE AI`. Gemini live integration is now verified; the backend remains running in live mode at the user's request.

Portfolio positioning: five years of Java backend experience, with this project as an additional hands-on example of frontend (React/TypeScript) and server-side LLM (Gemini) skills. Describe it as a small synthetic-data demo, not production-scale industrial or professional Seeq experience.

D7.4 teach-back: explained the backend/frontend summary responsibilities, Node/npm, Vite/React, compile-time and runtime validation, props/callbacks, effect versus click-triggered requests, stale-request cancellation, the API/database path, mock versus live credentials, and the changes needed for large datasets/streaming.

Day 8.4:
The trend chart already had sensor-specific normal-range shading and limit lines, time-only axis labels, red markers driven by Java anomaly flags, and a tooltip with UTC timestamp, value/unit, and anomaly state. Browser inspection found the chart canvas had zero height, preventing Recharts from drawing its plot. Added a responsive chart height plus restrained legend and tooltip styling. Verified both sensors render a chart with their correct units/ranges and exactly two outlier markers above the normal band; switching sensors updates labels and limits. Hovering an outlier displayed the expected timestamp/value/status tooltip. Frontend tests and production build pass. Teach-back: use backend-provided anomaly flags to keep Java as the single source of truth and avoid duplicated threshold logic.

Day 8.5:
Replaced the anomaly list with an accessible table showing UTC time, reading/unit, and the sensor's normal range; each seeded sensor shows two rows, and the empty state is retained. Placed the table next to an AI explanation panel with on-demand context, explicit LIVE/MOCK provenance, pending and error states, and plain-text output. Browser checks confirmed sensor switching updates the two anomaly rows and does not trigger an explanation request. Added tests for the table, empty state, click-only AI call, plain-text rendering, pending status, provider label, and error state. All seven frontend tests and production build pass.

Day 8.6:
Verified responsive layouts at 375, 768, and desktop widths with no horizontal page overflow; the anomaly and AI panels stack on mobile and sit side-by-side at wider widths. Keyboard Tab reaches the sensor selector, the user confirmed arrow-key sensor selection, and a test verifies Enter activates the AI button. All nine frontend tests and frontend lint pass. Loading, empty, and error states remain visible, with errors announced as alerts.

Day 8.7:
Regression checks passed: frontend lint, all nine frontend tests, TypeScript/Vite production build, and all seven backend tests. The build reports a non-blocking generated-chunk advisory above 500 kB. API verification returned two sensors, 48 readings and two anomalies per sensor with the expected units/ranges; an unknown sensor returned 404. The README now describes the responsive accessible dashboard and reports these observed verification results. No Git commit was made because this workspace is not a Git repository.
