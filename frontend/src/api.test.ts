import { afterEach, expect, it, vi } from 'vitest';
import { getTrend } from './api';

afterEach(() => {
    vi.unstubAllGlobals();
});

it('sends the selected hour range as a query parameter', async () => {
    const responseData = {
        sensor: {
            id: 'pump-pressure',
            name: 'Pump Pressure',
            unit: 'bar',
            normalMin: 2,
            normalMax: 5,
        },
        readings: [],
        summary: {
            count: 0,
            min: null,
            max: null,
            avg: null,
            anomalyCount: 0,
            firstTimestamp: null,
            lastTimestamp: null,
        },
        hours: 6,
    };
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(responseData)));
    vi.stubGlobal('fetch', fetchMock);

    await getTrend('pump-pressure', 6, new AbortController().signal);

    expect(fetchMock).toHaveBeenCalledWith(
        '/api/sensors/pump-pressure/trend?hours=6',
        { signal: expect.any(AbortSignal) },
    );
});

it('rejects a response whose time range differs from the requested range', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
        sensor: {
            id: 'pump-pressure',
            name: 'Pump Pressure',
            unit: 'bar',
            normalMin: 2,
            normalMax: 5,
        },
        readings: [],
        summary: {
            count: 0,
            min: null,
            max: null,
            avg: null,
            anomalyCount: 0,
            firstTimestamp: null,
            lastTimestamp: null,
        },
        hours: 24,
    })));
    vi.stubGlobal('fetch', fetchMock);

    await expect(getTrend('pump-pressure', 6, new AbortController().signal))
        .rejects.toThrow('Invalid trend response');
});
