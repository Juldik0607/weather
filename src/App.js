import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import About from "./pages/About/About";
import Favourites from "./pages/Favourites/Favourites";
import Viewed from "./pages/Viewed/Viewed";
import "./styles/global.scss";

function App() {
  const [extraOptions, setExtraOptions] = useState({
    humidity: true,
    pressure: true,
    wind: true,
    uvi: false,
    precipitation: false,
  });

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });
  const addToFavourites = (city) => {
    if (!favourites.includes(city)) {
      const updated = [...favourites, city];
      setFavourites(updated);
      localStorage.setItem("favourites", JSON.stringify(updated));
    }
  };
  const [viewed, setViewed] = useState(() => {
    const stored = localStorage.getItem("viewed");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const syncViewed = () => {
      const stored = localStorage.getItem("viewed");
      setViewed(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("storage", syncViewed);
    return () => window.removeEventListener("storage", syncViewed);
  }, []);

  useEffect(() => {
    const syncFavourites = () => {
      const stored = localStorage.getItem("favourites");
      setFavourites(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("storage", syncFavourites);
    return () => window.removeEventListener("storage", syncFavourites);
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  extraOptions={extraOptions}
                  setExtraOptions={setExtraOptions}
                  favourites={favourites}
                  viewed={viewed}
                  setViewed={setViewed}
                  addToFavourites={addToFavourites}
                />
              }
            />
            <Route
              path="/settings"
              element={<Settings onChange={setExtraOptions} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/favourites"
              element={<Favourites favourites={favourites} />}
            />
            <Route path="/viewed" element={<Viewed viewed={viewed} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
