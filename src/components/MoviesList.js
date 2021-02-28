import React, { Component } from "react";
import PropTypes from "prop-types";
import { Movie } from "./Movie";

export class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array,
  };

  render() {
    const { movies } = this.props;

    return (
      <ul className="movies-list">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </ul>
    );
  }
}
