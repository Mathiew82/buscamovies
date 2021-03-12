import React, { useState } from "react";
import Header from "../../components/ui/Header/Header";
import Title from "../../components/ui/Title/Title";
import Movie from "../../components/Movie/Movie";

function Favorites() {
  const [movies, setMovies] = useState([]);
  const [favoriteMoviesAdded, setFavoriteMoviesAdded] = useState(false);

  const setFavoriteMovies = () => {
    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );

    if (favoriteMovies) {
      favoriteMovies = favoriteMovies.map((movie) => {
        movie.isFavorite = true;
        return movie;
      });
    }

    if (!favoriteMovies) favoriteMovies = [];

    if (movies !== favoriteMovies) setMovies(favoriteMovies);
  };

  if (!favoriteMoviesAdded) {
    setFavoriteMovies();
    setFavoriteMoviesAdded(true);
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
