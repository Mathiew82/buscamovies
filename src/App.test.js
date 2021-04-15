import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import storeModules from './store'
import App from './App'

const store = createStore(storeModules)

describe('App Component', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory()

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    )

    expect(
      screen.getByText('Utiliza el buscador para buscar películas')
    ).toBeInTheDocument()
  })
})
