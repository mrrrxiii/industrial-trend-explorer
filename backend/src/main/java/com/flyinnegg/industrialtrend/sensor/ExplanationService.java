package com.flyinnegg.industrialtrend.sensor;

import org.springframework.stereotype.Service;

@Service
public class ExplanationService {

    private final SensorService sensorService;
    private final ExplanationProvider provider;

    public ExplanationService(SensorService sensorService, ExplanationProvider provider) {
        this.sensorService = sensorService;
        this.provider = provider;
    }

    public ExplanationResponse explain(String sensorId) {
        return explain(sensorId, 24);
    }

    public ExplanationResponse explain(String sensorId, int hours) {
        TrendResponse trend = sensorService.getTrend(sensorId, hours);
        String prompt = ExplanationPrompt.from(trend);
        String text = provider.generate(trend, prompt);
        return new ExplanationResponse(trend.sensor().id(), text, provider.mode());
    }
}