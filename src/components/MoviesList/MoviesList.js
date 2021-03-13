import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchForm from '../SearchForm/SearchForm'
import Loading from '../Loading/Loading'
import Pagination from '../ui/Pagination/Pagination'
import Movie from '../Movie/Movie'
import env from '../../env'

const { API_URL, API_KEY } = env

function MoviesList(props) {
  const {
    movies,
    setMovies,
    inputValue,
    setInputValue,
    currentPage,
    setCurrentPage,
    paginationLength,
    setPaginationLength,
  } = props

  const [loadingResults, setLoadingResults] = useState(false)
  const [noMatches, setNoMatches] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  const addFavoriteMovies = (results) => {
    let favoriteMovies = JSON.parse(
      window.localStorage.getItem('favoriteMovies')
    )
    if (!favoriteMovies) favoriteMovies = []

    results.forEach((item) => {
      let currentMovie = favoriteMovies.find((i) => i.id === item.id)
      if (currentMovie) item.isFavorite = true
    })

    return results
  }

  const showResults = (data) => {
    const { results, total_pages } = data

    if (!results) return
    if (results.length === 0) setNoMatches(true)
    if (results.length > 0) setNoMatches(false)

    const resultsWithFavorites = addFavoriteMovies(results)

    setMovies(resultsWithFavorites)
    setPaginationLength(total_pages)
    scrollToTop()
  }

  const handleClickPage = (event) => {
    const currentValueButton = Number(event.target.innerHTML)
    setCurrentPage(currentValueButton)
    handleSubmit(undefined, currentValueButton)
  }

  const checkValueInput = (val) => {
    const query = val.trim()
    return query.length > 0
  }

  const createUrl = (page) => {
    const urlToSearch = new URL(`${API_URL}/search/movie?api_key=${API_KEY}`)

    urlToSearch.searchParams.append('query', inputValue)
    urlToSearch.searchParams.append('page', page)
    urlToSearch.searchParams.append('language', 'es-ES')
    urlToSearch.searchParams.append('include_adult', false)
    return urlToSearch
  }

  const handleSubmit = (event, page) => {
    if (typeof event !== 'undefined') {
      event.preventDefault()
      setCurrentPage(page)
      window.document.querySelector('.search-wrapper .button').blur()
    }

    if (!checkValueInput(inputValue)) {
      setInputValue('')
      return false
    }

    setLoadingResults(true)

    const url = createUrl(page)

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        showResults(data)
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`)
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
          inputValue={inputValue}
          setInputValue={setInputValue}
          submit={handleSubmit}
        />
      </div>

      {movies.length > 0 ? (
        <ul className="movies-list">
          {movies.map((movie) => (
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
        currentPage={currentPage}
        paginationLength={paginationLength}
        clickPage={handleClickPage}
      />
    </div>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.array,
  setMovies: PropTypes.func,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  paginationLength: PropTypes.number,
  setPaginationLength: PropTypes.func,
}

export default MoviesList
