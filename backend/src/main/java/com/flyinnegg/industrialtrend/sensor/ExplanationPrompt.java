package com.flyinnegg.industrialtrend.sensor;

import java.util.stream.Collectors;

final class ExplanationPrompt {

    private ExplanationPrompt() {
    }

    static String from(TrendResponse trend) {
        Sensor sensor = trend.sensor();
        Summary summary = trend.summary();
        String anomalies = trend.readings().stream()
                .filter(Reading::anomaly)
                .map(reading -> reading.timestamp() + " = " + reading.value() + " " + sensor.unit())
                .collect(Collectors.joining("; "));

        return """
                Explain this synthetic sensor summary in 3–5 short sentences. Use only the supplied values. State the anomaly count and how the readings compare with the normal range. Do not invent causes, predictions, diagnoses, equipment-maintenance advice, or live operational facts. Say explicitly that this is simulated data, not operational guidance.

                Sensor: %s
                Unit: %s
                Normal range: %s to %s %s
                Count: %d
                Minimum: %s
                Maximum: %s
                Average: %s
                Anomaly count: %d
                First timestamp: %s
                Last timestamp: %s
                Anomalous readings (timestamp = value unit): %s
                """
                .formatted(
                        sensor.name(), sensor.unit(), sensor.normalMin(), sensor.normalMax(), sensor.unit(),
                        summary.count(), summary.min(), summary.max(), summary.avg(), summary.anomalyCount(),
                        summary.firstTimestamp(), summary.lastTimestamp(), anomalies);
    }
}