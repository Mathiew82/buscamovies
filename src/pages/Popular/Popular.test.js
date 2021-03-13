import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Popular from './Popular'

describe('popular', () => {
  test('component should render correctly', () => {
    const movies = []
    const setMovies = jest.fn()
    const currentPage = 1
    const setCurrentPage = jest.fn()
    const paginationLength = 10
    const setPaginationLength = jest.fn()

    const history = createMemoryHistory()
    const { queryByTestId } = render(
      <Router history={history}>
        <Popular
          movies={movies}
          setMovies={setMovies}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginationLength={paginationLength}
          setPaginationLength={setPaginationLength}
        />
      </Router>
    )

    expect(queryByTestId('popular-page')).toBeTruthy()
  })
})
