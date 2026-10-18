package com.flyinnegg.industrialtrend.sensor;

import java.time.Instant;

public record Summary(
        int count,
        Double min,
        Double max,
        Double avg,
        int anomalyCount,
        Instant firstTimestamp,
        Instant lastTimestamp) {
}
