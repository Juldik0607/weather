import React from "react";
import "./WeatherList";

const WeatherList = ({ dayData, city, dayLabel = "сегодня" }) => {
  if (!dayData || !dayData.weather || !Array.isArray(dayData.weather)) {
    return <p>Нет данных для отображения.</p>;
  }

  const { temp, feels_like, weather, humidity, pressure, wind_speed } = dayData;

  return (
    <div className="weather-list">
      <h2>
        Прогноз в {city} на {dayLabel}
      </h2>
      <p>{weather[0]?.description || "Описание недоступно"}</p>
      <p>
        🌡️ Температура: день {temp?.day}°C / ночь {temp?.night}°C
      </p>
      <p>
        🤗 Ощущается как: день {feels_like?.day}°C / ночь {feels_like?.night}°C
      </p>
      <p>💧 Влажность: {humidity}%</p>
      <p>🔽 Давление: {pressure} hPa</p>
      <p>💨 Ветер: {wind_speed} м/с</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
        alt="Иконка погоды"
      />
    </div>
  );
};

export default WeatherList;
