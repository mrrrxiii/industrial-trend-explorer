package com.flyinnegg.industrialtrend.sensor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    private final SensorService sensorService;

    private final ExplanationService explanationService;

    public SensorController(SensorService sensorService, ExplanationService explanationService) {
        this.sensorService = sensorService;
        this.explanationService = explanationService;
    }

    @GetMapping
    public List<Sensor> getSensors() {
        return sensorService.getSensors();
    }

    @GetMapping("/{sensorId}/trend")
    public TrendResponse getTrend(@PathVariable String sensorId) {
        return sensorService.getTrend(sensorId);
    }

    @PostMapping("/{sensorId}/explanation")
    public ExplanationResponse explain(@PathVariable String sensorId) {
        return explanationService.explain(sensorId);
    }
}
