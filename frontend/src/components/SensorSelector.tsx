import type { Sensor } from '../types';

type Props = {
    sensors: Sensor[];
    selectedId: string;
    onChange: (id: string) => void;
};

export function SensorSelector({ sensors, selectedId, onChange }: Props) {
    return (
        <label className="sensor-selector" htmlFor="sensor">
            <span>Choose a sensor:</span>
            <select
                id="sensor"
                value={selectedId}
                onChange={event => onChange(event.target.value)}
            >
                {sensors.map(sensor => (
                    <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
                ))}
            </select>
        </label>
    );
}