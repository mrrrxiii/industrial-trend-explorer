#!/usr/bin/env node

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/production-smoke-test.mjs https://your-domain.example');
  process.exit(2);
}

let baseUrl;
try {
  baseUrl = new URL(input);
  if (
    baseUrl.protocol !== 'https:'
    || baseUrl.username
    || baseUrl.password
    || baseUrl.pathname !== '/'
    || baseUrl.search
    || baseUrl.hash
  ) {
    throw new Error('Use an HTTPS site origin with no path, query, or credentials.');
  }
} catch (error) {
  console.error(`Invalid site URL: ${error.message}`);
  process.exit(2);
}

const checks = [];
const expectedSensors = {
  'pump-pressure': {
    name: 'Pump Pressure',
    unit: 'bar',
    normalMin: 2,
    normalMax: 5,
    seededValue: 5.9,
  },
  'reactor-temp': {
    name: 'Reactor Temperature',
    unit: '°C',
    normalMin: 60,
    normalMax: 80,
    seededValue: 88,
  },
};

function record(status, name, detail) {
  checks.push(status);
  console.log(`${status} - ${name}${detail ? `: ${detail}` : ''}`);
}

async function check(name, action) {
  try {
    const detail = await action();
    record('PASS', name, detail);
    return true;
  } catch (error) {
    record('FAIL', name, error.message);
    return false;
  }
}

async function get(url) {
  return fetch(url, { signal: AbortSignal.timeout(20_000) });
}

function isExpectedSensor(sensor, id) {
  const expected = expectedSensors[id];
  return sensor
    && sensor.id === id
    && sensor.name === expected.name
    && sensor.unit === expected.unit
    && sensor.normalMin === expected.normalMin
    && sensor.normalMax === expected.normalMax;
}

let pageUrl = baseUrl;
let pageHtml = '';
const pageResponseOk = await check('Public HTTPS and trusted TLS', async () => {
  const response = await get(baseUrl);
  pageUrl = new URL(response.url);
  if (pageUrl.protocol !== 'https:') throw new Error('The final page URL is not HTTPS.');
  if (!response.ok) throw new Error(`Homepage returned HTTP ${response.status}.`);
  return `HTTP ${response.status}; Node verified the certificate using its default trust store`;
});

const htmlOk = await check('Frontend HTML', async () => {
  if (!pageResponseOk) throw new Error('Not checked because the HTTPS page request failed.');
  const response = await get(baseUrl);
  if (!response.ok) throw new Error(`Homepage returned HTTP ${response.status}.`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) throw new Error(`Unexpected content type: ${contentType || 'missing'}.`);
  pageHtml = await response.text();
  if (!pageHtml.includes('id="root"')) throw new Error('The HTML has no application root element.');
  if (!pageHtml.includes('assets/')) throw new Error('No built frontend asset references were found.');
  return `HTTP ${response.status}; application root and built assets referenced`;
});

function referencedAssets(tagName, attribute, html) {
  const tagPattern = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  const attributePattern = new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'i');
  return [...html.matchAll(tagPattern)]
    .map(match => match[0].match(attributePattern)?.[2])
    .filter(Boolean);
}

async function checkAssets(label, assetPaths) {
  if (!htmlOk) throw new Error('Not checked because the frontend HTML check failed.');
  if (assetPaths.length === 0) throw new Error(`No ${label} asset reference found in the HTML.`);

  const checked = [];
  for (const assetPath of assetPaths) {
    const assetUrl = new URL(assetPath, pageUrl);
    if (assetUrl.origin !== pageUrl.origin) {
      throw new Error(`Refusing to request off-site ${label} asset.`);
    }
    const response = await get(assetUrl);
    if (!response.ok) throw new Error(`${assetUrl.pathname} returned HTTP ${response.status}.`);
    if (new URL(response.url).origin !== pageUrl.origin) {
      throw new Error(`${assetUrl.pathname} redirected to another origin.`);
    }
    if (!(await response.arrayBuffer()).byteLength) {
      throw new Error(`${assetUrl.pathname} was empty.`);
    }
    checked.push(assetUrl.pathname);
  }
  return `${checked.length} asset(s) returned successfully`;
}

const scripts = referencedAssets('script', 'src', pageHtml);
const stylesheets = referencedAssets('link', 'href', pageHtml)
  .filter(assetPath => new URL(assetPath, pageUrl).pathname.endsWith('.css'));

await check('Frontend JavaScript assets', () => checkAssets('JavaScript', scripts));
await check('Frontend CSS assets', () => checkAssets('CSS', stylesheets));

