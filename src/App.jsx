import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Unit Converter
        </h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter value"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="w-full border rounded-lg px-3 py-2">
            <option>Length</option>
            <option>Weight</option>
            <option>Temperature</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;


