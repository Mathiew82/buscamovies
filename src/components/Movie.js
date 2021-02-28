import React, { Component } from "react";
import PropTypes from "prop-types";

export class Movie extends Component {
  state = {
    isFavorite: false,
  };

  static propTypes = {
    movie: PropTypes.object,
  };

  getVoteAverageInteger = (value) => {
    return value * 10;
  };

  addToFavorites = (event) => {
    let currentMovie = JSON.parse(event.target.dataset.movie);
    currentMovie.isFavorite = true;

    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );
    if (!favoriteMovies) favoriteMovies = [];

    favoriteMovies.push(currentMovie);

    window.localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(favoriteMovies)
    );

    this.setState({
      isFavorite: true,
    });
  };

  removeToFavorites = (event) => {
    const currentMovie = JSON.parse(event.target.dataset.movie);

    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );

    const moviePositionInArray = favoriteMovies.indexOf(currentMovie);
    favoriteMovies.splice(moviePositionInArray, 1);

    window.localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(favoriteMovies)
    );

    this.setState({
      isFavorite: false,
    });
  };

  isAddedToFavorites() {
    return this.props.movie.isFavorite || this.state.isFavorite;
  }

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
          <span className="icon-wrapper">
            <span
              className="click-zone"
              data-movie={JSON.stringify(movie)}
              onClick={
                this.isAddedToFavorites()
                  ? this.removeToFavorites
                  : this.addToFavorites
              }
            />
            {this.isAddedToFavorites() ? (
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
        {this.isAddedToFavorites() && <div>es favorita</div>}
        <span className="movies-list__title" title={movie.title}>
          {movie.title}
        </span>
      </li>
    );
  }
}
