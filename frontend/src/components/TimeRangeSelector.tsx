import type { TimeRangeHours } from '../types';

type Props = {
    value: TimeRangeHours;
    onChange: (hours: TimeRangeHours) => void;
};

const timeRanges: TimeRangeHours[] = [1, 6, 24];

export function TimeRangeSelector({ value, onChange }: Props) {
    return (
        <fieldset className="time-range-selector">
            <legend>Time range</legend>
            <div className="time-range-buttons">
                {timeRanges.map(hours => (
                    <button
                        key={hours}
                        className="time-range-button"
                        type="button"
                        aria-pressed={value === hours}
                        onClick={() => onChange(hours)}
                    >
                        {hours}H
                    </button>
                ))}
            </div>
        </fieldset>
    );
}
