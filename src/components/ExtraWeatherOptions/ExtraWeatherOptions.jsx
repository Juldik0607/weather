import React from "react";
import "./ExtraWeatherOptions.scss";

const ExtraWeatherOptions = ({ weather, selectedOptions }) => {
  if (!weather || !selectedOptions) return null;

  const formatUnixTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="extra-weather">
      {selectedOptions.wind && <p>💨 Ветер: {weather.wind_speed} м/с</p>}
      {selectedOptions.pressure && <p>🔽 Давление: {weather.pressure} гПа</p>}
      {selectedOptions.humidity && <p>💧 Влажность: {weather.humidity}%</p>}
      {selectedOptions.clouds && <p>🌥️ Облачность: {weather.clouds}%</p>}
      {selectedOptions.uvi && <p>🔆 УФ-индекс: {weather.uvi}</p>}
      {selectedOptions.visibility && weather.visibility !== undefined && (
        <p>👁️ Видимость: {(weather.visibility / 1000).toFixed(1)} км</p>
      )}
      {selectedOptions.sunrise && (
        <p>🌅 Восход: {formatUnixTime(weather.sunrise)}</p>
      )}
      {selectedOptions.sunset && (
        <p>🌇 Закат: {formatUnixTime(weather.sunset)}</p>
      )}
    </div>
  );
};

export default ExtraWeatherOptions;
