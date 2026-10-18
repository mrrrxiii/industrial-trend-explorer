import './App.css'
import type { Sensor } from './types';
import { SensorDetails } from './components/SensorDetails';
import { sensors } from './demoData';

const sensor: Sensor = {
  id: 'reactor-temp',
  name: 'Reactor Temperature',
  unit: '°C',
  normalMin: 60,
  normalMax: 80,
};

function App() {
  return (
    <main>
      <h1>Industrial Trend Explorer</h1>
      <p>SIMULATED DATA — NOT LIVE INDUSTRIAL DATA</p>
      <label htmlFor="sensor">Choose a sensor:</label>
      <select id="sensor" defaultValue={sensors[0].id}>
        {sensors.map(sensor => (
          <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
        ))}
      </select>
      <SensorDetails sensor={sensor} />
    </main>
  );
}
export default App;