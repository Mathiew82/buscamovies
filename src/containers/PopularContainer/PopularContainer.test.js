import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from '../../reducers'
import PopularConatiner from '../../containers/PopularContainer/PopularConatiner'

const store = createStore(rootReducer)

describe('popular container', () => {
  test('component should render correctly', () => {
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
