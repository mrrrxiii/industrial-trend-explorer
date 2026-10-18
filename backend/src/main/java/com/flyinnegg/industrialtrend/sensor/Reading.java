package com.flyinnegg.industrialtrend.sensor;

import java.time.Instant;

public record Reading(Instant timestamp, double value, boolean anomaly) {
}
