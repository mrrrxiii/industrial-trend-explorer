import './App.css'
import { SensorDetails } from './components/SensorDetails';
import { SensorSelector } from './components/SensorSelector';
import { TrendChart } from './components/TrendChart';
import { useEffect, useState } from 'react';
import { getSensors, getTrend } from './api';
import type { Sensor, TrendResponse } from './types';
import { SummaryCards } from './components/SummaryCards';
import { AiExplanation } from './components/AiExplanation';

type LoadStatus = 'loading' | 'empty' | 'error' | 'success';

function App() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [sensorError, setSensorError] = useState<string | null>(null);
  const [trend, setTrend] = useState<TrendResponse | null>(null);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [trendError, setTrendError] = useState<string | null>(null);
  const [sensorsLoaded, setSensorsLoaded] = useState(false);
  const selectedSensor = sensors.find(sensor => sensor.id === selectedSensorId);

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
    setStatus('loading');
    setTrend(null);
    setTrendError(null);

    getTrend(selectedSensorId, controller.signal)
      .then(data => {
        setTrend(data);
        setStatus(data.readings.length === 0 ? 'empty' : 'success');
      })
      .catch(error => {
        if (controller.signal.aborted) return;
        setTrendError(error instanceof Error ? error.message : 'Unable to load trend');
        setStatus('error');
      });

    return () => controller.abort();
  }, [selectedSensorId]);

  return (
    <main>
      <h1>Industrial Trend Explorer</h1>
      <p>SIMULATED DATA — NOT LIVE INDUSTRIAL DATA</p>
      {sensorError && <p role="alert">Unable to load sensors: {sensorError}</p>}
      {!sensorError && !sensorsLoaded && <p>Loading sensors...</p>}
      {!sensorError && sensorsLoaded && sensors.length === 0 && <p>No sensors available.</p>}

      {!sensorError && sensors.length > 0 && (
        <>
          <SensorSelector
            sensors={sensors}
            selectedId={selectedSensorId}
            onChange={setSelectedSensorId}
          />
          {selectedSensor && <SensorDetails sensor={selectedSensor} />}
          {status === 'loading' && <p>Loading trend...</p>}
          {status === 'empty' && <p>No readings for this sensor.</p>}
          {status === 'error' && (
            <p role="alert">Unable to load trend: {trendError}</p>
          )}
          {status === 'success' && trend && selectedSensor && (
            <>
              <TrendChart readings={trend.readings} unit={trend.sensor.unit} />
              <SummaryCards summary={trend.summary} />
              <AiExplanation key={selectedSensorId} sensorId={selectedSensorId} />
            </>
          )}
        </>
      )}
    </main>
  );
}
export default App;