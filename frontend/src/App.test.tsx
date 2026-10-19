import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { Sensor, TrendResponse } from './types';
import App from './App';
import { getSensors, getTrend } from './api';

vi.mock('./api', () => ({
  getSensors: vi.fn(),
  getTrend: vi.fn(),
  getExplanation: vi.fn(),
}));

const sensors: Sensor[] = [
  {
    id: 'reactor-temp',
    name: 'Reactor Temperature',
    unit: '°C',
    normalMin: 60,
    normalMax: 80,
  },
  {
    id: 'pump-pressure',
    name: 'Pump Pressure',
    unit: 'bar',
    normalMin: 2,
    normalMax: 5,
  },
];

const reactorTrend: TrendResponse = {
  sensor: sensors[0],
  readings: [
    { timestamp: '2026-10-01T06:00:00Z', value: 86, anomaly: true },
  ],
  summary: {
    count: 1,
    min: 86,
    max: 86,
    avg: 86,
    anomalyCount: 1,
    firstTimestamp: '2026-10-01T06:00:00Z',
    lastTimestamp: '2026-10-01T06:00:00Z',
  },
  hours: 24,
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getSensors).mockResolvedValue(sensors);
});

afterEach(() => {
  cleanup();
});

it('shows portfolio links below the simulated-data warning with safe new-tab attributes', () => {
  render(<App />);

  const linkedIn = screen.getByRole('link', { name: 'LinkedIn' });
  const github = screen.getByRole('link', { name: 'GitHub' });

  expect(linkedIn.getAttribute('href')).toBe('https://www.linkedin.com/in/leikong-ottawa/');
  expect(linkedIn.getAttribute('target')).toBe('_blank');
  expect(linkedIn.getAttribute('rel')).toBe('noopener noreferrer');
  expect(github.getAttribute('href')).toBe('https://github.com/mrrrxiii/industrial-trend-explorer');
  expect(github.getAttribute('target')).toBe('_blank');
  expect(github.getAttribute('rel')).toBe('noopener noreferrer');
  expect(screen.getByText('Simulated data — not live industrial data')).toBeTruthy();
  expect(linkedIn.parentElement?.previousElementSibling?.textContent)
    .toContain('Simulated data — not live industrial data');
});

it('clears the old trend and shows loading when the sensor changes', async () => {
  const user = userEvent.setup();
  vi.mocked(getTrend).mockImplementation(id => {
    if (id === 'reactor-temp') return Promise.resolve(reactorTrend);
    return new Promise<TrendResponse>(() => {});
  });

  render(<App />);

  expect(await screen.findByRole('heading', { name: 'Summary' })).toBeTruthy();

  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Choose a sensor:' }),
    'pump-pressure',
  );

  expect(screen.getByText('Loading trend...')).toBeTruthy();
  expect(screen.queryByRole('heading', { name: 'Summary' })).toBeNull();
  expect(getTrend).toHaveBeenLastCalledWith('pump-pressure', 24, expect.any(AbortSignal));
});

it('defaults to 24 hours and reloads summary data when the range changes', async () => {
  const user = userEvent.setup();
  vi.mocked(getTrend).mockImplementation((_id, hours) => Promise.resolve({
    ...reactorTrend,
    hours,
    summary: {
      ...reactorTrend.summary,
      count: hours,
      max: hours === 6 ? 76 : 86,
      anomalyCount: hours === 6 ? 0 : 1,
    },
  }));

  render(<App />);

  const dayButton = await screen.findByRole('button', { name: '24H' });
  expect(dayButton.getAttribute('aria-pressed')).toBe('true');
  expect(await screen.findByText('Maximum')).toBeTruthy();
  expect(screen.getByText('Maximum').closest('.metric-card')?.textContent).toContain('86 °C');
  expect(getTrend).toHaveBeenLastCalledWith('reactor-temp', 24, expect.any(AbortSignal));
  expect(screen.getByText('24-hour history')).toBeTruthy();

  await user.click(screen.getByRole('button', { name: '6H' }));

  expect(await screen.findByText('76 °C', { selector: 'strong' })).toBeTruthy();
  expect(screen.getByRole('button', { name: '6H' }).getAttribute('aria-pressed')).toBe('true');
  expect(getTrend).toHaveBeenLastCalledWith('reactor-temp', 6, expect.any(AbortSignal));
  expect(screen.getByText('6-hour history')).toBeTruthy();
});

it('explains when there are no readings in the selected time range', async () => {
  const user = userEvent.setup();
  vi.mocked(getTrend).mockResolvedValue({
    ...reactorTrend,
    readings: [],
    summary: {
      count: 0,
      min: 0,
      max: 0,
      avg: 0,
      anomalyCount: 0,
      firstTimestamp: null,
      lastTimestamp: null,
    },
  });

  render(<App />);

  expect(await screen.findByText('No readings available for the selected time range.')).toBeTruthy();
  await user.click(screen.getByRole('button', { name: '1H' }));
  expect(getTrend).toHaveBeenLastCalledWith('reactor-temp', 1, expect.any(AbortSignal));
});
