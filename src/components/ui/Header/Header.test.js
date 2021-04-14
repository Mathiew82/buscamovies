import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Header from './Header'

describe('Header Component', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <Header />
      </Router>
    )

    expect(
      screen.getByRole('navigation', { name: 'main navigation' })
    ).toBeInTheDocument()
  })
})
