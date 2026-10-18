import type { Reading, Sensor, Summary } from './types';

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

export function createReadings(sensorId: string): Reading[] {
    const sensor = sensors.find(item => item.id === sensorId);
    if (!sensor) throw new Error(`Unknown sensor: ${sensorId}`);

    return Array.from({ length: 48 }, (_, i) => {
        const timestamp = new Date(Date.UTC(2026, 9, 1, 0, i * 30)).toISOString();
        const normalValue = sensorId === 'reactor-temp'
            ? 70 + ((i % 5) - 2)
            : 3.5 + 0.1 * ((i % 5) - 2);
        const value = i === 12
            ? (sensorId === 'reactor-temp' ? 86 : 5.8)
            : i === 36
                ? (sensorId === 'reactor-temp' ? 88 : 5.9)
                : normalValue;

        return {
            timestamp,
            value,
            anomaly: value < sensor.normalMin || value > sensor.normalMax,
        };
    });
}

export function summarize(readings: Reading[]): Summary {
    if (readings.length === 0) {
        return {
            count: 0,
            min: null,
            max: null,
            avg: null,
            anomalyCount: 0,
            firstTimestamp: null,
            lastTimestamp: null,
        };
    }

    const values = readings.map(reading => reading.value);
    const total = readings.reduce((sum, reading) => sum + reading.value, 0);

    return {
        count: readings.length,
        min: Math.min(...values),
        max: Math.max(...values),
        avg: total / readings.length,
        anomalyCount: readings.filter(reading => reading.anomaly).length,
        firstTimestamp: readings[0].timestamp,
        lastTimestamp: readings[readings.length - 1].timestamp,
    };
}