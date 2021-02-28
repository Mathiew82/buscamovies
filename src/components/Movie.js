import React, { Component } from "react";
import PropTypes from "prop-types";

export class Movie extends Component {
  static propTypes = {
    movie: PropTypes.object,
  };

  getVoteAverageInteger = (value) => {
    return value * 10;
  };

  render() {
    const { movie } = this.props;
    const voteAverage = this.getVoteAverageInteger(movie.vote_average);

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
        <span className="movies-list__title">{movie.title}</span>
      </li>
    );
  }
}
