import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import type { Reading } from '../types';
import { AnomalyList } from './AnomalyList';

const readings: Reading[] = [
    { timestamp: '2026-10-01T05:30:00Z', value: 69, anomaly: false },
    { timestamp: '2026-10-01T06:00:00Z', value: 86, anomaly: true },
    { timestamp: '2026-10-01T18:00:00Z', value: 88, anomaly: true },
];

afterEach(cleanup);

it('lists only readings marked as anomalies by the backend', () => {
    render(
        <AnomalyList
            readings={readings}
            unit="°C"
            normalMin={60}
            normalMax={80}
        />,
    );

    expect(screen.getByRole('table', {
        name: 'Sensor readings flagged as anomalies and their normal range',
    })).toBeTruthy();
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getAllByRole('row').slice(1).map(row => row.textContent)).toEqual([
        '2026-10-01 06:00:00 UTC86 °C60–80 °C',
        '2026-10-01 18:00:00 UTC88 °C60–80 °C',
    ]);
    expect(screen.getByRole('columnheader', { name: 'Time (UTC)' })).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Reading' })).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Normal range' })).toBeTruthy();
    expect(screen.queryByText(/2026-10-01T05:30:00Z/)).toBeNull();
});

it('shows an empty-state message when no readings are anomalies', () => {
    render(
        <AnomalyList
            readings={[{ timestamp: '2026-10-01T05:30:00Z', value: 69, anomaly: false }]}
            unit="°C"
            normalMin={60}
            normalMax={80}
        />,
    );

    expect(screen.getByText('No anomalous readings.')).toBeTruthy();
    expect(screen.queryByRole('table')).toBeNull();
});
