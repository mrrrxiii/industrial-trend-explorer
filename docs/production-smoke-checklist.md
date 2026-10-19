# Production demo smoke test

Run the public, read-only checks after a deployment:

```bash
node scripts/production-smoke-test.mjs https://industrial-trend-explorer.duckdns.org
```

The script uses Node's built-in `fetch`; it needs no npm packages. It checks HTTPS with normal certificate validation, the page and its built JavaScript/CSS assets, both expected database-backed sensors, each supported trend range, known seeded anomaly readings, and the unsupported-range HTTP 400 response. Any failed automated check makes the command exit unsuccessfully. `NOT TESTED` items are reminders for manual checks.

## Initial run results

On 2026-10-18, the public URL's automated checks reported **14 PASS, 0 FAIL, 5 NOT TESTED**. A browser check at a 390 × 844 viewport had no horizontal overflow (375 px document width); switching sensors and time ranges displayed the expected reading counts, and refreshing returned the Dashboard to Pump Pressure at 24H. The explanation action, persistence through a container restart, and secret-exposure review were not performed.

## Manual checks

- [ ] **Mobile layout:** Open the HTTPS site in a mobile browser or a 390 × 844 browser viewport. Confirm the sensor selector, range buttons, chart, and anomaly list are usable without horizontal page scrolling.
- [ ] **Mock explanation:** Only if you already know privately that the deployment is configured for mock mode, click **Explain with AI** and confirm the result says **MOCK — NOT AI**. Do not reveal or paste environment values. If the mode is uncertain, skip this check rather than risk calling a live provider.
- [ ] **Refresh and controls:** Refresh the page. Confirm the Dashboard loads again, then select both sensors and 1H, 6H, and 24H. Confirm the displayed summary and chart update.
- [ ] **Database persistence after restart:** Do not restart containers solely for this check. During an already planned maintenance/restart, rerun the smoke test and confirm the seeded readings remain. Never remove Docker volumes.
- [ ] **Secret exposure:** Review the public page source, loaded JavaScript/CSS, and repository for accidental credentials or private environment files. Do not print, paste, or commit secret values. The production `.env` belongs only on the server and must remain untracked.

Mark each manual item **PASS**, **FAIL**, or **NOT TESTED** in your deployment notes. A skipped check is not a pass.
