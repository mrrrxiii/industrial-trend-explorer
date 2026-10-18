package com.flyinnegg.industrialtrend.sensor;

public record Sensor(
        String id,
        String name,
        String unit,
        double normalMin,
        double normalMax) {
}
