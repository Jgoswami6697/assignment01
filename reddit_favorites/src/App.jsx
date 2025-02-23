import React, { useState } from "react";
import MainPage from "./MainPage";
import FavoritesPage from "./FavoritesPage";
import "./App.css";

function App() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [currentPage, setCurrentPage] = useState("search");

  
  const addToFavorites = (post) => {
    if (!favorites.includes(post.id)) {
      const updatedFavorites = [...favorites, post.id];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (postId) => {
    const updatedFavorites = favorites.filter((id) => id !== postId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Reddit Favorites</h1>
        <div className="nav-buttons">
          <button onClick={() => setCurrentPage("search")} className="nav-btn">Search</button>
          <button onClick={() => setCurrentPage("favorites")} className="nav-btn">Favorites</button>
        </div>
        <div className="author-name">By: Jaygiri Goswami</div>  
      </header>

      <div className="content">
        {currentPage === "search" ? (
          <MainPage addToFavorites={addToFavorites} />
        ) : (
          <FavoritesPage favorites={favorites} removeFavorite={removeFavorite} />
        )}
      </div>
    </div>
  );
}

export default App;
