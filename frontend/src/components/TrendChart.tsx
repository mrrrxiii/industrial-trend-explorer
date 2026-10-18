import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceArea,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { DotItemDotProps } from 'recharts';
import type { Reading } from '../types';

type Props = {
    readings: Reading[];
    unit: string;
    sensorName: string;
    normalMin: number;
    normalMax: number;
};

type TrendTooltipProps = {
    active?: boolean;
    payload?: ReadonlyArray<{ payload?: unknown }>;
    unit: string;
};

function formatAxisTime(timestamp: string) {
    return timestamp.slice(11, 16);
}

function formatFullTimestamp(timestamp: string) {
    return timestamp.replace('T', ' ').replace('Z', ' UTC');
}

function AnomalyDot({ cx, cy, payload }: DotItemDotProps) {
    const reading = payload as Reading;

    if (!reading.anomaly || typeof cx !== 'number' || typeof cy !== 'number') {
        return null;
    }

    return (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill="var(--color-danger)"
            stroke="#ffffff"
            strokeWidth={3}
        />
    );
}

function TrendTooltip({ active, payload, unit }: TrendTooltipProps) {
    const reading = payload?.[0]?.payload as Reading | undefined;

    if (!active || !reading) return null;

    return (
        <div className="chart-tooltip">
            <p className="chart-tooltip-time">{formatFullTimestamp(reading.timestamp)}</p>
            <strong>{reading.value} {unit}</strong>
            <span className={reading.anomaly ? 'tooltip-status tooltip-status--anomaly' : 'tooltip-status'}>
                {reading.anomaly ? 'Anomaly — outside normal range' : 'Within normal range'}
            </span>
        </div>
    );
}

export function TrendChart({
    readings,
    unit,
    sensorName,
    normalMin,
    normalMax,
}: Props) {
    const values = readings.map(reading => reading.value);
    const chartMin = Math.min(normalMin, ...values);
    const chartMax = Math.max(normalMax, ...values);
    const padding = Math.max((chartMax - chartMin) * 0.1, 0.1);
    const yDomain: [number, number] = [
        Math.floor((chartMin - padding) * 10) / 10,
        Math.ceil((chartMax + padding) * 10) / 10,
    ];

    return (
        <section className="panel chart-panel" aria-labelledby="trend-heading">
            <div className="chart-heading">
                <div>
                    <p className="section-kicker">24-hour history</p>
                    <h2 id="trend-heading">Sensor trend</h2>
                </div>
                <div className="chart-legend" aria-label="Chart legend">
                    <span><i className="legend-swatch legend-swatch--trend" />Reading</span>
                    <span><i className="legend-swatch legend-swatch--normal" />Normal range</span>
                    <span><i className="legend-swatch legend-swatch--anomaly" />Anomaly</span>
                </div>
            </div>
            <div
                className="chart-canvas"
                role="img"
                aria-label={
                    sensorName + ' readings with a normal range from ' +
                    normalMin + ' to ' + normalMax + ' ' + unit
                }
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={readings}
                        margin={{ top: 12, right: 18, bottom: 4, left: 0 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="var(--color-border)"
                            strokeDasharray="3 5"
                        />
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={formatAxisTime}
                            interval={7}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: 'var(--color-border)' }}
                            tickMargin={10}
                        />
                        <YAxis
                            domain={yDomain}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={48}
                            label={{
                                value: unit,
                                angle: -90,
                                position: 'insideLeft',
                                fill: 'var(--color-text-muted)',
                            }}
                        />
                        <ReferenceArea
                            y1={normalMin}
                            y2={normalMax}
                            fill="var(--color-accent)"
                            fillOpacity={0.1}
                            strokeOpacity={0}
                        />
                        <ReferenceLine
                            y={normalMin}
                            stroke="var(--color-accent)"
                            strokeDasharray="6 5"
                            strokeOpacity={0.65}
                        />
                        <ReferenceLine
                            y={normalMax}
                            stroke="var(--color-accent)"
                            strokeDasharray="6 5"
                            strokeOpacity={0.65}
                        />
                        <Tooltip
                            content={props => (
                                <TrendTooltip
                                    active={props.active}
                                    payload={props.payload}
                                    unit={unit}
                                />
                            )}
                            cursor={{ stroke: 'var(--color-text-muted)', strokeDasharray: '4 4' }}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            name="Reading"
                            stroke="var(--color-accent)"
                            strokeWidth={3}
                            dot={AnomalyDot}
                            activeDot={{
                                r: 6,
                                fill: 'var(--color-accent)',
                                stroke: '#ffffff',
                                strokeWidth: 3,
                            }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}