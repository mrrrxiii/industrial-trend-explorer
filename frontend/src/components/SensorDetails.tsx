import type { Sensor } from '../types';

type Props = { sensor: Sensor };

export function SensorDetails({ sensor }: Props) {
    return (
        <div className="sensor-identity">
            <p className="section-kicker">Selected sensor</p>
            <h2 id="sensor-context-heading">{sensor.name}</h2>
            <div className="sensor-meta">
                <span>Unit: {sensor.unit}</span>
                <span>
                    Normal range: {sensor.normalMin}–{sensor.normalMax} {sensor.unit}
                </span>
            </div>
        </div>
    );
}