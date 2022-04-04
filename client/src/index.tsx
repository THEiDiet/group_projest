import React from 'react'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'index.scss'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store/config'

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)

reportWebVitals()
