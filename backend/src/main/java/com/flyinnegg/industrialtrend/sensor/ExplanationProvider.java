package com.flyinnegg.industrialtrend.sensor;

public interface ExplanationProvider {
    String mode();

    String generate(TrendResponse trend, String prompt);
}