import React, { useState } from "react";

// BMICalculator.jsx
// Single-file React component (default export). Uses Tailwind CSS classes for styling.

export default function BMICalculator() {
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(170); // cm
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  function calculateBMI(e) {
    e && e.preventDefault();
    setError("");

    const w = parseFloat(weight);
    const hCm = parseFloat(height);
    if (Number.isNaN(w) || Number.isNaN(hCm) || w <= 0 || hCm <= 0) {
      setError("Please enter valid positive numbers for weight and height.");
      setBmi(null);
      setCategory("");
      return;
    }

    const h = hCm / 100; // convert cm to meters
    const value = w / (h * h);
    const rounded = Math.round(value * 10) / 10; // 1 decimal place

    setBmi(rounded);
    setCategory(getCategory(rounded));
  }

  function getCategory(value) {
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal weight";
    if (value < 30) return "Overweight";
    return "Obesity";
  }

  function resetForm() {
    setWeight(70);
    setHeight(170);
    setBmi(null);
    setCategory("");
    setError("");
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg ring-1 ring-black/5">
      <h2 className="text-2xl font-semibold mb-2">BMI Calculator</h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter your weight (kg) and height (cm) — BMI and category show after you
        calculate.
      </p>

      <form onSubmit={calculateBMI} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Weight (kg)</span>
            <input
              type="number"
              inputMode="decimal"
              min="1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Weight in kilograms"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Height (cm)</span>
            <input
              type="number"
              inputMode="decimal"
              min="30"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Height in centimeters"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            onClick={calculateBMI}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            Calculate
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => {
              if (bmi === null) return;
              navigator.clipboard
                ?.writeText(`${bmi} (${category})`)
                .catch(() => {});
            }}
            className="px-3 py-2 rounded-lg border ml-auto disabled:opacity-50"
            disabled={bmi === null}
            aria-disabled={bmi === null}
          >
            Copy Result
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 rounded-lg border bg-gray-50">
        <h3 className="text-lg font-medium">Result</h3>
        {bmi === null ? (
          <p className="text-sm text-gray-500">
            No result yet — enter values and click Calculate.
          </p>
        ) : (
          <div className="mt-2">
            <p className="text-3xl font-bold">{bmi}</p>
            <p className="mt-1 text-sm">
              Category: <span className="font-semibold">{category}</span>
            </p>

            <div className="mt-3 text-sm text-gray-600">
              <p>
                <strong>Guide:</strong>
              </p>
              <ul className="list-disc ml-5">
                <li>Underweight: &lt; 18.5</li>
                <li>Normal weight: 18.5 — 24.9</li>
                <li>Overweight: 25 — 29.9</li>
                <li>Obesity: ≥ 30</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-4 text-xs text-gray-400">
        Note: BMI is a rough estimate; it doesn't distinguish between muscle and
        fat. For medical advice, consult a professional.
      </footer>
    </div>
  );
}
