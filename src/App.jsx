import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [value, setValue] = useState("");
  const [type, setType] = useState("length");
  const [result, setResult] = useState(null);

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult("Invalid input");
      return;
    }

    let converted;

    if (type === "length") {
      converted = `${num} meters = ${(num * 3.28084).toFixed(2)} feet`;
    } else if (type === "weight") {
      converted = `${num} kg = ${(num * 2.20462).toFixed(2)} lbs`;
    } else if (type === "temperature") {
      converted = `${num} °C = ${((num * 9) / 5 + 32).toFixed(2)} °F`;
    }

    setResult(converted);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Unit Converter
        </h1>

        <div className="space-y-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="length">Length (meters → feet)</option>
            <option value="weight">Weight (kg → lbs)</option>
            <option value="temperature">Temperature (°C → °F)</option>
          </select>

          <button
            onClick={convert}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Convert
          </button>

          {result && (
            <div className="text-center text-lg font-medium text-slate-700">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
