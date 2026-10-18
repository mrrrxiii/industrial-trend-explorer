package com.flyinnegg.industrialtrend.sensor;

import java.time.OffsetDateTime;
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

    public List<StoredReading> findReadingsBySensorId(String sensorId) {
        return jdbcClient.sql("""
                SELECT observed_at, value
                FROM readings
                WHERE sensor_id = :sensorId
                ORDER BY observed_at
                """)
                .param("sensorId", sensorId)
                .query((resultSet, rowNumber) -> new StoredReading(
                        resultSet.getObject("observed_at", OffsetDateTime.class).toInstant(),
                        resultSet.getDouble("value")))
                .list();
    }
}
