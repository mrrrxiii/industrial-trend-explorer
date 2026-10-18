import type { Sensor } from '../types';

type Props = { sensor: Sensor };

export function SensorDetails({ sensor }: Props) {
    return <p>{sensor.name} ({sensor.unit})</p>;
}