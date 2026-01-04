import { useState } from 'react'
import { searchMovies } from '@/services/MoviesRepository'
import PropTypes from 'prop-types'
import SearchForm from '@/components/SearchForm/SearchForm'
import Movie from '@/components/Movie/Movie'
import Loading from '@/components/ui/Loading/Loading'
import Pagination from '@/components/ui/Pagination/Pagination'
import './MoviesList.scss'

const { VITE_API_URL, VITE_API_KEY } = import.meta.env

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
    const urlToSearch = new URL(
      `${VITE_API_URL}/search/movie?api_key=${VITE_API_KEY}`,
    )

    urlToSearch.searchParams.append('query', moviesList.inputValue)
    urlToSearch.searchParams.append('page', page)
    urlToSearch.searchParams.append('language', 'es-ES')
    urlToSearch.searchParams.append('include_adult', false)
    return urlToSearch
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
    searchMovies(url)
      .then((data) => {
        showResults(data)
      })
      .catch(() => {
        console.log(
          'Error: Hubo un error en la petición de info sobre el listado de películas',
        )
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-frown-icon lucide-frown"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
          No hay películas que coincidan con tu búsqueda
        </div>
      ) : (
        <div className="no-movie-results">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-search-icon lucide-search"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
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
