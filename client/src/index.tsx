import React from 'react'

import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'index.scss'

import App from './App'
import reportWebVitals from './reportWebVitals'

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
)

reportWebVitals()
