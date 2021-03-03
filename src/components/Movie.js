import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Movie(props) {
  const [isFavorite, setIsFavorite] = useState(props.movie.isFavorite);

  const getVoteAverageInteger = (value) => {
    return value * 10;
  };

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

  const { movie } = props;
  const voteAverage = getVoteAverageInteger(movie.vote_average);

  return (
    <li>
      <Link to={`/pelicula/${movie.id}`}>
        <span
          className="movies-list__img"
          style={{
            backgroundImage: movie.poster_path
              ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
              : `url(${process.env.PUBLIC_URL}/default-movie.png)`,
          }}
        >
          <span className="icon-wrapper">
            <span
              className="click-zone"
              data-movie={JSON.stringify(movie)}
              onClick={
                isAddedToFavorites() ? removeToFavorites : addToFavorites
              }
            />
            {isAddedToFavorites() ? (
              <i className="icon icon-heart" />
            ) : (
              <i className="icon icon-heart-empty" />
            )}
          </span>
          <span className="movies-list-vote-average-value">
            {voteAverage}
            <small>%</small>
          </span>
          <progress
            className={`progress ${voteAverage < 15 ? "is-danger" : ""} ${
              voteAverage >= 15 && voteAverage < 30 ? "is-warning" : ""
            } ${voteAverage >= 30 && voteAverage < 50 ? "is-info" : ""} ${
              voteAverage >= 50 ? "is-primary" : ""
            }`}
            value={`${voteAverage}`}
            max="100"
          />
        </span>
        <span className="movies-list__title" title={movie.title}>
          {movie.title}
        </span>
      </Link>
    </li>
  );
}

Movie.propTypes = {
  movie: PropTypes.object,
};

export default Movie;
