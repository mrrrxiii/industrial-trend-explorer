import type { Reading } from '../types';

type Props = {
    readings: Reading[];
    unit: string;
};

export function AnomalyList({ readings, unit }: Props) {
    const anomalies = readings.filter(reading => reading.anomaly);

    return (
        <section aria-labelledby="anomaly-list-heading">
            <h2 id="anomaly-list-heading">Anomalies</h2>
            {anomalies.length === 0 ? (
                <p>No anomalous readings.</p>
            ) : (
                <ul>
                    {anomalies.map(reading => (
                        <li key={reading.timestamp}>
                            <time dateTime={reading.timestamp}>{reading.timestamp}</time>
                            {`: ${reading.value} ${unit}`}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
