INSERT INTO sensors (id, name, unit, normal_min, normal_max)
VALUES
    ('reactor-temp', 'Reactor Temperature', '°C', 60.0, 80.0),
    ('pump-pressure', 'Pump Pressure', 'bar', 2.0, 5.0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO readings (sensor_id, observed_at, value)
SELECT
    'reactor-temp',
    TIMESTAMPTZ '2026-10-01T00:00:00Z' + i * INTERVAL '30 minutes',
    CASE
        WHEN i = 12 THEN 86.0
        WHEN i = 36 THEN 88.0
        ELSE 70.0 + ((i % 5) - 2)
    END
FROM generate_series(0, 47) AS series(i)
ON CONFLICT (sensor_id, observed_at) DO NOTHING;

INSERT INTO readings (sensor_id, observed_at, value)
SELECT
    'pump-pressure',
    TIMESTAMPTZ '2026-10-01T00:00:00Z' + i * INTERVAL '30 minutes',
    CASE
        WHEN i = 12 THEN 5.8
        WHEN i = 36 THEN 5.9
        ELSE 3.5 + 0.1 * ((i % 5) - 2)
    END
FROM generate_series(0, 47) AS series(i)
ON CONFLICT (sensor_id, observed_at) DO NOTHING;
