import React from "react";
import "./WeatherCard.scss";

const WeatherCard = ({ weather, onAddToFavourites }) => {
  const handleAdd = () => {
    console.log("Добавляем в избранное:", weather.city);
    if (weather.city) {
      onAddToFavourites(weather.city);
      alert(`${weather.city} добавлен в избранное!`);
    } else {
      alert("Город не определён!");
    }
  };

  return (
    <div className="weather-card">
      <div className="card-header">
        <h3>{weather.city}</h3>
        <button
          className="fav-btn"
          onClick={handleAdd}
          title="Добавить в избранное"
        >
          ⭐
        </button>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
      />
      <p>{weather.description}</p>
      <p>🌡️ {Math.round(weather.temp)}°C</p>
      <p>🤗 Ощущается как: {Math.round(weather.feels_like)}°C</p>
      <p>💧 Влажность: {weather.humidity}%</p>
      <p>🔽 Давление: {weather.pressure} гПа</p>
      <p>💨 Ветер: {weather.wind_speed} м/с</p>
    </div>
  );
};

export default WeatherCard;
