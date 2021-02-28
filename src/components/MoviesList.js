import React, { Component } from "react";
import { Movie } from "./Movie";

export class MoviesList extends Component {
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
