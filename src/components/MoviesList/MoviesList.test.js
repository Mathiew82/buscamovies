import React from 'react'
import { render } from '@testing-library/react'
import MoviesList from './MoviesList'

describe('movieslist', () => {
  test('component should render correctly', () => {
    const movies = []
    const setMovies = jest.fn()
    const inputValue = ''
    const setInputValue = jest.fn()
    const currentPage = 1
    const setCurrentPage = jest.fn()
    const paginationLength = 10
    const setPaginationLength = jest.fn()

    const { queryByTestId } = render(
      <MoviesList
        movies={movies}
        setMovies={setMovies}
        inputValue={inputValue}
        setInputValue={setInputValue}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationLength={paginationLength}
        setPaginationLength={setPaginationLength}
      />
    )

    expect(queryByTestId('movies-list')).toBeTruthy()
  })
})
