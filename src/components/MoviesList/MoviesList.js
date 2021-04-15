import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchForm from '../SearchForm/SearchForm'
import Loading from '../Loading/Loading'
import Pagination from '../ui/Pagination/Pagination'
import Movie from '../Movie/Movie'
import env from '../../env'
import './MoviesList.scss'

const { API_URL, API_KEY } = env

function MoviesList(props) {
  const {
    moviesList,
    setMovies,
    setInputValue,
    setCurrentPage,
    setPaginationLength,
  } = props

  const [loadingResults, setLoadingResults] = useState(false)
  const [noMatches, setNoMatches] = useState(false)

  const scrollToTop = () => {
    if (typeof window === 'undefined') return

    window.scrollTo({
      top: 0,
    })
  }

  const showResults = (data) => {
    const { results, total_pages } = data

    if (!results) return
    if (results.length === 0) setNoMatches(true)
    if (results.length > 0) setNoMatches(false)

    setMovies(results)
    setPaginationLength(total_pages)
    scrollToTop()
  }

  const handleClickPage = (page) => {
    setCurrentPage(page)
    handleSubmit(undefined, page)
  }

  const checkValueInput = (val) => {
    const query = val.trim()
    return query.length > 0
  }

  const createUrl = (page) => {
    const urlToSearch = new URL(`${API_URL}/search/movie?api_key=${API_KEY}`)

    urlToSearch.searchParams.append('query', moviesList.inputValue)
    urlToSearch.searchParams.append('page', page)
    urlToSearch.searchParams.append('language', 'es-ES')
    urlToSearch.searchParams.append('include_adult', false)
    return urlToSearch
  }

  const fetchMovies = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(() =>
          reject(
            'Error: Hubo un error en la petición de info sobre el listado de películas'
          )
        )
    })
  }

  const checkIfSubmitForm = (event, page) => {
    if (typeof event !== 'undefined') {
      event.preventDefault()
      setCurrentPage(page)
      window.document.querySelector('.search-wrapper .button').blur()
    }
  }

  const handleSubmit = (event, page) => {
    checkIfSubmitForm(event, page)

    if (!checkValueInput(moviesList.inputValue)) {
      setInputValue('')
      return false
    }

    setLoadingResults(true)

    const url = createUrl(page)
    fetchMovies(url)
      .then((data) => {
        showResults(data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadingResults(false)
      })
  }

  return (
    <div>
      <Loading loading={loadingResults} />

      <div className="is-flex is-justify-content-center is-fullwidth">
        <SearchForm
          inputValue={moviesList.inputValue}
          setInputValue={setInputValue}
          submit={handleSubmit}
        />
      </div>

      {moviesList.movies.length > 0 ? (
        <ul className="movies-list">
          {moviesList.movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : noMatches ? (
        <div className="no-movie-results">
          No hay películas que coincidan con tu búsqueda
        </div>
      ) : (
        <div className="no-movie-results">
          Utiliza el buscador para buscar películas
        </div>
      )}

      <Pagination
        currentPage={moviesList.currentPage}
        paginationLength={moviesList.paginationLength}
        clickPage={handleClickPage}
      />
    </div>
  )
}

MoviesList.propTypes = {
  moviesList: PropTypes.object,
  setMovies: PropTypes.func,
  setInputValue: PropTypes.func,
  setCurrentPage: PropTypes.func,
  setPaginationLength: PropTypes.func,
}

export default MoviesList
