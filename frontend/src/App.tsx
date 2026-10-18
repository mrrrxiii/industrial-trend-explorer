import './App.css'
import { SensorDetails } from './components/SensorDetails';
import { sensors } from './demoData';
import { useState } from 'react';
import { SensorSelector } from './components/SensorSelector';
import { createReadings } from './demoData';
import { TrendChart } from './components/TrendChart';
import { summarize } from './demoData';
import { SummaryCards } from './components/SummaryCards';



function App() {
  const [selectedSensorId, setSelectedSensorId] = useState('reactor-temp');
  const selectedSensor = sensors.find(sensor => sensor.id === selectedSensorId);
  const readings = createReadings(selectedSensorId);
  const summary = summarize(readings);

  return (
    <main>
      <h1>Industrial Trend Explorer</h1>
      <p>SIMULATED DATA — NOT LIVE INDUSTRIAL DATA</p>
      <SensorSelector
        sensors={sensors}
        selectedId={selectedSensorId}
        onChange={setSelectedSensorId}
      />

      {selectedSensor && <SensorDetails sensor={selectedSensor} />}
      {selectedSensor && <TrendChart readings={readings} unit={selectedSensor.unit} />}
      <SummaryCards summary={summary} />
    </main>
  );
}
export default App;