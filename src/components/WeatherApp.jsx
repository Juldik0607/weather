import React, { useEffect, useState } from "react";
import { fetchWeatherByCoords } from "../services/weatherService";
import WeatherCard from "./WeatherCard/WeatherCard";
import WeatherList from "./WeatherList/WeatherList";
import "../styles/weather.scss";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeatherByCoords(50.45, 30.52)
      .then(setWeatherData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!weatherData) return <p>Загрузка погоды...</p>;

  return (
    <div className="weather-app">
      <WeatherCard current={weatherData.current} />
      <WeatherList daily={weatherData.daily.slice(0, 5)} />
    </div>
  );
};

export default WeatherApp;
