import { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Movie from '@/components/Movie/Movie'
import Loading from '@/components/ui/Loading/Loading'
import Title from '@/components/ui/Title/Title'
import Pagination from '@/components/ui/Pagination/Pagination'
import { searchPopularMovies } from '@/services/MoviesRepository'

function Popular({
  popularMovies,
  setMovies,
  setCurrentPage,
  setPaginationLength,
}) {
  const [loading, setLoading] = useState(false)

  const isMountedRef = useRef(false)
  const didFetchOnceRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0 })

  const fetchPopularMovies = useCallback(
    async (page = 1) => {
      if (isMountedRef.current) setLoading(true)

      try {
        const { results, total_pages } = await searchPopularMovies(page)

        if (!isMountedRef.current) return

        setMovies(results)
        setPaginationLength(total_pages)
        scrollToTop()
      } catch (error) {
        if (!isMountedRef.current) return
        const message = error instanceof Error ? error.message : String(error)
        console.error(`Error: ${message}`)
      } finally {
        if (isMountedRef.current) setLoading(false)
      }
    },
    [setMovies, setPaginationLength],
  )

  useEffect(() => {
    if (didFetchOnceRef.current) return
    didFetchOnceRef.current = true

    if (popularMovies.movies.length < 1) {
      fetchPopularMovies(1)
    }
  }, [fetchPopularMovies, popularMovies.movies.length])

  const handleClickPage = (page) => {
    setCurrentPage(page)
    fetchPopularMovies(page)
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
