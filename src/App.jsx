import { useEffect, useState } from "react";

const conversions = {
  "m-km": (v) => v / 1000,
  "m-ft": (v) => v * 3.28084,
  "km-mi": (v) => v * 0.621371,

  "kg-g": (v) => v * 1000,
  "kg-lb": (v) => v * 2.20462,
  "lb-kg": (v) => v / 2.20462,

  "c-f": (v) => (v * 9) / 5 + 32,
  "f-c": (v) => ((v - 32) * 5) / 9,

  "kmh-ms": (v) => v / 3.6,
  "ms-kmh": (v) => v * 3.6,
};

const unitPairs = [
  { id: "m-km", label: "Meter → Kilometer" },
  { id: "m-ft", label: "Meter → Feet" },
  { id: "km-mi", label: "Kilometer → Mile" },
  { id: "kg-g", label: "Kilogram → Gram" },
  { id: "kg-lb", label: "Kilogram → Pound" },
  { id: "lb-kg", label: "Pound → Kilogram" },
  { id: "c-f", label: "Celsius → Fahrenheit" },
  { id: "f-c", label: "Fahrenheit → Celsius" },
  { id: "kmh-ms", label: "Km/h → m/s" },
  { id: "ms-kmh", label: "m/s → Km/h" },
];

import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [pair, setPair] = useState("m-km");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load history & favorites
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")) || []);
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  // Realtime conversion
  useEffect(() => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult("");
      return;
    }
    const converted = conversions[pair](num);
    setResult(converted.toFixed(4));
  }, [value, pair]);

  // Save history (debounced feel)
  useEffect(() => {
    if (!result) return;

    const entry = {
      id: Date.now(),
      text: `${value} → ${result} (${pair})`,
    };

    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  }, [result]);

  const swapUnits = () => {
    const [a, b] = pair.split("-");
    const swapped = `${b}-${a}`;
    if (conversions[swapped]) setPair(swapped);
  };

  const toggleFavorite = () => {
    let updated;
    if (favorites.includes(pair)) {
      updated = favorites.filter((f) => f !== pair);
    } else {
      updated = [...favorites, pair];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-slate-800">
          Unit Converter
        </h1>

        {/* Input */}
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Select */}
        <div className="flex gap-2">
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          >
            {unitPairs.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>

          <button
            onClick={swapUnits}
            className="px-3 rounded-lg border hover:bg-slate-100"
          >
            ↔
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

        {/* Result */}
        {result && (
          <div className="text-center text-xl font-semibold text-blue-700">
            {result}
          </div>
        )}

        {/* Favorites */}
        <button
          onClick={toggleFavorite}
          className="text-sm text-yellow-600 hover:underline"
        >
          ⭐ {favorites.includes(pair) ? "Remove Favorite" : "Add to Favorites"}
        </button>

        {/* History */}
        <div>
          <h2 className="font-semibold text-slate-700 mb-2">Recent History</h2>
          {history.length === 0 ? (
            <p className="text-sm text-slate-400">No conversions yet</p>
          ) : (
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {history.map((h) => (
                <li
                  key={h.id}
                  className="text-xs bg-slate-100 rounded px-2 py-1"
                >
                  {h.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Favorites Quick Select */}
        {favorites.length > 0 && (
          <div>
            <h2 className="font-semibold text-slate-700 mb-1">Favorites</h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map((f) => (
                <button
                  key={f}
                  onClick={() => setPair(f)}
                  className="text-xs px-2 py-1 bg-yellow-100 rounded"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
