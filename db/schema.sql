CREATE TABLE IF NOT EXISTS sensors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    normal_min DOUBLE PRECISION NOT NULL,
    normal_max DOUBLE PRECISION NOT NULL,
    CHECK (normal_min < normal_max)
);

CREATE TABLE IF NOT EXISTS readings (
    sensor_id TEXT NOT NULL REFERENCES sensors(id),
    observed_at TIMESTAMPTZ NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (sensor_id, observed_at)
);
