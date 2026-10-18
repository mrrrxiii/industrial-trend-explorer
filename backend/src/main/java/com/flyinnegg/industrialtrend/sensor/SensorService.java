package com.flyinnegg.industrialtrend.sensor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;

    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<Sensor> getSensors() {
        return sensorRepository.findAll();
    }

    public TrendResponse getTrend(String sensorId) {
        Sensor sensor = sensorRepository.findById(sensorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Sensor not found"));

        List<Reading> readings = sensorRepository.findReadingsBySensorId(sensorId).stream()
                .map(stored -> new Reading(
                        stored.timestamp(),
                        stored.value(),
                        TrendCalculator.isAnomaly(sensor, stored.value())))
                .toList();

        return new TrendResponse(sensor, readings, TrendCalculator.summarize(readings));
    }
}
