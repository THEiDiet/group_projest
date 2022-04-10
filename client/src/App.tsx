import React, { ReactElement, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import s from 'App.module.scss'
import preloader from 'assets/Rocket.gif'
import { Router } from 'components/routes'
import { useAppSelector } from 'hooks'
import { requestInitialize } from 'store/reducers/appReducer'

const App = (): ReactElement => {
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) return
    dispatch(requestInitialize())
  }, [])

  if (!isInitialized && !isLoggedIn) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <img src={preloader} alt="preloader" />
      </div>
    )
  }

  return (
    <div className={s.app}>
      {/** mojno bilo perenesti v routes OUtlet
       */}
      <Router />
    </div>
  )
}

export default App
