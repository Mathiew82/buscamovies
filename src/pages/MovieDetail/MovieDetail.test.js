import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { createMemoryHistory } from 'history'
import { searchMovie, searchCredits } from '../../services/MoviesRepository'
import MovieDetail from './MovieDetail'

jest.mock('../../services/MoviesRepository')

describe('MovieDetail Page', () => {
  it('should render correctly with success requests', async () => {
    const history = createMemoryHistory()
    const movie = {
      id: 637,
      title: 'La vida es bella',
      vote_average: 50,
      poster_path: '/mUELlV4u3m50eN5pRnhzqLjEvFc.jpg',
      production_countries: [],
      genres: [],
      production_companies: [],
    }
    const credits = {
      crew: [
        {
          job: 'Director',
          name: 'Pepito',
        },
      ],
      cast: [
        {
          name: 'Manolito',
        },
        {
          name: 'Juanita',
        },
      ],
    }
    searchMovie.mockResolvedValueOnce(movie)
    searchCredits.mockResolvedValueOnce(credits)

    await act(async () => {
      await render(
        <Router history={history}>
          <MovieDetail movieId="637" />
        </Router>
      )
      await waitFor(() => {
        const button = screen.getByRole('button', { name: 'Volver atrás' })
        userEvent.click(button)

        expect(button).toBeInTheDocument()
      })
    })
  })

  it('should render correctly with error requests', async () => {
    const history = createMemoryHistory()
    searchMovie.mockRejectedValueOnce('Error searchMovie')

    await act(async () => {
      render(
        <Router history={history}>
          <MovieDetail />
        </Router>
      )
      const backButton = screen.queryByText('Volver atrás')

      expect(backButton).toBeNull()
    })
  })
})
