import React from "react";
import { useNavigate } from "react-router-dom";
import "./Viewed.scss";

const Viewed = ({ viewed = [] }) => {
  const navigate = useNavigate();

  const handleClick = (city) => {
    navigate("/", { state: { cityFromMemory: city } });
  };

  return (
    <div className="viewed-page">
      <h2>Просмотренные города</h2>
      <ul className="city-list">
        {viewed.map((city, index) => (
          <li key={index} onClick={() => handleClick(city)}>
            📍 {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Viewed;
