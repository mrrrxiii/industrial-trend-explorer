import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
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
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getSensors).mockResolvedValue(sensors);
});

it('clears the old trend and shows loading when the sensor changes', async () => {
  const user = userEvent.setup();
  vi.mocked(getTrend).mockImplementation(id => {
    if (id === 'reactor-temp') return Promise.resolve(reactorTrend);
    return new Promise<TrendResponse>(() => {});
  });

  render(<App />);

  expect(await screen.findByText('Minimum: 86')).toBeTruthy();

  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Choose a sensor:' }),
    'pump-pressure',
  );

  expect(screen.getByText('Loading trend...')).toBeTruthy();
  expect(screen.queryByText('Minimum: 86')).toBeNull();
  expect(getTrend).toHaveBeenLastCalledWith('pump-pressure', expect.any(AbortSignal));
});
