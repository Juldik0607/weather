import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Settings.scss";

const defaultOptions = {
  humidity: true,
  pressure: true,
  wind_speed: true,
};

const additionalOptionsList = [
  "clouds",
  "uvi",
  "visibility",
  "sunrise",
  "sunset",
];

const initialOptions = {
  ...defaultOptions,
  clouds: false,
  uvi: false,
  visibility: false,
  sunrise: false,
  sunset: false,
};

const Settings = ({ onChange }) => {
  const [options, setOptions] = useState(initialOptions);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    const saved = localStorage.getItem("weatherOptions");
    if (saved) {
      const parsed = JSON.parse(saved);
      setOptions({ ...defaultOptions, ...parsed });
      onChange?.({ ...defaultOptions, ...parsed });
    }
  }, [onChange]);

  const handleToggle = (key) => {
    const updated = { ...options, [key]: !options[key] };
    setOptions(updated);
    localStorage.setItem("weatherOptions", JSON.stringify(updated));
    onChange?.(updated);
  };

  const handleSaveAndGoBack = () => {
    localStorage.setItem("weatherOptions", JSON.stringify(options));
    onChange?.(options);
    navigate(from);
  };

  return (
    <div className="settings-page">
      <h2>Настройки отображения</h2>

      <h3>Отображаются всегда:</h3>
      <ul className="settings-list default-list">
        {Object.keys(defaultOptions).map((key) => (
          <li key={key}>
            <label>
              <input type="checkbox" checked={true} disabled />
              {getLabel(key)}
            </label>
          </li>
        ))}
      </ul>

      <h3>Дополнительные параметры:</h3>
      <ul className="settings-list additional-list">
        {additionalOptionsList.map((key) => (
          <li key={key}>
            <label>
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => handleToggle(key)}
              />
              {getLabel(key)}
            </label>
          </li>
        ))}
      </ul>

      <button className="ok-button" onClick={handleSaveAndGoBack}>
        OK
      </button>
    </div>
  );
};

const getLabel = (key) => {
  switch (key) {
    case "humidity":
      return "Влажность";
    case "pressure":
      return "Давление";
    case "wind_speed":
      return "Скорость ветра";
    case "clouds":
      return "Облачность";
    case "uvi":
      return "УФ-индекс";
    case "visibility":
      return "Видимость";
    case "sunrise":
      return "Восход солнца";
    case "sunset":
      return "Закат солнца";
    default:
      return key;
  }
};

export default Settings;
