import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const CURRENT_URL = process.env.REACT_APP_CURRENT_WEATHER_URL;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export const getWeatherByCity = async (city) => {
  const coordRes = await axios.get(
    `${CURRENT_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  const { lat, lon } = coordRes.data.coord;

  const oneCallRes = await axios.get(
    `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru`
  );

  return {
    city: coordRes.data.name,
    lat,
    lon,
    current: oneCallRes.data.current,
    daily: oneCallRes.data.daily,
    hourly: oneCallRes.data.hourly,
  };
};

export const getWeatherByCoords = async (lat, lon) => {
  const currentCityRes = await axios.get(
    `${CURRENT_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  const oneCallRes = await axios.get(
    `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}&lang=ru`
  );

  const current = oneCallRes.data.current;
  const daily = oneCallRes.data.daily;
  const hourly = oneCallRes.data.hourly;

  return {
    city: currentCityRes.data.name,
    lat,
    lon,
    current,
    daily,
    hourly,
  };
};
