import React, { useState } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=16.7&longitude=74.2&current_weather=true`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-6">🌤 Modern Weather App</h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city..."
          className="p-3 rounded-l-lg text-black focus:outline-none w-64"
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-blue-500 font-bold px-6 rounded-r-lg hover:bg-gray-200 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-200">{error}</p>}

      {weather && (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-center shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-2">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-6xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize">{weather.weather[0].description}</p>
          <div className="flex justify-between mt-4 text-sm">
            <span>Humidity: {weather.main.humidity}%</span>
            <span>Wind: {weather.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </div>
  );
}
