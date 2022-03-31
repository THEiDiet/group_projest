import React, { ReactElement } from 'react'

import { Provider } from 'react-redux'

import s from 'App.module.scss'
import { Router } from 'components/routes'
import { store } from 'store/config'

const App = (): ReactElement => (
  <Provider store={store}>
    <div className={s.app}>
      <Router />
    </div>
  </Provider>
)

export default App