let sensors;
const sensorsOk = await check('Both expected sensors', async () => {
  const response = await get(new URL('/api/sensors', baseUrl));
  if (!response.ok) throw new Error(`/api/sensors returned HTTP ${response.status}.`);
  sensors = await response.json();
  if (!Array.isArray(sensors)) throw new Error('The sensors response was not an array.');

  const missing = Object.keys(expectedSensors).filter(id =>
    !sensors.some(sensor => isExpectedSensor(sensor, id)),
  );
  if (missing.length) throw new Error(`Expected sensor records missing or incorrect: ${missing.join(', ')}.`);
  return 'Pump Pressure and Reactor Temperature names, units, and normal ranges match';
});

const seededValuesFound = {};
if (sensorsOk) {
  for (const [sensorId, expected] of Object.entries(expectedSensors)) {
    for (const hours of [1, 6, 24]) {
      let responseData;
      const trendOk = await check(`${sensorId} ${hours}H trend`, async () => {
        const url = new URL(`/api/sensors/${encodeURIComponent(sensorId)}/trend`, baseUrl);
        url.searchParams.set('hours', String(hours));
        const response = await get(url);
        if (!response.ok) throw new Error(`Trend request returned HTTP ${response.status}.`);
        responseData = await response.json();

        const { sensor, readings, summary } = responseData ?? {};
        if (!isExpectedSensor(sensor, sensorId)) throw new Error('The trend returned the wrong sensor data.');
        if (responseData.hours !== hours) throw new Error(`Response hours was ${responseData.hours}.`);
        if (!Array.isArray(readings) || readings.length === 0) throw new Error('No readings were returned.');
        if (!summary || summary.count !== readings.length) {
          throw new Error('Summary count does not match the returned readings.');
        }
        if (!readings.every(reading =>
          typeof reading.timestamp === 'string'
          && Number.isFinite(reading.value)
          && typeof reading.anomaly === 'boolean',
        )) {
          throw new Error('One or more readings have an invalid shape.');
        }
        return `${readings.length} readings; response confirms ${hours} hours`;
      });

      if (trendOk && hours === 24) {
        seededValuesFound[sensorId] = responseData.readings.some(
          reading => reading.value === expected.seededValue && reading.anomaly === true,
        );
      }
    }
  }
} else {
  for (const sensorId of Object.keys(expectedSensors)) {
    for (const hours of [1, 6, 24]) {
      record('NOT TESTED', `${sensorId} ${hours}H trend`, 'sensor catalog check failed');
    }
  }
}

for (const [sensorId, expected] of Object.entries(expectedSensors)) {
  if (!sensorsOk) {
    record('NOT TESTED', `${sensorId} seeded database reading`, 'sensor catalog check failed');
  } else if (seededValuesFound[sensorId] === undefined) {
    record('NOT TESTED', `${sensorId} seeded database reading`, '24H trend was not verified');
  } else if (seededValuesFound[sensorId]) {
    record('PASS', `${sensorId} seeded database reading`, `found expected anomaly value ${expected.seededValue}`);
  } else {
    record('FAIL', `${sensorId} seeded database reading`, `expected anomaly value ${expected.seededValue} not found in 24H trend`);
  }
}

await check('Unsupported hours=2 returns HTTP 400', async () => {
  const url = new URL('/api/sensors/pump-pressure/trend', baseUrl);
  url.searchParams.set('hours', '2');
  const response = await get(url);
  if (response.status !== 400) throw new Error(`Expected HTTP 400, received HTTP ${response.status}.`);
  return 'HTTP 400';
});

record('NOT TESTED', 'Mobile browser responsiveness', 'use the manual checklist');
record('NOT TESTED', 'AI explanation displays MOCK — NOT AI', 'not requested; may invoke an external provider');
record('NOT TESTED', 'Browser refresh and interactive controls', 'use the manual checklist');
record('NOT TESTED', 'Seeded data survives container restart', 'requires a planned restart; this script does not restart services');
record('NOT TESTED', 'No secrets exposed in public assets or repository', 'use the manual checklist; no secret values are read or printed');

const passed = checks.filter(status => status === 'PASS').length;
const failed = checks.filter(status => status === 'FAIL').length;
const notTested = checks.filter(status => status === 'NOT TESTED').length;
console.log(`\nResults: ${passed} PASS, ${failed} FAIL, ${notTested} NOT TESTED`);
if (failed) process.exitCode = 1;
