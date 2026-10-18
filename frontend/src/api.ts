import type { Explanation, Reading, Sensor, Summary, TimeRangeHours, TrendResponse } from './types';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isNullableNumber(value: unknown): value is number | null {
  return value === null || isFiniteNumber(value);
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isTimeRangeHours(value: unknown): value is TimeRangeHours {
  return value === 1 || value === 6 || value === 24;
}

function isSensor(value: unknown): value is Sensor {
  return isObject(value)
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && typeof value.unit === 'string'
    && isFiniteNumber(value.normalMin)
    && isFiniteNumber(value.normalMax);
}

function isReading(value: unknown): value is Reading {
  return isObject(value)
    && typeof value.timestamp === 'string'
    && isFiniteNumber(value.value)
    && typeof value.anomaly === 'boolean';
}

function isSummary(value: unknown): value is Summary {
  return isObject(value)
    && Number.isInteger(value.count)
    && isNullableNumber(value.min)
    && isNullableNumber(value.max)
    && isNullableNumber(value.avg)
    && Number.isInteger(value.anomalyCount)
    && isNullableString(value.firstTimestamp)
    && isNullableString(value.lastTimestamp);
}

function isTrendResponse(value: unknown, expectedHours: TimeRangeHours): value is TrendResponse {
  return isObject(value)
    && isSensor(value.sensor)
    && Array.isArray(value.readings)
    && value.readings.every(isReading)
    && isSummary(value.summary)
    && isTimeRangeHours(value.hours)
    && value.hours === expectedHours;
}

async function requireSuccessfulJson(response: Response): Promise<unknown> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function getSensors(): Promise<Sensor[]> {
  const response = await fetch('/api/sensors');
  const data = await requireSuccessfulJson(response);

  if (!Array.isArray(data) || !data.every(isSensor)) {
    throw new Error('Invalid sensors response');
  }
  return data;
}

export async function getTrend(
  id: string,
  hours: TimeRangeHours,
  signal: AbortSignal,
): Promise<TrendResponse> {
  const response = await fetch(
    `/api/sensors/${encodeURIComponent(id)}/trend?hours=${hours}`,
    { signal },
  );
  const data = await requireSuccessfulJson(response);

  if (!isTrendResponse(data, hours)) {
    throw new Error('Invalid trend response');
  }
  return data;
}

function isExplanation(value: unknown): value is Explanation {
  return isObject(value)
    && typeof value.sensorId === 'string'
    && typeof value.text === 'string'
    && (value.mode === 'LIVE' || value.mode === 'MOCK');
}

export async function getExplanation(id: string, hours: TimeRangeHours): Promise<Explanation> {
  const response = await fetch(
    `/api/sensors/${encodeURIComponent(id)}/explanation?hours=${hours}`,
    {
      method: 'POST',
    },
  );
  const data = await requireSuccessfulJson(response);

  if (!isExplanation(data)) {
    throw new Error('Invalid explanation response');
  }
  return data;
}