import React, { Component } from "react";

export class Movie extends Component {
  getPopularityInteger(value) {
    const valueInteger = parseInt(value);
    return valueInteger > 100 ? 100 : valueInteger;
  }

  render() {
    const { movie } = this.props;
    const popularity = this.getPopularityInteger(movie.popularity);

    return (
      <li>
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
            {popularity}
            <small>%</small>
          </span>
          <progress
            className={`progress ${popularity < 15 ? "is-danger" : ""} ${
              popularity >= 15 && popularity < 30 ? "is-warning" : ""
            } ${popularity >= 30 && popularity < 50 ? "is-info" : ""} ${
              popularity >= 50 ? "is-primary" : ""
            }`}
            value={`${popularity}`}
            max="100"
          />
        </span>
        <span className="movies-list__title">{movie.title}</span>
      </li>
    );
  }
}
