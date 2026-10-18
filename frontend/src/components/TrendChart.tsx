import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { Reading } from '../types';

type Props = {
    readings: Reading[];
    unit: string;
};

export function TrendChart({ readings, unit }: Props) {
    return (
        <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={readings}>
                    <XAxis dataKey="timestamp" />
                    <YAxis unit={unit} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}