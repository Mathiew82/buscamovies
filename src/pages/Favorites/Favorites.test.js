import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Favorites from './Favorites'

describe('Favorites Page', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <Favorites />
      </Router>
    )

    expect(screen.getByText('Mis Favoritos')).toBeInTheDocument()
  })
})
