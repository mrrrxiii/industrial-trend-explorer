import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import type { Reading } from '../types';
import { AnomalyList } from './AnomalyList';

const readings: Reading[] = [
    { timestamp: '2026-10-01T05:30:00Z', value: 69, anomaly: false },
    { timestamp: '2026-10-01T06:00:00Z', value: 86, anomaly: true },
    { timestamp: '2026-10-01T18:00:00Z', value: 88, anomaly: true },
];

it('lists only readings marked as anomalies by the backend', () => {
    render(<AnomalyList readings={readings} unit="°C" />);

    expect(screen.getAllByRole('listitem').map(item => item.textContent)).toEqual([
        '2026-10-01T06:00:00Z: 86 °C',
        '2026-10-01T18:00:00Z: 88 °C',
    ]);
    expect(screen.queryByText(/2026-10-01T05:30:00Z/)).toBeNull();
});
