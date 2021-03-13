import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useToggleFavorite from '../../hooks/useToggleFavorite/useToggleFavorite'
import useVoteAverage from '../../hooks/useVoteAverage/useVoteAverage'

function Movie(props) {
  const { movie } = props

  const [loading, setLoading] = useState(false)
  const [imgProcessed, setImgProcessed] = useState(false)

  if (movie.poster_path && !imgProcessed) {
    setImgProcessed(true)
    setLoading(true)

    const img = new Image()
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    img.onload = () => {
      setLoading(false)
    }
  }

  const {
    isAddedToFavorites,
    addToFavorites,
    removeToFavorites,
  } = useToggleFavorite(movie.id)

  const voteAverage = useVoteAverage(movie.vote_average)

  return (
    <li data-testid="movie-item">
      <span className="icon-wrapper">
        <span
          className="click-zone"
          data-movie={JSON.stringify(movie)}
          onClick={isAddedToFavorites() ? removeToFavorites : addToFavorites}
        />
        {isAddedToFavorites() ? (
          <i className="icon icon-heart" />
        ) : (
          <i className="icon icon-heart-empty" />
        )}
      </span>
      <Link to={`/pelicula/${movie.id}`}>
        <span
          className="movies-list__img"
          style={{
            backgroundImage: loading
              ? ''
              : movie.poster_path
              ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
              : `url(${process.env.PUBLIC_URL}/default-movie.png)`,
          }}
        >
          <span
            className="loading is-movie is-grey"
            style={{ display: !loading && 'none' }}
          />
          <span className="movies-list-vote-average-value">
            {voteAverage}
            <small>%</small>
          </span>
          <progress
            className={`progress ${voteAverage < 15 ? 'is-danger' : ''} ${
              voteAverage >= 15 && voteAverage < 30 ? 'is-warning' : ''
            } ${voteAverage >= 30 && voteAverage < 50 ? 'is-info' : ''} ${
              voteAverage >= 50 ? 'is-primary' : ''
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
  )
}

Movie.propTypes = {
  movie: PropTypes.object,
}

export default Movie
