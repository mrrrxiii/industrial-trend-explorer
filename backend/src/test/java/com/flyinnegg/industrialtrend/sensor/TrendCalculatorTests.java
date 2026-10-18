package com.flyinnegg.industrialtrend.sensor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Instant;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;

class TrendCalculatorTests {

    private static final Sensor REACTOR = new Sensor(
            "reactor-temp", "Reactor Temperature", "°C", 60.0, 80.0);

    @Test
    void normalRangeBoundariesAreInclusive() {
        assertFalse(TrendCalculator.isAnomaly(REACTOR, 60.0));
        assertFalse(TrendCalculator.isAnomaly(REACTOR, 80.0));
        assertTrue(TrendCalculator.isAnomaly(REACTOR, 59.9));
        assertTrue(TrendCalculator.isAnomaly(REACTOR, 80.1));
    }

    @Test
    void summarizesDeterministicReactorAverage() {
        List<Reading> readings = IntStream.range(0, 48)
                .mapToObj(index -> reactorReading(index))
                .toList();

        Summary summary = TrendCalculator.summarize(readings);

        assertEquals(48, summary.count());
        assertEquals(70.66666666666667, summary.avg(), 1e-9);
        assertEquals(2, summary.anomalyCount());
    }

    @Test
    void summarizesEmptyReadings() {
        Summary summary = TrendCalculator.summarize(List.of());

        assertEquals(0, summary.count());
        assertNull(summary.min());
        assertNull(summary.max());
        assertNull(summary.avg());
        assertEquals(0, summary.anomalyCount());
        assertNull(summary.firstTimestamp());
        assertNull(summary.lastTimestamp());
    }

    private static Reading reactorReading(int index) {
        double value = switch (index) {
            case 12 -> 86.0;
            case 36 -> 88.0;
            default -> 70.0 + ((index % 5) - 2);
        };
        return new Reading(
                Instant.parse("2026-10-01T00:00:00Z").plusSeconds(index * 1_800L),
                value,
                TrendCalculator.isAnomaly(REACTOR, value));
    }
}
