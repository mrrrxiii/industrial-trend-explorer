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
        TrendResponse trend = sensorService.getTrend(sensorId);
        String prompt = ExplanationPrompt.from(trend);
        String text = provider.generate(trend, prompt);
        return new ExplanationResponse(trend.sensor().id(), text, provider.mode());
    }
}