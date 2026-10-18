import type { Summary } from '../types';

type Props = {
    summary: Summary;
    unit: string;
};

type MetricCardProps = {
    label: string;
    value: string;
    alert?: boolean;
};

function MetricCard({ label, value, alert = false }: MetricCardProps) {
    return (
        <article className={alert ? 'metric-card metric-card--alert' : 'metric-card'}>
            <span className="metric-label">{label}</span>
            <strong className="metric-value">{value}</strong>
        </article>
    );
}

function formatMeasurement(value: number | null, unit: string, decimals?: number) {
    if (value === null) return 'No data';
    const formatted = decimals === undefined ? String(value) : value.toFixed(decimals);
    return formatted + ' ' + unit;
}

export function SummaryCards({ summary, unit }: Props) {
    return (
        <section className="panel summary-section" aria-labelledby="summary-heading">
            <div className="summary-heading">
                <p className="section-kicker">Current dataset</p>
                <h2 id="summary-heading">Summary</h2>
            </div>
            <div className="summary-grid">
                <MetricCard label="Readings" value={String(summary.count)} />
                <MetricCard label="Minimum" value={formatMeasurement(summary.min, unit)} />
                <MetricCard label="Maximum" value={formatMeasurement(summary.max, unit)} />
                <MetricCard label="Average" value={formatMeasurement(summary.avg, unit, 2)} />
                <MetricCard
                    label="Anomalies"
                    value={String(summary.anomalyCount)}
                    alert={summary.anomalyCount > 0}
                />
            </div>
        </section>
    );
}