import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">🌦️ WeatherApp</div>
      <nav className="nav">
        <NavLink to="/" end>
          🏠 Главная
        </NavLink>
        <NavLink
          to="/settings"
          state={{ from: location.pathname }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          🛠️ Настройки
        </NavLink>
        <NavLink
          to="/favourites"
          state={{ from: location.pathname }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          ⭐ Избранное
        </NavLink>
        <NavLink
          to="/viewed"
          state={{ from: location.pathname }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          🕵️‍♀️ Просмотренное
        </NavLink>
        <NavLink to="/about">ℹ️ Полезная информация</NavLink>
      </nav>
    </header>
  );
};

export default Header;
