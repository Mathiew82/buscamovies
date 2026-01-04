import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { searchMovie, searchCredits } from '@/services/MoviesRepository'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Loading from '@/components/ui/Loading/Loading'
import Title from '@/components/ui/Title/Title'
import Subtitle from '@/components/ui/Subtitle/Subtitle'
import Label from '@/components/ui/Label/Label'
import useToggleFavorite from '@/hooks/useToggleFavorite/useToggleFavorite'
import useVoteAverage from '@/hooks/useVoteAverage/useVoteAverage'
import './MovieDetail.scss'

function MovieDetail() {
  const { id: movieId } = useParams()
  const [loadingData, setLoadingData] = useState(false)
  const [movie, setMovie] = useState({})
  const [director, setDirector] = useState(null)
  const [actors, setActors] = useState([])

  const { isAddedToFavorites, addToFavorites, removeToFavorites } =
    useToggleFavorite(movieId)

  const goToBack = () => {
    window.history.back()
  }

  const formatRevenue = (value) => {
    const number = Number(value)

    if (isNaN(number)) return value

    if (number >= 1_000_000) {
      const millions = number / 1_000_000
      const rounded = Number.isInteger(millions)
        ? millions
        : Math.round(millions * 10) / 10

      const label = rounded === 1 ? 'millón' : 'millones'

      return `${rounded} ${label} de euros`
    }

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(number)
  }

  const minutesToHours = (text) => {
    const totalMinutes = parseInt(text, 10)

    if (isNaN(totalMinutes)) return text

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const hourLabel = hours === 1 ? 'hora' : 'horas'
    const minuteLabel = minutes === 1 ? 'minuto' : 'minutos'

    if (hours && minutes) {
      return `${hours} ${hourLabel} y ${minutes} ${minuteLabel}`
    }

    if (hours) {
      return `${hours} ${hourLabel}`
    }

    return `${minutes} ${minuteLabel}`
  }

  const formatSpanishDate = (dateString) => {
    const date = new Date(dateString)

    if (isNaN(date)) return dateString

    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const getDirector = (arr) => {
    const onlyDirectors = arr.find((item) => item.job === 'Director')
    return onlyDirectors ? onlyDirectors : null
  }

  useEffect(() => {
    let alive = true

    const run = async () => {
      if (alive) setLoadingData(true)

      setDirector(null)
      setActors([])

      try {
        const [movieData, creditsData] = await Promise.all([
          searchMovie(movieId),
          searchCredits(movieId),
        ])

        if (!alive) return

        setMovie(movieData)
        if (creditsData?.crew?.length) {
          setDirector(getDirector(creditsData.crew))
        }
        if (creditsData?.cast?.length) {
          setActors(creditsData.cast.slice(0, 8))
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`Error: ${message}`)
      } finally {
        if (alive) setLoadingData(false)
      }
    }

    run()

    return () => {
      alive = false
    }
  }, [movieId])

  const movieExists = (movie) => {
    return movie && Object.keys(movie).length > 0
  }

  const voteAverage = useVoteAverage(
    movieExists(movie) ? movie.vote_average : 0,
  )
  const formattedRevenue = formatRevenue(movieExists(movie) ? movie.revenue : 0)

  return (
    <div className="more-detail-page">
      <Loading loading={loadingData} />

      <Header />
      {movie && Object.keys(movie).length > 0 && (
        <div className="row">
          <div className="col xs-12 sm-12 md-4 lg-4 more-detail-page__left">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `/images/default-image.png`
              }
              alt={movie.title}
              className="more-detail-page-img"
            />
            <button
              type="button"
              className="button is-outlined is-fullwidth"
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
                className={`progress ${voteAverage < 25 ? 'is-danger' : ''} ${
                  voteAverage >= 25 && voteAverage < 50 ? 'is-warning' : ''
                } ${voteAverage >= 50 && voteAverage < 75 ? 'is-info' : ''} ${
                  voteAverage >= 75 ? 'is-primary' : ''
                }`}
                value={`${voteAverage}`}
                max="100"
              />
              <span className="total-votes is-block tac">
                Votos totales: {movie.vote_count}
              </span>
            </p>
          </div>
          <div className="col xs-12 sm-12 md-8 lg-8 more-detail-page__right">
            <Title>{movie.title}</Title>
            <Subtitle>{movie.tagline}</Subtitle>

            <div className="p">{movie.overview}</div>
            <div className="director-wrapper">
              <div className="director-left-content">
                <div className="director-photo">
                  <img
                    src={
                      director?.profile_path
                        ? `https://image.tmdb.org/t/p/w300_and_h450_face/${director?.profile_path}`
                        : '/images/default-image.png'
                    }
                  />
                </div>
              </div>
              <div className="director-right-content">
                <Label>
                  Director:
                  <span className="fwn ml-10px">{director?.name || '-'}</span>
                </Label>
                <Label className="mt-10px">
                  Popularidad:
                  <span className="fwn ml-10px">
                    (
                    {director?.popularity
                      ? director?.popularity.toFixed(1)
                      : '-'}
                    )
                  </span>
                </Label>
                {director?.popularity !== undefined &&
                  director?.popularity !== null && (
                    <div className="director-popularity">
                      {[...Array(10)].map((_, index) => (
                        <span
                          key={index}
                          className={`director-popularity__part ${
                            index < director?.popularity ? 'active' : ''
                          }`}
                        />
                      ))}
                    </div>
                  )}
              </div>
            </div>
            {actors.length > 0 && (
              <div className="p">
                <Label>Actores principales:</Label>
                <ul>
                  {actors.map((actor) => (
                    <li key={actor.id} className="actor-item-list">
                      <div className="actor-item-list__wrapper">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w300_and_h450_face/${actor.profile_path}`
                              : '/images/default-image.png'
                          }
                          alt={actor.name}
                        />
                        <span className="actor-item-list__tooltip">
                          {actor.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="p">
              <Label>Título original:</Label> {movie.original_title}
            </div>
            <div className="p">
              <Label>Fecha de lanzamiento:</Label>{' '}
              {formatSpanishDate(movie.release_date)}
            </div>
            <div className="p">
              <Label>Duración:</Label>{' '}
              {movie.runtime === 0
                ? 'Sin información'
                : `${minutesToHours(movie.runtime)} minutos`}
            </div>
            <div className="p">
              <Label>Ingresos:</Label>{' '}
              {movie.revenue === 0 ? 'Sin información' : formattedRevenue}
            </div>
            {movie.production_countries.length > 0 && (
              <div className="p">
                <Label>Producida en:</Label>
                <ul>
                  {movie.production_countries.map((country) => (
                    <li key={country.name}>{country.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {movie.production_companies.length > 0 && (
              <div className="p">
                <Label>Compañías de producción:</Label>
                <ul>
                  {movie.production_companies.map((company) => (
                    <li key={company.name}>{company.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {movie.genres.length > 0 && (
              <div className="p">
                <Label>Géneros:</Label>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.name} className="genre-item-list">
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              type="button"
              className="back-button mt-2"
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

export default MovieDetail
