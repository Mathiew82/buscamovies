import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { createMemoryHistory } from 'history'
import MoviesList from './MoviesList'

describe('MoviesList Component', () => {
  it('should render correctly without movies', () => {
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

    render(
      <MoviesList
        moviesList={moviesList}
        setMovies={setMovies}
        setInputValue={setInputValue}
        setCurrentPage={setCurrentPage}
        setPaginationLength={setPaginationLength}
      />
    )
    const notMoviesMessage = screen.getByText(
      'Utiliza el buscador para buscar películas'
    )

    expect(notMoviesMessage).toBeInTheDocument()
  })

  it('should render correctly with one movie', () => {
    const history = createMemoryHistory()

    const moviesList = {
      movies: [
        {
          id: 1,
          title: 'Title Test',
          vote_average: 50,
          poster_path: '/mUELlV4u3m50eN5pRnhzqLjEvFc.jpg',
        },
      ],
      inputValue: '',
      currentPage: 1,
      paginationLength: 10,
    }
    const setMovies = jest.fn()
    const setInputValue = jest.fn()
    const setCurrentPage = jest.fn()
    const setPaginationLength = jest.fn()

    render(
      <Router history={history}>
        <MoviesList
          moviesList={moviesList}
          setMovies={setMovies}
          setInputValue={setInputValue}
          setCurrentPage={setCurrentPage}
          setPaginationLength={setPaginationLength}
        />
      </Router>
    )
    const movieElement = screen.getByText('Title Test')

    expect(movieElement).toBeInTheDocument()
  })

  it('should search movies by correctly calling the fetchMovies method', async () => {
    const history = createMemoryHistory()

    const moviesList = {
      movies: [
        {
          id: 1,
          title: 'Title Test',
          vote_average: 50,
          poster_path: '/mUELlV4u3m50eN5pRnhzqLjEvFc.jpg',
        },
      ],
      inputValue: 'rambo',
      currentPage: 1,
      paginationLength: 10,
    }
    const setMovies = jest.fn()
    const setInputValue = jest.fn()
    const setCurrentPage = jest.fn()
    const setPaginationLength = jest.fn()
    window.scrollTo = jest.fn()
    const globalFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: moviesList.movies,
            total_pages: moviesList.paginationLength,
          }),
      })
    ))

    await act(async () => {
      await render(
        <Router history={history}>
          <MoviesList
            moviesList={moviesList}
            setMovies={setMovies}
            setInputValue={setInputValue}
            setCurrentPage={setCurrentPage}
            setPaginationLength={setPaginationLength}
          />
        </Router>
      )
      const formButton = screen.getByRole('button', { name: 'Buscar' })
      userEvent.click(formButton)

      expect(globalFetch.mock.calls).toHaveLength(1)
    })
  })
})
