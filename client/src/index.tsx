import React from 'react'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import 'index.scss'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store/config'

render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
)

reportWebVitals()
