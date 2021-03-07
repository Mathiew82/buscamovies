import { useState } from "react";

const useToggleFavorite = (movieId) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkedFilm, setCheckedFilm] = useState(false);

  const checkIfItsFavorite = () => {
    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );
    if (!favoriteMovies) favoriteMovies = [];

    const findCurrentMovie = favoriteMovies.find(
      (item) => item.id === Number(movieId)
    );

    return typeof findCurrentMovie !== "undefined" ? true : false;
  };

  if (!checkedFilm) {
    setIsFavorite(checkIfItsFavorite);
    setCheckedFilm(true);
  }

  const addToFavorites = (event) => {
    const currentMovie = JSON.parse(event.target.dataset.movie);

    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );
    if (!favoriteMovies) favoriteMovies = [];

    favoriteMovies.push(currentMovie);

    window.localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(favoriteMovies)
    );

    setIsFavorite(true);
  };

  const removeToFavorites = (event) => {
    const currentMovie = JSON.parse(event.target.dataset.movie);

    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );

    const movieToDelete = favoriteMovies.find(
      (item) => item.id === currentMovie.id
    );
    const moviePositionInArray = favoriteMovies.indexOf(movieToDelete);
    favoriteMovies.splice(moviePositionInArray, 1);

    window.localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(favoriteMovies)
    );

    setIsFavorite(false);
  };

  const isAddedToFavorites = () => {
    return isFavorite;
  };

  return {
    isAddedToFavorites,
    addToFavorites,
    removeToFavorites,
  };
};

export default useToggleFavorite;
