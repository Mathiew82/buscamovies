import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Popular from './Popular'

describe('popular', () => {
  it('component should render correctly', () => {
    const popularMovies = {
      movies: [],
      currentPage: 1,
      paginationLength: 10,
    }
    const setMovies = jest.fn()
    const setCurrentPage = jest.fn()
    const setPaginationLength = jest.fn()

    const history = createMemoryHistory()
    const { queryByTestId } = render(
      <Router history={history}>
        <Popular
          popularMovies={popularMovies}
          setMovies={setMovies}
          setCurrentPage={setCurrentPage}
          setPaginationLength={setPaginationLength}
        />
      </Router>
    )

    expect(queryByTestId('popular-page')).toBeTruthy()
  })
})
