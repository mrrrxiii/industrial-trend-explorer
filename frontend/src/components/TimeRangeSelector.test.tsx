import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it, vi } from 'vitest';
import { TimeRangeSelector } from './TimeRangeSelector';

afterEach(cleanup);

it('shows the available ranges and reports the selected range', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimeRangeSelector value={24} onChange={onChange} />);

    expect(screen.getByRole('button', { name: '24H' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: '1H' }).getAttribute('aria-pressed')).toBe('false');

    await user.click(screen.getByRole('button', { name: '6H' }));

    expect(onChange).toHaveBeenCalledWith(6);
});
