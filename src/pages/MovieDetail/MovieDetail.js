import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useToggleFavorite from '../../hooks/useToggleFavorite/useToggleFavorite'
import Header from '../../components/ui/Header/Header'
import Title from '../../components/ui/Title/Title'
import Subtitle from '../../components/ui/Subtitle/Subtitle'
import Label from '../../components/ui/Label/Label'
import useVoteAverage from '../../hooks/useVoteAverage/useVoteAverage'
import env from '../../env'

const { API_URL, API_KEY } = env

function MovieDetail(props) {
  const [movie, setMovie] = useState({})

  const {
    isAddedToFavorites,
    addToFavorites,
    removeToFavorites,
  } = useToggleFavorite(props.movieId)

  const goToBack = () => {
    window.history.back()
  }

  const formatRevenue = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(value)
  }

  useEffect(() => {
    const { movieId } = props
    const url = new URL(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`)
    url.searchParams.append('language', 'es-ES')

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data)
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`)
      })
  }, [props])

  const voteAverage = useVoteAverage(movie.vote_average)
  const formattedRevenue = formatRevenue(movie.revenue)

  return (
    <div className="more-detail-page">
      <Header />
      {movie && Object.keys(movie).length > 0 && (
        <div className="row">
          <div className="col xs-12 sm-12 md-4 lg-4 more-detail-page__left">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="more-detail-page-img"
              style={{ display: !movie.poster_path && 'none' }}
            />
            <button
              type="button"
              className="button is-danger is-outlined is-fullwidth"
              data-movie={JSON.stringify(movie)}
              onClick={
                isAddedToFavorites() ? removeToFavorites : addToFavorites
              }
            >
              {isAddedToFavorites()
                ? 'Eliminar de tus favoritos'
                : 'Agregar a tus favoritos'}
            </button>
            <p>
              <span className="more-detail-page-vote-average-value">
                {voteAverage} de 100 de valoración
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
              <span className="inline-block tac">
                <Label>Votos totales:</Label> {movie.vote_count}
              </span>
            </p>
          </div>
          <div className="col xs-12 sm-12 md-8 lg-8 more-detail-page__right">
            <Title>{movie.title}</Title>
            <Subtitle>{movie.tagline}</Subtitle>

            <p>{movie.overview}</p>
            <p>
              <Label>Fecha de lanzamiento:</Label> {movie.release_date}
            </p>
            <p>
              <Label>Duración:</Label>{' '}
              {movie.runtime === 0
                ? 'Sin información'
                : `${movie.runtime} minutos`}
            </p>
            <p>
              <Label>Título original:</Label> {movie.original_title}
            </p>
            <p>
              <Label>Ingresos:</Label>{' '}
              {movie.revenue === 0 ? 'Sin información' : formattedRevenue}
            </p>
            {movie.production_countries.length > 0 && (
              <div>
                <p>
                  <Label>Producida en:</Label>
                </p>
                <ul>
                  {movie.production_countries.map((country) => (
                    <li key={country.name}>{country.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {movie.genres.length > 0 && (
              <div>
                <p>
                  <Label>Géneros:</Label>
                </p>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.name}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {movie.production_companies.length > 0 && (
              <div>
                <p>
                  <Label>Compañías de producción:</Label>
                </p>
                <ul>
                  {movie.production_companies.map((company) => (
                    <li key={company.name}>{company.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              type="button"
              className="button is-primary mt-6"
              onClick={goToBack}
            >
              Volver atrás
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

MovieDetail.propTypes = {
  movieId: PropTypes.string,
  apiUrl: PropTypes.string,
  apiKey: PropTypes.string,
}

export default MovieDetail
