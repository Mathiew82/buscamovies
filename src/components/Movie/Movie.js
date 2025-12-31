import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useToggleFavorite from '../../hooks/useToggleFavorite/useToggleFavorite'
import useVoteAverage from '../../hooks/useVoteAverage/useVoteAverage'
import './Movie.scss'

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

  const { isAddedToFavorites, addToFavorites, removeToFavorites } =
    useToggleFavorite(movie.id)

  const voteAverage = useVoteAverage(movie.vote_average)

  return (
    <li>
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
          <span className="movies-list-vote-average-value">{voteAverage}</span>
          {/* <progress
            className={`progress ${voteAverage < 25 ? 'is-danger' : ''} ${
              voteAverage >= 25 && voteAverage < 50 ? 'is-warning' : ''
            } ${voteAverage >= 50 && voteAverage < 75 ? 'is-info' : ''} ${
              voteAverage >= 75 ? 'is-primary' : ''
            }`}
            value={`${voteAverage}`}
            max="100"
          />*/}
          <span
            className={`rating-ring ${voteAverage < 25 ? 'is-danger' : ''} ${
              voteAverage >= 25 && voteAverage < 50 ? 'is-warning' : ''
            } ${voteAverage >= 50 && voteAverage < 75 ? 'is-info' : ''} ${
              voteAverage >= 75 ? 'is-primary' : ''
            }`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 40 40">
              <circle className="ring-bg" cx="20" cy="20" r="16" />
              <circle
                className="ring"
                cx="20"
                cy="20"
                r="16"
                style={{ strokeDashoffset: 100 - voteAverage }}
              />
            </svg>
          </span>
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
