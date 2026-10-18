# Industrial Trend Explorer

**A full-stack sensor dashboard for exploring trends, anomaly readings, and on-demand explanations.**

**Keywords:** Java · Spring Boot · REST API · PostgreSQL · React · TypeScript · Recharts · Gemini API · LLM integration · data visualization

## Project author

[GitHub: @mrrrxiii](https://github.com/mrrrxiii) · [LinkedIn](https://www.linkedin.com/in/leikong-ottawa/)

![Full-page screenshot of the Industrial Trend Explorer dashboard](docs/screenshots/dashboard-full-page.png)

*The dashboard uses synthetic sample data; it is not connected to live industrial equipment.*

## Overview

Choose a sensor to see its 24-hour trend, normal operating range, summary statistics, and readings flagged as anomalies. Request an explanation only when needed.

- **Two sensors:** Reactor Temperature and Pump Pressure
- **Analytics:** Java calculates summary statistics and flags anomalies
- **Visualization:** React, TypeScript, and Recharts
- **Storage and API:** PostgreSQL and Spring Boot REST endpoints
- **Explanations:** Deterministic mock by default; optional Gemini integration

## How it works

**Dashboard → Spring Boot API → PostgreSQL**

Java returns sensor readings and calculated summaries to the dashboard. The optional explanation request is sent only when a user clicks the button. The API key, when Gemini is enabled, stays on the backend.

## Run locally

Start PostgreSQL and load the sample data from the project root:

```bash
docker compose up -d db
docker compose exec -T db psql -U app -d industrial_trends < db/schema.sql
docker compose exec -T db psql -U app -d industrial_trends < db/seed.sql
```

Start the backend in a separate terminal:

```bash
cd backend
./mvnw spring-boot:run
```

Start the frontend in another terminal at the project root:

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Optional Gemini mode

Mock mode is the default. For live explanations, configure `LLM_MODE=live`, `GOOGLE_API_KEY`, and `GEMINI_MODEL` in the **backend process environment only**. Never put the key in frontend code or commit it. The interface labels responses `MOCK — NOT AI` or `LIVE AI`.

A real Gemini request was verified with HTTP `200` and a non-empty response. Model access and quotas can change; explanations are informational and are not operational guidance.

## Verification

| Check | Result |
| --- | --- |
| Backend tests | 7 passed |
| Frontend tests | 9 passed |
| Frontend lint and production build | Passed |
| Seeded API data | 2 sensors, 48 readings and 2 anomalies per sensor |
| Responsive page | Checked at 375, 768, and desktop widths |

Run the checks with:

```bash
cd backend && ./mvnw test
cd ..
npm --prefix frontend run lint
npm --prefix frontend test
npm --prefix frontend run build
```

## Scope

This is a portfolio and learning demo built with synthetic data. It is not a production monitoring system, a safety system, or a connection to real sensors.
