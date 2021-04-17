import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import storeModules from '../../../store'
import PopularContainer from './PopularContainer'

const store = createStore(storeModules)

describe('PopularContainer', () => {
  it('mapStateToProps should return state', () => {
    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <PopularContainer />
        </Router>
      </Provider>
    )

    expect(screen.getByText('Las Populares')).toBeInTheDocument()
  })
})
