import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { getExplanation } from '../api';
import type { Explanation } from '../types';
import { AiExplanation } from './AiExplanation';

vi.mock('../api', () => ({
    getExplanation: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

afterEach(cleanup);

it('requests an explanation only after clicking and renders returned text safely', async () => {
    const user = userEvent.setup();
    const text = '<b>Use supplied facts only.</b>';
    vi.mocked(getExplanation).mockResolvedValue({
        sensorId: 'reactor-temp',
        text,
        mode: 'MOCK',
    });

    render(<AiExplanation sensorId="reactor-temp" />);

    expect(getExplanation).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Explain with AI' }));

    expect(await screen.findByText(text)).toBeTruthy();
    expect(screen.getByText('MOCK — NOT AI')).toBeTruthy();
    expect(document.querySelector('.ai-result b')).toBeNull();
    expect(getExplanation).toHaveBeenCalledTimes(1);
});

it('supports keyboard focus and activation', async () => {
    const user = userEvent.setup();
    vi.mocked(getExplanation).mockResolvedValue({
        sensorId: 'reactor-temp',
        text: 'Keyboard-generated explanation.',
        mode: 'MOCK',
    });

    render(<AiExplanation sensorId="reactor-temp" />);

    await user.tab();
    const button = screen.getByRole('button', { name: 'Explain with AI' });
    expect(document.activeElement).toBe(button);

    await user.keyboard('{Enter}');

    expect(await screen.findByText('Keyboard-generated explanation.')).toBeTruthy();
    expect(getExplanation).toHaveBeenCalledTimes(1);
});

it('shows a pending status while the explanation is being generated', async () => {
    const user = userEvent.setup();
    let resolveExplanation: (explanation: Explanation) => void = () => {};
    vi.mocked(getExplanation).mockReturnValue(new Promise(resolve => {
        resolveExplanation = resolve;
    }));

    render(<AiExplanation sensorId="pump-pressure" />);

    await user.click(screen.getByRole('button', { name: 'Explain with AI' }));
    expect(screen.getByRole('status').textContent).toContain('Waiting for the explanation provider');
    expect(screen.getByRole('button', { name: 'Generating explanation…' }).hasAttribute('disabled')).toBe(true);

    resolveExplanation({
        sensorId: 'pump-pressure',
        text: 'Generated explanation.',
        mode: 'LIVE',
    });
    expect(await screen.findByText('LIVE AI')).toBeTruthy();
});

it('announces provider failures without displaying a successful result', async () => {
    const user = userEvent.setup();
    vi.mocked(getExplanation).mockRejectedValue(new Error('Request failed with status 502'));

    render(<AiExplanation sensorId="reactor-temp" />);
    await user.click(screen.getByRole('button', { name: 'Explain with AI' }));

    expect((await screen.findByRole('alert')).textContent).toContain('Request failed with status 502');
    expect(screen.queryByText('LIVE AI')).toBeNull();
});
