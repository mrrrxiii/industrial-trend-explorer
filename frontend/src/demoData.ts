import type { Sensor } from './types';

export const sensors: Sensor[] = [
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