import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <h2>📘 О приложении</h2>

      <section>
        <h3>🛰️ Геолокация</h3>
        <p>
          При первом запуске приложение определяет ваше текущее местоположение с
          помощью <code>navigator.geolocation</code>. Если разрешено,
          отображается погода по координатам. Также можно вручную ввести
          название города.
        </p>
      </section>

      <section>
        <h3>🌤️ Погодный API</h3>
        <p>
          Используется <strong>One Call API 3.0</strong> от{" "}
          <a
            href="https://openweathermap.org/api/one-call-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenWeather
          </a>
          , который предоставляет:
        </p>
        <ul>
          <li>📍 Текущую погоду (температура, давление, влажность и др.);</li>
          <li>🕘 Почасовой прогноз (до 24 часов);</li>
          <li>📅 Прогноз на 7 дней;</li>
          <li>
            🧭 Дополнительные параметры: облачность, УФ-индекс, скорость и
            направление ветра, видимость и др.
          </li>
        </ul>
        <p>
          Для доступа к API необходим <strong>персональный ключ</strong>,
          который указывается в файле <code>.env</code>:
        </p>
        <pre>REACT_APP_WEATHER_API_KEY=your_api_key_here</pre>
      </section>

      <section>
        <h3>📚 Справочная информация о городе</h3>
        <p>
          Для отображения краткой справки о выбранном городе используется
          связка:
        </p>
        <ul>
          <li>
            <strong>Wikidata API</strong> — для точного определения, что это
            именно населённый пункт;
          </li>
          <li>
            <strong>Wikipedia API</strong> — для получения полноценного
            текстового описания на русском или украинском языке.
          </li>
        </ul>
        <p>
          Это позволяет исключить ошибки (например, путаницу с поездами или
          известными личностями) и выводить только актуальную информацию.
        </p>
      </section>

      <section>
        <h3>🗺️ Карта</h3>
        <p>
          Для визуализации положения города используется{" "}
          <a href="https://leafletjs.com/" target="_blank" rel="noreferrer">
            Leaflet.js
          </a>{" "}
          с данными OpenStreetMap.
        </p>
      </section>

      <section>
        <h3>⚙️ Настройки отображения</h3>
        <p>
          Пользователь может выбрать, какие дополнительные параметры показывать:
          влажность, облачность, УФ-индекс, восход и закат, видимость и др.
        </p>
        <p>
          Эти настройки сохраняются в <code>localStorage</code> и применяются
          автоматически при следующем запуске.
        </p>
      </section>

      <section>
        <h3>🧰 Технологии</h3>
        <ul>
          <li>React (хуки, маршруты, компоненты)</li>
          <li>SCSS-модули для стилизации</li>
          <li>Axios — для API-запросов</li>
          <li>React Router — для навигации</li>
          <li>Leaflet.js — для отображения карты</li>
          <li>Wikidata & Wikipedia REST APIs — для справочной информации</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
