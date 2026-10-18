package com.flyinnegg.industrialtrend.sensor;

import java.util.List;

public record TrendResponse(Sensor sensor, List<Reading> readings, Summary summary, int hours) {
}
