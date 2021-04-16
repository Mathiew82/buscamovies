import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createMemoryHistory } from 'history'
import { searchPopularMovies } from '../../services/MoviesRepository'
import Popular from './Popular'

jest.mock('../../services/MoviesRepository')

describe('Popular Page', () => {
  it('should render correctly with success requests', async () => {
    const history = createMemoryHistory()
    const popularMovies = {
      movies: [],
      currentPage: 1,
      paginationLength: 10,
    }
    const setMovies = jest.fn()
    const setCurrentPage = jest.fn()
    const setPaginationLength = jest.fn()
    window.scrollTo = jest.fn()
    searchPopularMovies.mockResolvedValueOnce({
      results: [
        {
          id: 1,
          title: 'Title Test',
          vote_average: 50,
          poster_path: '/mUELlV4u3m50eN5pRnhzqLjEvFc.jpg',
        },
      ],
      total_pages: popularMovies.paginationLength,
    })

    await act(async () => {
      await render(
        <Router history={history}>
          <Popular
            popularMovies={popularMovies}
            setMovies={setMovies}
            setCurrentPage={setCurrentPage}
            setPaginationLength={setPaginationLength}
          />
        </Router>
      )

      await waitFor(() => {
        expect(setMovies.mock.calls).toHaveLength(1)
      })
    })
  })

  it('should render correctly with error requests', async () => {
    const history = createMemoryHistory()
    const popularMovies = {
      movies: [],
      currentPage: 1,
      paginationLength: 10,
    }
    const setMovies = jest.fn()
    const setCurrentPage = jest.fn()
    const setPaginationLength = jest.fn()
    searchPopularMovies.mockRejectedValueOnce('Error searchPopularMovies')

    await act(async () => {
      await render(
        <Router history={history}>
          <Popular
            popularMovies={popularMovies}
            setMovies={setMovies}
            setCurrentPage={setCurrentPage}
            setPaginationLength={setPaginationLength}
          />
        </Router>
      )

      await waitFor(() => {
        expect(setMovies.mock.calls).toHaveLength(0)
      })
    })
  })
})
