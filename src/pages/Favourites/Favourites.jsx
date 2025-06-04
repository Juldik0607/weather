import React from "react";
import { useNavigate } from "react-router-dom";
import "./Favourites.scss";

const Favourites = ({ favourites = [] }) => {
  const navigate = useNavigate();

  const handleClick = (city) => {
    navigate("/", { state: { cityFromFav: city } });
  };

  return (
    <div className="favourites-page">
      <h2>⭐ Избранные города</h2>
      {favourites.length === 0 ? (
        <p>Вы ещё не добавили ни одного города в избранное.</p>
      ) : (
        <div className="favourites-grid">
          {favourites.map((city, index) => (
            <div
              key={index}
              className="favourite-card"
              onClick={() => handleClick(city)}
            >
              🌇 {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
