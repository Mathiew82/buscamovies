import { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Movie from '@/components/Movie/Movie'
import Loading from '@/components/ui/Loading/Loading'
import Title from '@/components/ui/Title/Title'
import Pagination from '@/components/ui/Pagination/Pagination'
import { searchPopularMovies } from '@/services/MoviesRepository'

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

  const setPopularMovies = async (page = 1) => {
    setLoading(true)

    try {
      const data = await searchPopularMovies(page)
      const { results, total_pages } = data

      setMovies(results)
      setPaginationLength(total_pages)
      scrollToTop()
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(`Error: ${message}`)
    } finally {
      setLoading(false)
    }
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
