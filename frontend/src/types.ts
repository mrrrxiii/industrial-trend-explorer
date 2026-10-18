export type Sensor = {
    id: string;
    name: string;
    unit: string;
    normalMin: number;
    normalMax: number;
};

export type Reading = { timestamp: string; value: number; anomaly: boolean };

export type TimeRangeHours = 1 | 6 | 24;

export type Summary = {
    count: number;
    min: number | null;
    max: number | null;
    avg: number | null;
    anomalyCount: number;
    firstTimestamp: string | null;
    lastTimestamp: string | null;
};

export type TrendResponse = {
    sensor: Sensor;
    readings: Reading[];
    summary: Summary;
    hours: TimeRangeHours;
};

export type Explanation = {
    sensorId: string;
    text: string;
    mode: 'LIVE' | 'MOCK';
};
