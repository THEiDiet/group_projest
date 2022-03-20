import React, { ReactElement } from 'react'

import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import s from 'App.module.scss'
import { Header, Sample } from 'components'
import { Paths } from 'enums'
import { MainPage } from 'pages'
import { store } from 'store/config'

const App = (): ReactElement => (
  <Provider store={store}>
    <div className={s.app}>
      <Routes>
        <Route path={Paths.Home} element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path={Paths.Sample} element={<Sample />} />
        </Route>
      </Routes>
    </div>
  </Provider>
)

export default App
