import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import storeModules from '../../../store'
import PopularConatiner from './PopularConatiner'

const store = createStore(storeModules)

describe('popular container', () => {
  it('component should render correctly', () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router history={history}>
          <PopularConatiner />
        </Router>
      </Provider>
    )

    expect(screen.getByText('Las Populares')).toBeInTheDocument()
  })
})
