import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Navbar from './Navbar'

describe('navbar', () => {
  it('component should render correctly', () => {
    const history = createMemoryHistory()
    const { queryByTestId } = render(
      <Router history={history}>
        <Navbar />
      </Router>
    )

    expect(queryByTestId('navbar')).toBeTruthy()
  })
})
