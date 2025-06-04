import React from "react";
import "./HourlyForecast.scss";

const HourlyForecast = ({ hourly }) => {
  const filteredHours = hourly.slice(0, 8);

  return (
    <div className="hourly-forecast">
      <h3>Почасовой прогноз на 24 часа</h3>
      <div className="hour-grid">
        {filteredHours.map((hour, index) => {
          const date = new Date(hour.dt * 1000);
          const time = date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div className="hour-card" key={index}>
              <p className="time">{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
              />
              <p>🌡️ {Math.round(hour.temp)}°C</p>
              <p>🤗 Ощущается как: {Math.round(hour.feels_like)}°C</p>
              <p>💧 Влажность: {hour.humidity}%</p>
              <p>🔽 Давление: {hour.pressure} hPa</p>
              <p>💨 Ветер: {hour.wind_speed} м/с</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
