import type { Summary } from '../types';

type Props = { summary: Summary };

export function SummaryCards({ summary }: Props) {
    return (
        <section>
            <h2>Summary</h2>
            <p>Count: {summary.count}</p>
            <p>Minimum: {summary.min ?? 'No data'}</p>
            <p>Maximum: {summary.max ?? 'No data'}</p>
            <p>Average: {summary.avg === null ? 'No data' : summary.avg.toFixed(4)}</p>
            <p>Anomalies: {summary.anomalyCount}</p>
        </section>
    );
}