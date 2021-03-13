import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading/Loading'
import Header from '../../components/ui/Header/Header'
import Title from '../../components/ui/Title/Title'
import Movie from '../../components/Movie/Movie'
import Pagination from '../../components/ui/Pagination/Pagination'
import env from '../../env'

const { API_URL, API_KEY } = env

function Popular(props) {
  const {
    movies,
    setMovies,
    currentPage,
    setCurrentPage,
    paginationLength,
    setPaginationLength,
  } = props

  const [loading, setLoading] = useState(false)
  const [popularMoviesAdded, setPopularMoviesAdded] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  const createUrl = (page) => {
    const urlToSearch = new URL(`${API_URL}/discover/movie?api_key=${API_KEY}`)

    urlToSearch.searchParams.append('sort_by', 'popularity.desc')
    urlToSearch.searchParams.append('page', page)
    urlToSearch.searchParams.append('include_adult', false)
    return urlToSearch
  }

  const setPopularMovies = (page = 1) => {
    setLoading(true)
    const url = createUrl(page)

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { results, total_pages } = data

        setMovies(results)
        setPaginationLength(total_pages)
        scrollToTop()
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleClickPage = (event) => {
    console.log('handleClickPage')
    const currentValueButton = Number(event.target.innerHTML)
    setCurrentPage(currentValueButton)
    setPopularMovies(currentValueButton)
  }

  if (movies.length < 1 && !popularMoviesAdded) {
    setPopularMovies()
    setPopularMoviesAdded(true)
  }

  return (
    <div data-testid="popular-page" className="popular-page">
      <Loading loading={loading} />

      <Header />
      <Title>Las Populares</Title>

      {movies.length > 0 ? (
        <ul className="movies-list">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <div className="no-movie-results">No hay películas populares</div>
      )}

      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        clickPage={handleClickPage}
      />
    </div>
  )
}

Popular.propTypes = {
  movies: PropTypes.array,
  setMovies: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  paginationLength: PropTypes.number,
  setPaginationLength: PropTypes.func,
}

export default Popular
