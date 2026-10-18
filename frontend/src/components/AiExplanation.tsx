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
        <section className="panel ai-panel" aria-labelledby="ai-explanation-heading">
            <div className="insight-panel-heading">
                <div>
                    <p className="section-kicker">On-demand insight</p>
                    <h2 id="ai-explanation-heading">AI explanation</h2>
                </div>
                {explanation && (
                    <span className={explanation.mode === 'LIVE' ? 'mode-badge mode-badge--live' : 'mode-badge'}>
                        {explanation.mode === 'LIVE' ? 'LIVE AI' : 'MOCK — NOT AI'}
                    </span>
                )}
            </div>
            <p className="ai-panel-description">
                Generated from the Java summary and flagged readings. This is not operational guidance.
            </p>
            <button className="ai-explain-button" onClick={() => void handleExplain()} disabled={pending}>
                {pending ? 'Generating explanation…' : explanation ? 'Generate again' : 'Explain with AI'}
            </button>
            {pending && <p className="ai-pending" role="status">Waiting for the explanation provider…</p>}
            {error && <p className="ai-error" role="alert">{error}</p>}
            {explanation && (
                <div className="ai-result">
                    <p>{explanation.text}</p>
                </div>
            )}
        </section>
    );
}