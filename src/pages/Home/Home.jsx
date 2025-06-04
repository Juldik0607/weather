import React, { useEffect, useState, useCallback } from "react";
import "./Home.scss";
import CityMap from "../../components/CityMap/CityMap";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import WeatherList from "../../components/WeatherList/WeatherList";
import HourlyForecast from "../../components/HourlyForecast/HourlyForecast";
import ExtraWeatherOptions from "../../components/ExtraWeatherOptions/ExtraWeatherOptions";
import { getCitySummary } from "../../services/CityInfoService";
import { useLocation } from "react-router-dom";
import {
  getWeatherByCity,
  getWeatherByCoords,
} from "../../services/WeatherServices";

const Home = ({ extraOptions, viewed, setViewed, addToFavourites }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("today");
  const [currentCity, setCurrentCity] = useState("Ваше местоположение");
  const [cityInfo, setCityInfo] = useState("");

  const [expandedDay, setExpandedDay] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const newCity =
      location.state?.cityFromFav || location.state?.cityFromMemory;

    if (newCity) {
      fetchCityWeather(newCity);
    }
  }, [
    location.state?.cityFromFav,
    location.state?.cityFromMemory,
    currentCity,
  ]);

  const fetchCityWeather = useCallback(
    async (cityName) => {
      setWeather(null);
      setError("");
      setCityInfo("");
      const targetCity = cityName || city;
      setCity(targetCity);
      if (!targetCity) return;
      try {
        const data = await getWeatherByCity(targetCity);
        setWeather(data);
        setCurrentCity(data.city);
        localStorage.setItem("lastCity", data.city);

        if (!viewed.includes(data.city)) {
          const updated = [...viewed, data.city];
          setViewed(updated);
          localStorage.setItem("viewed", JSON.stringify(updated));
        }

        const info = await getCitySummary(data.city);
        setCityInfo(info);
        setError("");
      } catch (err) {
        setError("Город не найден");
      }
    },
    [city, viewed]
  );

  const fetchCoordsWeather = async (lat, lon) => {
    try {
      const data = await getWeatherByCoords(lat, lon);
      setWeather(data);
      setCurrentCity(data.city);
      localStorage.removeItem("lastCity");
      const info = await getCitySummary(data.city);
      setCityInfo(info);
      setError("");
    } catch (err) {
      setError("Ошибка при получении погоды");
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      fetchCityWeather(savedCity);
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchCoordsWeather(coords.latitude, coords.longitude),
        () => setError("Геолокация недоступна")
      );
    }
  }, []);

  return (
    <div className="home-page">
      <h1>Погода</h1>

      <input
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchCityWeather()}
      />

      {error && <p className="error">{error}</p>}

      {weather && (
        <>
          <h2 className="city-name">Прогноз по городу {currentCity}</h2>

          <div className="weather-tabs">
            {["now", "today", "tomorrow", "week"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "active" : ""}
              >
                {
                  {
                    now: "Сейчас",
                    today: "Сегодня",
                    tomorrow: "Завтра",
                    week: "Неделя",
                  }[tab]
                }
              </button>
            ))}
          </div>

          <div className="weather-layout">
            <div className="weather-left">
              <div className="weather-content">
                {activeTab === "now" && weather.current && (
                  <>
                    <WeatherCard
                      weather={{
                        city: currentCity,
                        temp: weather.current.temp,
                        feels_like: weather.current.feels_like,
                        description: weather.current.weather[0].description,
                        icon: weather.current.weather[0].icon,
                        wind_speed: weather.current.wind_speed,
                        humidity: weather.current.humidity,
                        pressure: weather.current.pressure,
                      }}
                      onAddToFavourites={addToFavourites}
                    />

                    <ExtraWeatherOptions
                      weather={weather.current}
                      selectedOptions={extraOptions}
                    />
                  </>
                )}

                {activeTab === "today" && weather.daily?.[0] && (
                  <div className="today-section">
                    <WeatherList
                      dayData={weather.daily[0]}
                      city={currentCity}
                      dayLabel="сегодня"
                    />
                    <ExtraWeatherOptions
                      weather={weather.daily[0]}
                      selectedOptions={extraOptions}
                    />
                    {Array.isArray(weather.hourly) && (
                      <HourlyForecast hourly={weather.hourly} />
                    )}
                  </div>
                )}

                {activeTab === "tomorrow" && weather.daily?.[1] && (
                  <>
                    <WeatherList
                      dayData={weather.daily[1]}
                      city={currentCity}
                      dayLabel="завтра"
                    />
                    <ExtraWeatherOptions
                      weather={weather.daily[1]}
                      selectedOptions={extraOptions}
                    />
                  </>
                )}
                {activeTab === "week" && weather.daily?.length > 0 && (
                  <div className="week-section">
                    <h3>Прогноз на 7 дней</h3>
                    <div className="week-grid">
                      {weather.daily.map((day, index) => (
                        <div
                          className="day-card"
                          key={index}
                          onClick={() =>
                            setExpandedDay(expandedDay === index ? null : index)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <p>
                            <strong>
                              {new Date(day.dt * 1000).toLocaleDateString(
                                "ru-RU",
                                {
                                  weekday: "short",
                                }
                              )}
                            </strong>
                          </p>
                          <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                          />
                          <p>{day.weather[0].description}</p>
                          <p>🌡️ день: {Math.round(day.temp.day)}°C</p>
                          <p>🌡️ ночь: {Math.round(day.temp.night)}°C</p>

                          {expandedDay === index && (
                            <div className="day-details">
                              <p>🌅 Утро: {Math.round(day.temp.morn)}°C</p>
                              <p>🌇 Вечер: {Math.round(day.temp.eve)}°C</p>
                              <p>💧 Влажность: {day.humidity}%</p>
                              <p>🔽 Давление: {day.pressure} гПа</p>
                              <p>💨 Ветер: {day.wind_speed} м/с</p>
                              <p>
                                ☀️ Восход:{" "}
                                {new Date(
                                  day.sunrise * 1000
                                ).toLocaleTimeString("ru-RU", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <p>
                                🌒 Закат:{" "}
                                {new Date(day.sunset * 1000).toLocaleTimeString(
                                  "ru-RU",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                              <p>🔆 УФ-индекс: {day.uvi}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="weather-right">
              <div className="map-box">
                <p>
                  <strong>Карта</strong>
                </p>
                <CityMap
                  lat={weather?.lat}
                  lon={weather?.lon}
                  city={currentCity}
                />
              </div>
              <div className="info-box">
                <p>
                  <strong>Справка</strong>
                </p>
                <p>{cityInfo || "Нет информации о городе 😔"}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
