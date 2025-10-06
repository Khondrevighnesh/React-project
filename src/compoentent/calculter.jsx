import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function Calculator() {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (/^[0-9+\-*/.=]$/.test(key)) {
        if (key === "=") {
          handleEqual();
        } else {
          setInput((prev) => prev + key);
        }
      } else if (key === "Enter") {
        handleEqual();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  // Evaluate the expression
  const handleEqual = () => {
    try {
      const result = eval(input);
      setHistory((prev) => [`${input} = ${result}`, ...prev.slice(0, 9)]);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleClear = () => setInput("");

  const handleClick = (val) => {
    if (val === "=") {
      handleEqual();
    } else {
      setInput((prev) => prev + val);
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen flex items-center justify-center transition-colors`}
    >
      <div className="w-full max-w-md p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">React Calculator</h1>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Display Input */}
        <input
          type="text"
          value={input}
          readOnly
          className="w-full text-right text-2xl p-3 mb-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
        />

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className="p-4 text-xl rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="col-span-4 p-4 bg-red-500 hover:bg-red-600 text-white text-xl rounded transition"
          >
            C
          </button>
        </div>

        {/* History Panel */}
        <div>
          <h2 className="font-semibold text-lg mb-2">History</h2>
          <div className="max-h-32 overflow-y-auto border rounded p-2 text-sm bg-gray-50 dark:bg-gray-700">
            {history.length === 0 ? (
              <p className="text-gray-400 dark:text-gray-300">
                No calculations yet.
              </p>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  className="py-1 border-b border-gray-200 dark:border-gray-600 last:border-0"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
