package com.flyinnegg.industrialtrend.sensor;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Instant;
import java.util.List;

import org.junit.jupiter.api.Test;

class ExplanationPromptTests {

    @Test
    void createsGroundedPromptForReactor() {
        Sensor sensor = new Sensor("reactor-temp", "Reactor Temperature", "°C", 60, 80);
        List<Reading> readings = List.of(
                new Reading(Instant.parse("2026-10-01T06:00:00Z"), 86, true),
                new Reading(Instant.parse("2026-10-01T18:00:00Z"), 88, true));
        Summary summary = new Summary(48, 68.0, 88.0, 70.66666666666667, 2,
                Instant.parse("2026-10-01T00:00:00Z"), Instant.parse("2026-10-01T23:30:00Z"));
        String prompt = ExplanationPrompt.from(new TrendResponse(sensor, readings, summary));

        assertTrue(prompt.contains("Anomaly count: 2"));
        assertTrue(prompt.contains("2026-10-01T06:00:00Z = 86.0 °C"));
        assertTrue(prompt.contains("Do not invent causes"));
    }
}