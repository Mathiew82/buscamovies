import React, { Component } from "react";

export class MoviesList extends Component {
  render() {
    return (
      <ul className="movies-list">
        {this.props.movies.map((movie) => (
          <li key={movie.id}>
            <span
              className="movies-list__img"
              style={{
                backgroundImage: movie.poster_path
                  ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                  : `url(${process.env.PUBLIC_URL}/default-movie.png)`,
              }}
            >
              <span className="icon is-large">
                <i className="far fa-heart fa-2x"></i>
              </span>
              <span className="movies-list-popularity-value">
                {this.props.getPopularityInteger(movie.popularity)}
                <small>%</small>
              </span>
              <progress
                className={`progress ${
                  movie.popularity < 15 ? "is-danger" : ""
                } ${
                  movie.popularity >= 15 && movie.popularity < 30
                    ? "is-warning"
                    : ""
                } ${
                  movie.popularity >= 30 && movie.popularity < 50
                    ? "is-info"
                    : ""
                } ${movie.popularity >= 50 ? "is-primary" : ""}`}
                value={`${this.props.getPopularityInteger(movie.popularity)}`}
                max="100"
              />
            </span>
            <span className="movies-list__title">{movie.title}</span>
          </li>
        ))}
      </ul>
    );
  }
}
