import type { Reading } from '../types';

type Props = {
    readings: Reading[];
    unit: string;
    normalMin: number;
    normalMax: number;
};

function formatUtcTimestamp(timestamp: string) {
    return timestamp.replace('T', ' ').replace('Z', ' UTC');
}

export function AnomalyList({ readings, unit, normalMin, normalMax }: Props) {
    const anomalies = readings.filter(reading => reading.anomaly);

    return (
        <section className="panel anomaly-panel" aria-labelledby="anomaly-list-heading">
            <div className="insight-panel-heading">
                <div>
                    <p className="section-kicker">Flagged by Java analytics</p>
                    <h2 id="anomaly-list-heading">Anomalies</h2>
                </div>
                <span className="panel-count">{anomalies.length}</span>
            </div>
            {anomalies.length === 0 ? (
                <p className="panel-empty">No anomalous readings.</p>
            ) : (
                <div className="anomaly-table-wrap">
                    <table className="anomaly-table">
                        <caption className="visually-hidden">
                            Sensor readings flagged as anomalies and their normal range
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Time (UTC)</th>
                                <th scope="col">Reading</th>
                                <th scope="col">Normal range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anomalies.map(reading => (
                                <tr key={reading.timestamp}>
                                    <td>
                                        <time dateTime={reading.timestamp}>
                                            {formatUtcTimestamp(reading.timestamp)}
                                        </time>
                                    </td>
                                    <td className="anomaly-reading">{reading.value} {unit}</td>
                                    <td>{normalMin}–{normalMax} {unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
