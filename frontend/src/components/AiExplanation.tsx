import { useState } from 'react';
import { getExplanation } from '../api';
import type { Explanation } from '../types';

type Props = { sensorId: string };

export function AiExplanation({ sensorId }: Props) {
    const [pending, setPending] = useState(false);
    const [explanation, setExplanation] = useState<Explanation | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleExplain() {
        setPending(true);
        setExplanation(null);
        setError(null);
        try {
            setExplanation(await getExplanation(sensorId));
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to generate explanation');
        } finally {
            setPending(false);
        }
    }

    return (
        <section>
            <button onClick={() => void handleExplain()} disabled={pending}>
                {pending ? 'Generating...' : 'Explain with AI'}
            </button>
            {error && <p role="alert">{error}</p>}
            {explanation && (
                <div>
                    <strong>{explanation.mode === 'LIVE' ? 'LIVE AI' : 'MOCK — NOT AI'}</strong>
                    <p>{explanation.text}</p>
                </div>
            )}
        </section>
    );
}