import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Header from './Header'

describe('header', () => {
  test('component should render correctly', () => {
    const history = createMemoryHistory()
    const { queryByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    )

    expect(queryByTestId('header')).toBeTruthy()
  })
})
