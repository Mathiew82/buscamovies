import React from 'react'
import { render } from '@testing-library/react'
import MoviesList from './MoviesList'

describe('movieslist', () => {
  test('component should render correctly', () => {
    const moviesList = {
      movies: [],
      inputValue: '',
      currentPage: 1,
      paginationLength: 10,
    }
    const setMovies = jest.fn()
    const setInputValue = jest.fn()
    const setCurrentPage = jest.fn()
    const setPaginationLength = jest.fn()

    const { queryByTestId } = render(
      <MoviesList
        moviesList={moviesList}
        setMovies={setMovies}
        setInputValue={setInputValue}
        setCurrentPage={setCurrentPage}
        setPaginationLength={setPaginationLength}
      />
    )

    expect(queryByTestId('movies-list')).toBeTruthy()
  })
})
