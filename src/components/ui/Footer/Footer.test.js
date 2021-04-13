import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Footer from './Footer'

describe('footer', () => {
  it('component should render correctly', () => {
    const history = createMemoryHistory()
    const { queryByTestId } = render(
      <Router history={history}>
        <Footer />
      </Router>
    )

    expect(queryByTestId('footer')).toBeTruthy()
  })
})
