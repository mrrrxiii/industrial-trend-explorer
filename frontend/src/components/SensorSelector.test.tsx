import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it, vi } from 'vitest';
import type { Sensor } from '../types';
import { SensorSelector } from './SensorSelector';

afterEach(cleanup);

const sensors: Sensor[] = [
    {
        id: 'reactor-temp',
        name: 'Reactor Temperature',
        unit: '°C',
        normalMin: 65,
        normalMax: 75,
    },
    {
        id: 'pump-pressure',
        name: 'Pump Pressure',
        unit: 'bar',
        normalMin: 3,
        normalMax: 4,
    },
];

it('passes the selected sensor ID to the change callback', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SensorSelector sensors={sensors} selectedId="reactor-temp" onChange={onChange} />);

    await user.selectOptions(
        screen.getByRole('combobox', { name: 'Choose a sensor:' }),
        'pump-pressure',
    );

    expect(onChange).toHaveBeenCalledWith('pump-pressure');
});

it('can be reached by keyboard tab navigation', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SensorSelector sensors={sensors} selectedId="reactor-temp" onChange={onChange} />);

    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('combobox', { name: 'Choose a sensor:' }));
});
