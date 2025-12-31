import { createRoot } from 'react-dom/client'
import './sass/app.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import storeModules from './store'

const store = createStore(storeModules)

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
