import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import storeModules from '../../../store'
import MoviesListContainer from './MoviesListContainer'

const store = createStore(storeModules)

describe('MoviesListContainer', () => {
  it('mapStateToProps should return state', () => {
    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <MoviesListContainer />
        </Router>
      </Provider>
    )

    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })
})
