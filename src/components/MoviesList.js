import React from "react";
import PropTypes from "prop-types";
import Movie from "./Movie";

function MoviesList(props) {
  const { movies } = props;

  return (
    <ul className="movies-list">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array,
};

export default MoviesList;
