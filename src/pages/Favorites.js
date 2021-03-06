import React, { useState } from "react";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";
import Movie from "../components/Movie";

function Favorites() {
  const [movies, setMovies] = useState([]);

  if (movies.length === 0) {
    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );

    favoriteMovies = favoriteMovies.map((movie) => {
      movie.isFavorite = true;
      return movie;
    });

    setMovies(favoriteMovies);
  }

  return (
    <div className="favorites-page">
      <Header />
      <Title>Mis Favoritos</Title>

      {movies.length > 0 ? (
        <ul className="movies-list">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <div className="no-movie-results">
          No tienes películas agregadas a favoritos
        </div>
      )}
    </div>
  );
}

export default Favorites;
