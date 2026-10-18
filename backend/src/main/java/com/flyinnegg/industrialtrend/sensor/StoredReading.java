package com.flyinnegg.industrialtrend.sensor;

import java.time.Instant;

record StoredReading(Instant timestamp, double value) {
}
