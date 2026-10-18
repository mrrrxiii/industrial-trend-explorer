package com.flyinnegg.industrialtrend.sensor;

import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "llm.mode", havingValue = "mock", matchIfMissing = true)
public class MockExplanationProvider implements ExplanationProvider {

    @Override
    public String mode() {
        return "MOCK";
    }

    @Override
    public String generate(TrendResponse trend, String prompt) {
        Sensor sensor = trend.sensor();
        Summary summary = trend.summary();
        String anomalies = trend.readings().stream()
                .filter(Reading::anomaly)
                .map(reading -> reading.timestamp() + " = " + reading.value() + " " + sensor.unit())
                .collect(Collectors.joining("; "));

        return "This is simulated data for " + sensor.name() + ". "
                + summary.count() + " readings range from " + summary.min() + " to " + summary.max() + " "
                + sensor.unit() + " (normal range " + sensor.normalMin() + " to " + sensor.normalMax() + " "
                + sensor.unit() + "), with an average of " + summary.avg() + ". "
                + summary.anomalyCount() + " anomalies: " + anomalies + ". "
                + "This deterministic mock is not AI and is not operational guidance.";
    }
}