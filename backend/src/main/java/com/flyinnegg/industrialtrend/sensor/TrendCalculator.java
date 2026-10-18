package com.flyinnegg.industrialtrend.sensor;

import java.util.DoubleSummaryStatistics;
import java.util.List;

public final class TrendCalculator {

    private TrendCalculator() {
    }

    public static boolean isAnomaly(Sensor sensor, double value) {
        return value < sensor.normalMin() || value > sensor.normalMax();
    }

    public static Summary summarize(List<Reading> readings) {
        if (readings.isEmpty()) {
            return new Summary(0, null, null, null, 0, null, null);
        }

        DoubleSummaryStatistics statistics = readings.stream()
                .mapToDouble(Reading::value)
                .summaryStatistics();
        int anomalyCount = Math.toIntExact(readings.stream()
                .filter(Reading::anomaly)
                .count());

        return new Summary(
                readings.size(),
                statistics.getMin(),
                statistics.getMax(),
                statistics.getAverage(),
                anomalyCount,
                readings.getFirst().timestamp(),
                readings.getLast().timestamp());
    }
}
