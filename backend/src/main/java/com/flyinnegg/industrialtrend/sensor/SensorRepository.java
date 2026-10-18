package com.flyinnegg.industrialtrend.sensor;

import java.time.OffsetDateTime;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class SensorRepository {

    private final JdbcClient jdbcClient;

    public SensorRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Sensor> findAll() {
        return jdbcClient.sql("""
                SELECT id, name, unit, normal_min, normal_max
                FROM sensors
                ORDER BY id
                """)
                .query((resultSet, rowNumber) -> new Sensor(
                        resultSet.getString("id"),
                        resultSet.getString("name"),
                        resultSet.getString("unit"),
                        resultSet.getDouble("normal_min"),
                        resultSet.getDouble("normal_max")))
                .list();
    }

    public Optional<Sensor> findById(String sensorId) {
        return jdbcClient.sql("""
                SELECT id, name, unit, normal_min, normal_max
                FROM sensors
                WHERE id = :sensorId
                """)
                .param("sensorId", sensorId)
                .query((resultSet, rowNumber) -> new Sensor(
                        resultSet.getString("id"),
                        resultSet.getString("name"),
                        resultSet.getString("unit"),
                        resultSet.getDouble("normal_min"),
                        resultSet.getDouble("normal_max")))
                .optional();
    }

    public Optional<Instant> findLatestTimestampBySensorId(String sensorId) {
        return jdbcClient.sql("""
                SELECT observed_at
                FROM readings
                WHERE sensor_id = :sensorId
                ORDER BY observed_at DESC
                LIMIT 1
                """)
                .param("sensorId", sensorId)
                .query((resultSet, rowNumber) ->
                        resultSet.getObject("observed_at", OffsetDateTime.class).toInstant())
                .optional();
    }

    public List<StoredReading> findReadingsBySensorIdBetween(
            String sensorId,
            Instant startTimestamp,
            Instant endTimestamp) {
        return jdbcClient.sql("""
                SELECT observed_at, value
                FROM readings
                WHERE sensor_id = :sensorId
                  AND observed_at >= :startTimestamp
                  AND observed_at <= :endTimestamp
                ORDER BY observed_at
                """)
                .param("sensorId", sensorId)
                .param("startTimestamp", OffsetDateTime.ofInstant(startTimestamp, ZoneOffset.UTC))
                .param("endTimestamp", OffsetDateTime.ofInstant(endTimestamp, ZoneOffset.UTC))
                .query((resultSet, rowNumber) -> new StoredReading(
                        resultSet.getObject("observed_at", OffsetDateTime.class).toInstant(),
                        resultSet.getDouble("value")))
                .list();
    }
}
