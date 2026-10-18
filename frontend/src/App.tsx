import { SensorDetails } from './components/SensorDetails';
import { SensorSelector } from './components/SensorSelector';
import { TrendChart } from './components/TrendChart';
import { useEffect, useState } from 'react';
import { getSensors, getTrend } from './api';
import type { Sensor, TimeRangeHours, TrendResponse } from './types';
import { SummaryCards } from './components/SummaryCards';
import { AiExplanation } from './components/AiExplanation';
import { AnomalyList } from './components/AnomalyList';
import { TimeRangeSelector } from './components/TimeRangeSelector';

type LoadStatus = 'loading' | 'empty' | 'error' | 'success';

function App() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [timeRangeHours, setTimeRangeHours] = useState<TimeRangeHours>(24);
  const [sensorError, setSensorError] = useState<string | null>(null);
  const [trend, setTrend] = useState<TrendResponse | null>(null);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [trendError, setTrendError] = useState<string | null>(null);
  const [sensorsLoaded, setSensorsLoaded] = useState(false);
  const selectedSensor = sensors.find(sensor => sensor.id === selectedSensorId);

  function handleSensorChange(id: string) {
    setStatus('loading');
    setTrend(null);
    setTrendError(null);
    setSelectedSensorId(id);
  }

  function handleTimeRangeChange(hours: TimeRangeHours) {
    setStatus('loading');
    setTrend(null);
    setTrendError(null);
    setTimeRangeHours(hours);
  }

  useEffect(() => {
    getSensors()
      .then(data => {
        setSensors(data);
        if (data.length > 0) setSelectedSensorId(data[0].id);
      })
      .catch(error => {
        setSensorError(error instanceof Error ? error.message : 'Unable to load sensors');
      })
      .finally(() => setSensorsLoaded(true));
  }, []);

  useEffect(() => {
    if (!selectedSensorId) return;

    const controller = new AbortController();

    getTrend(selectedSensorId, timeRangeHours, controller.signal)
      .then(data => {
        if (controller.signal.aborted) return;
        setTrend(data);
        setStatus(data.readings.length === 0 ? 'empty' : 'success');
      })
      .catch(error => {
        if (controller.signal.aborted) return;
        setTrendError(error instanceof Error ? error.message : 'Unable to load trend');
        setStatus('error');
      });

    return () => controller.abort();
  }, [selectedSensorId, timeRangeHours]);

  return (
    <div className="app-shell">
      <header className="panel dashboard-header">
        <div className="dashboard-heading">
          <p className="eyebrow">Industrial analytics demo</p>
          <h1>Industrial Trend Explorer</h1>
          <p className="dashboard-subtitle">
            Explore sensor trends, anomalies, and grounded explanations.
          </p>
        </div>
        <p className="data-notice">
          <span aria-hidden="true">●</span>
          Simulated data — not live industrial data
        </p>
      </header>

      <main className="dashboard-content">
      {sensorError && <p className="panel status-message status-message--error" role="alert">Unable to load sensors: {sensorError}</p>}
      {!sensorError && !sensorsLoaded && <p className="status-message">Loading sensors...</p>}
      {!sensorError && sensorsLoaded && sensors.length === 0 && <p className="status-message">No sensors available.</p>}

      {!sensorError && sensors.length > 0 && (
        <div className="sensor-content">
          <section className="panel sensor-context" aria-labelledby="sensor-context-heading">
            {selectedSensor && <SensorDetails sensor={selectedSensor} />}
            <SensorSelector
              sensors={sensors}
              selectedId={selectedSensorId}
              onChange={handleSensorChange}
            />
            <TimeRangeSelector
              value={timeRangeHours}
              onChange={handleTimeRangeChange}
            />
          </section>
          {status === 'loading' && <p className="panel status-message">Loading trend...</p>}
          {status === 'empty' && <p className="panel status-message">No readings available for the selected time range.</p>}
          {status === 'error' && (
            <p className="panel status-message status-message--error" role="alert">Unable to load trend: {trendError}</p>
          )}
          {status === 'success' && trend?.sensor.id === selectedSensorId && selectedSensor && (
            <>
              <SummaryCards summary={trend.summary} unit={trend.sensor.unit} />
              <TrendChart
                readings={trend.readings}
                hours={timeRangeHours}
                unit={trend.sensor.unit}
                sensorName={trend.sensor.name}
                normalMin={trend.sensor.normalMin}
                normalMax={trend.sensor.normalMax}
              />
              <div className="insight-panels">
                <AnomalyList
                  readings={trend.readings}
                  unit={trend.sensor.unit}
                  normalMin={trend.sensor.normalMin}
                  normalMax={trend.sensor.normalMax}
                />
                <AiExplanation
                  key={`${selectedSensorId}-${timeRangeHours}`}
                  sensorId={selectedSensorId}
                  hours={timeRangeHours}
                />
              </div>
            </>
          )}
        </div>
      )}
      </main>
    </div>
  );
}
export default App;