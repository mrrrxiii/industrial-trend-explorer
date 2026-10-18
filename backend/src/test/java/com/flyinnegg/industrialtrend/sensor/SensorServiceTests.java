package com.flyinnegg.industrialtrend.sensor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class SensorServiceTests {

    private static final Sensor PUMP = new Sensor("pump-pressure", "Pump Pressure", "bar", 2, 5);
    private static final Instant LATEST = Instant.parse("2026-10-01T23:30:00Z");

    @Test
    void filtersAndCalculatesSummaryFromTheSelectedWindow() {
        SensorRepository repository = mock(SensorRepository.class);
        when(repository.findById(PUMP.id())).thenReturn(Optional.of(PUMP));
        when(repository.findLatestTimestampBySensorId(PUMP.id())).thenReturn(Optional.of(LATEST));
        when(repository.findReadingsBySensorIdBetween(
                PUMP.id(),
                Instant.parse("2026-10-01T17:30:00Z"),
                LATEST))
                .thenReturn(List.of(
                        new StoredReading(Instant.parse("2026-10-01T17:30:00Z"), 3.5),
                        new StoredReading(LATEST, 5.8)));

        TrendResponse trend = new SensorService(repository).getTrend(PUMP.id(), 6);

        assertEquals(2, trend.readings().size());
        assertEquals(6, trend.hours());
        assertEquals(2, trend.summary().count());
        assertEquals(5.8, trend.summary().max());
        assertEquals(1, trend.summary().anomalyCount());
        verify(repository).findReadingsBySensorIdBetween(
                PUMP.id(),
                Instant.parse("2026-10-01T17:30:00Z"),
                LATEST);
    }

    @Test
    void returnsAnEmptyTrendWhenSensorHasNoReadings() {
        SensorRepository repository = mock(SensorRepository.class);
        when(repository.findById(PUMP.id())).thenReturn(Optional.of(PUMP));
        when(repository.findLatestTimestampBySensorId(PUMP.id())).thenReturn(Optional.empty());

        TrendResponse trend = new SensorService(repository).getTrend(PUMP.id(), 1);

        assertTrue(trend.readings().isEmpty());
        assertEquals(0, trend.summary().count());
        assertEquals(0, trend.summary().anomalyCount());
        assertEquals(1, trend.hours());
    }

    @Test
    void rejectsUnsupportedHoursBeforeQueryingTheRepository() {
        SensorRepository repository = mock(SensorRepository.class);

        ResponseStatusException error = assertThrows(
                ResponseStatusException.class,
                () -> new SensorService(repository).getTrend(PUMP.id(), 2));

        assertEquals(400, error.getStatusCode().value());
        verifyNoInteractions(repository);
    }
}
