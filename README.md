# Industrial Trend Explorer

A learning project that displays synthetic industrial sensor trends through a React and TypeScript frontend, a Spring Boot API, and PostgreSQL.

## Current verification status

- The frontend, Java API, and PostgreSQL data path have been exercised locally.
- The deterministic explanation provider is the default and has been verified. Its response is labeled **MOCK — NOT AI**.
- Gemini live mode is **VERIFIED** with `gemini-3.8-flash`: a real click-triggered POST returned HTTP 200 with `mode: "LIVE"`, the selected sensor ID, and non-empty generated text. Two earlier attempts returned HTTP 502; one revealed that the SDK's `outputText()` accessor was empty. The provider now falls back to extracting text from typed model-output steps, covered by unit tests.
- All readings are synthetic. This is a learning demo, not an operational industrial monitoring system.

## Requirements

Versions used for the current build:

- Node.js 24.22.0 and npm 11.19.1
- Java 25 (the backend Maven project targets Java 25)
- Docker with the Compose plugin

PostgreSQL 17 runs in Docker Compose. Ports used locally are PostgreSQL `55432`, Spring Boot `8080`, and Vite `5173`.

## Start the application

Run these commands from the repository root.

### 1. Start PostgreSQL and load the sample data

```bash
docker compose up -d db
docker compose exec -T db psql -U app -d industrial_trends < db/schema.sql
docker compose exec -T db psql -U app -d industrial_trends < db/seed.sql
```

The seed is repeatable: it creates two sensors with 48 half-hour readings each, without duplicating existing rows.

### 2. Start the Java API

In a separate terminal:

```bash
cd backend
./mvnw spring-boot:run
```

The API uses local database defaults from `backend/src/main/resources/application.properties`. Do not place credentials in source control.

### 3. Start the React frontend

In another terminal:

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`). Vite proxies `/api` requests to the Java server on port `8080`.

## API routes

- `GET /api/health` — health check
- `GET /api/sensors` — available sensors
- `GET /api/sensors/{sensorId}/trend` — readings and Java-calculated summary
- `POST /api/sensors/{sensorId}/explanation` — explanation from the configured provider; this endpoint is called only after clicking **Explain with AI**

Unknown sensor IDs return HTTP 404. Java calculates the statistics and anomalies; the explanation provider does not determine those facts.

## Explanation providers and credentials

The default is mock mode (`LLM_MODE` unset or `mock`). Mock responses are deterministic and explicitly labeled **MOCK — NOT AI**.

Optional Gemini live mode uses these backend-only environment variables:

- `LLM_MODE=live`
- `GOOGLE_API_KEY` — secret; keep it out of React, browser requests, source files, screenshots, and Git
- `GEMINI_MODEL` — a text model ID available to the Google AI Studio project

Do not put a real key in `.env.example` or commit it. Follow the guide's private-input steps when setting up a local key. A successful live integration requires an actual response with `mode: "LIVE"`; compilation, mock output, and quota visibility do not prove it. Google AI Studio access, limits, and data-use terms can change. Use only this project's synthetic readings.

## Tests and production build

Run backend tests:

```bash
cd backend
./mvnw test
```

Run the selector behavior test:

```bash
npm --prefix frontend test
```

Build the frontend:

```bash
npm --prefix frontend run build
```

The current checks passed: seven backend tests, one frontend behavior test, and the TypeScript/Vite production build. Vite reports a bundle-size warning because the generated JavaScript chunk exceeds 500 kB; the build still succeeds.

## Stop the application

- Press Ctrl+C in the frontend and backend terminals.
- Stop PostgreSQL from the repository root with `docker compose down`.

## Project notes

- PostgreSQL uses the repository's `db/schema.sql` and `db/seed.sql`.
- The selector test checks user-observable behavior: choosing Pump Pressure calls the parent callback with `pump-pressure`.
- Gemini live was verified with one successful response after two failed attempts. The backend logs only safe provider status/category metadata and extracts text from typed model-output steps when needed; it does not log the key, prompt, or raw provider error.
- This demo does not include production authentication, cost controls, monitoring, real sensor connectivity, or industrial safety controls.
