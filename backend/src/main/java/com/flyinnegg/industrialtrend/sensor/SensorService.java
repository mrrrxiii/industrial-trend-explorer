package com.flyinnegg.industrialtrend.sensor;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
        return getTrend(sensorId, 24);
    }

    public TrendResponse getTrend(String sensorId, int hours) {
        validateHours(hours);

        Sensor sensor = sensorRepository.findById(sensorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Sensor not found"));

        Instant latestTimestamp = sensorRepository.findLatestTimestampBySensorId(sensorId)
                .orElse(null);
        if (latestTimestamp == null) {
            return new TrendResponse(
                    sensor, List.of(), TrendCalculator.summarize(List.of()), hours);
        }

        Instant startTimestamp = latestTimestamp.minus(hours, ChronoUnit.HOURS);
        List<Reading> readings = sensorRepository.findReadingsBySensorIdBetween(
                        sensorId, startTimestamp, latestTimestamp).stream()
                .map(stored -> new Reading(
                        stored.timestamp(),
                        stored.value(),
                        TrendCalculator.isAnomaly(sensor, stored.value())))
                .toList();

        return new TrendResponse(sensor, readings, TrendCalculator.summarize(readings), hours);
    }

    private static void validateHours(int hours) {
        if (hours != 1 && hours != 6 && hours != 24) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "hours must be one of 1, 6, or 24");
        }
    }
}
