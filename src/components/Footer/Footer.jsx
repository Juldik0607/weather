import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} WeatherApp — создано с ❤️{" "}
        <em>Yuliia Dikova</em>
      </p>
      <p>
        Данные предоставлены{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeather
        </a>
      </p>
    </footer>
  );
};

export default Footer;
