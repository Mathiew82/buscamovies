import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Movie from './Movie'

describe('movie', () => {
  test('component should render correctly', () => {
    const movie = {}
    const movieId = 1

    const history = createMemoryHistory()
    const { queryByTestId } = render(
      <Router history={history}>
        <Movie key={movieId} movie={movie} />
      </Router>
    )

    expect(queryByTestId('movie-item')).toBeTruthy()
  })
})
