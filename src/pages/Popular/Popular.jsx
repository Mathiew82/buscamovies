import { useState } from 'react'
import PropTypes from 'prop-types'
import Loading from '@/components/Loading/Loading'
import Header from '@/components/ui/Header/Header'
import Footer from '@/components/ui/Footer/Footer'
import Title from '@/components/ui/Title/Title'
import Movie from '@/components/Movie/Movie'
import Pagination from '@/components/ui/Pagination/Pagination'
import { searchPopularMovies } from '@/services/MoviesRepository'

const { VITE_API_URL, VITE_API_KEY } = import.meta.env

function Popular(props) {
  const { popularMovies, setMovies, setCurrentPage, setPaginationLength } =
    props

  const [loading, setLoading] = useState(false)
  const [popularMoviesAdded, setPopularMoviesAdded] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  const createUrl = (page) => {
    const urlToSearch = new URL(
      `${VITE_API_URL}/discover/movie?api_key=${VITE_API_KEY}`,
    )

    urlToSearch.searchParams.append('sort_by', 'popularity.desc')
    urlToSearch.searchParams.append('page', page)
    urlToSearch.searchParams.append('include_adult', false)
    return urlToSearch
  }

  const setPopularMovies = (page = 1) => {
    setLoading(true)
    const url = createUrl(page)

    searchPopularMovies(url)
      .then((data) => {
        const { results, total_pages } = data

        setMovies(results)
        setPaginationLength(total_pages)
        scrollToTop()
      })
      .catch(() => {
        console.log(
          'Error: Hubo un error en la petición de info sobre las películas populares',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleClickPage = (page) => {
    setCurrentPage(page)
    setPopularMovies(page)
  }

  if (popularMovies.movies.length < 1 && !popularMoviesAdded) {
    setPopularMovies()
    setPopularMoviesAdded(true)
  }

  return (
    <div className="popular-page">
      <Loading loading={loading} />

      <Header />
      <Title>Las Populares</Title>

      {popularMovies.movies.length > 0 ? (
        <ul className="movies-list">
          {popularMovies.movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <div className="no-movie-results">No hay películas populares</div>
      )}

      <Pagination
        currentPage={popularMovies.currentPage}
        paginationLength={popularMovies.paginationLength}
        clickPage={handleClickPage}
      />

      <Footer />
    </div>
  )
}

Popular.propTypes = {
  popularMovies: PropTypes.object,
  setMovies: PropTypes.func,
  setCurrentPage: PropTypes.func,
  setPaginationLength: PropTypes.func,
}

export default Popular
