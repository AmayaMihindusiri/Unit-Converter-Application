import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [type, setType] = useState("length");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  // Load history on app start
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("conversionHistory"));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult("Invalid input");
      return;
    }

    let output = "";

    if (type === "length") {
      output = `${num} m → ${(num * 3.28084).toFixed(2)} ft`;
    } else if (type === "weight") {
      output = `${num} kg → ${(num * 2.20462).toFixed(2)} lb`;
    } else if (type === "temperature") {
      output = `${num} °C → ${((num * 9) / 5 + 32).toFixed(2)} °F`;
    }

    const newEntry = {
      id: Date.now(),
      type,
      output,
    };

    const updatedHistory = [newEntry, ...history];

    setResult(output);
    setHistory(updatedHistory);
    localStorage.setItem(
      "conversionHistory",
      JSON.stringify(updatedHistory)
    );
  };

  const clearHistory = () => {
    localStorage.removeItem("conversionHistory");
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Unit Converter
        </h1>

        {/* Converter */}
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
            <option value="length">Length (m → ft)</option>
            <option value="weight">Weight (kg → lb)</option>
            <option value="temperature">Temperature (°C → °F)</option>
          </select>

          <button
            onClick={convert}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Convert
          </button>

          {result && (
            <div className="text-center font-medium text-slate-700">
              {result}
            </div>
          )}
        </div>

        {/* History */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-slate-700">History</h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-slate-400">No conversions yet</p>
          ) : (
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="text-sm bg-slate-100 rounded px-2 py-1"
                >
                  {item.output}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
