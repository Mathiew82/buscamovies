import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import useToggleFavorite from '../../hooks/useToggleFavorite/useToggleFavorite'
import Loading from '../../components/Loading/Loading'
import Header from '../../components/ui/Header/Header'
import Footer from '../../components/ui/Footer/Footer'
import Title from '../../components/ui/Title/Title'
import Subtitle from '../../components/ui/Subtitle/Subtitle'
import Label from '../../components/ui/Label/Label'
import useVoteAverage from '../../hooks/useVoteAverage/useVoteAverage'
import { searchMovie, searchCredits } from '../../services/MoviesRepository'
import env from '../../env'
import './MovieDetail.scss'

const { API_URL, API_KEY } = env

function MovieDetail() {
  const { id: movieId } = useParams()
  const [loadingData, setLoadingData] = useState(false)
  const [movie, setMovie] = useState({})
  const [director, setDirector] = useState('')
  const [actors, setActors] = useState([])

  const { isAddedToFavorites, addToFavorites, removeToFavorites } =
    useToggleFavorite(movieId)

  const goToBack = () => {
    window.history.back()
  }

  const formatRevenue = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(value)
  }

  const fetchMovie = (movieId) => {
    return new Promise((resolve, reject) => {
      const movieUrl = new URL(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`)
      movieUrl.searchParams.append('language', 'es-ES')

      searchMovie(movieUrl)
        .then((data) => {
          setMovie(data)
          resolve(data)
        })
        .catch(() => {
          reject('Hubo un error en la petición de info sobre la película')
        })
    })
  }

  const getDirector = (arr) => {
    const onlyDirectors = arr.find((item) => item.job === 'Director')
    return onlyDirectors ? onlyDirectors.name : 'Sin información'
  }

  const fetchCredits = (movieId) => {
    return new Promise((resolve, reject) => {
      const creditsUrl = new URL(
        `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
      )

      searchCredits(creditsUrl)
        .then((data) => resolve(data))
        .catch(() => {
          reject(
            'Hubo un error en la petición de info sobre los actores de la película'
          )
        })
    })
  }

  useEffect(() => {
    setLoadingData(true)

    fetchMovie(movieId)
      .then(() => fetchCredits(movieId))
      .then((data) => {
        setDirector(getDirector(data.crew))
        setActors(data.cast.slice(0, 10))
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
      })
      .finally(() => {
        setLoadingData(false)
      })

    return () => {
      setDirector('')
      setActors([])
      setLoadingData(false)
    }
  }, [movieId])

  const movieExists = (movie) => {
    return movie && Object.keys(movie).length > 0
  }

  const voteAverage = useVoteAverage(movieExists() ? movie.vote_average : 0)
  const formattedRevenue = formatRevenue(movieExists() ? movie.revenue : 0)

  return (
    <div className="more-detail-page">
      <Loading loading={loadingData} />

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
              <Label>Director:</Label> {director}
            </p>
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
            {actors.length > 0 && (
              <div>
                <p>
                  <Label>Actores principales:</Label>
                </p>
                <ul>
                  {actors.map((actor) => (
                    <li key={actor.name}>{actor.name}</li>
                  ))}
                </ul>
              </div>
            )}
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

      <Footer />
    </div>
  )
}

MovieDetail.propTypes = {
  movieId: PropTypes.string,
  apiUrl: PropTypes.string,
  apiKey: PropTypes.string,
}

export default MovieDetail
