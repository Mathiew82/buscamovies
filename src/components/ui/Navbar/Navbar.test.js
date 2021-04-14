import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import Navbar from './Navbar'

describe('Navbar Component', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <Navbar />
      </Router>
    )

    expect(
      screen.getByRole('navigation', { name: 'main navigation' })
    ).toBeInTheDocument()
  })

  it('should call setIsActive correctly', () => {
    const history = createMemoryHistory()

    const { container } = render(
      <Router history={history}>
        <Navbar />
      </Router>
    )
    const navbarBurger = container.querySelector('.navbar-burger')
    userEvent.click(navbarBurger)
    const isActive = container.querySelector('.is-active')

    expect(isActive).toBeInTheDocument()
  })
})
