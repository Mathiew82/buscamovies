import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Movie from './Movie'

describe('Movie Component', () => {
  it('should render correctly', () => {
    const movie = {
      poster_path:
        'https://image.tmdb.org/t/p/w500/mUELlV4u3m50eN5pRnhzqLjEvFc.jpg',
    }
    const movieId = 1
    const history = createMemoryHistory()

    const { container } = render(
      <Router history={history}>
        <Movie key={movieId} movie={movie} />
      </Router>
    )
    const li = container.querySelector('li')

    expect(li).toBeInTheDocument()
  })
})
