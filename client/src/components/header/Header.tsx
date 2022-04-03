import React, { ReactElement, useCallback } from 'react'

import { Link, Outlet } from 'react-router-dom'

import { AuthTypeSaga } from '../../enums/AuthTypeSaga'
import { useAppDispatch } from '../../hooks'

import s from 'components/header/style/header.module.scss'
import { Paths } from 'enums'

export const Header = (): ReactElement => {
  const dispatch = useAppDispatch()
  const logoutHandler = useCallback(() => {
    dispatch({ type: AuthTypeSaga.LogOutSaga })
  }, [dispatch])
  return (
    <>
      <header className={s.header}>
        <div className={s.container}>
          <Link to={Paths.Home}>Home page</Link>
          <Link to={Paths.Profile}>Profile</Link>
          <Link to={Paths.Auth}>Auth</Link>
          <Link to={Paths.Login}>Login</Link>
          <Link to={Paths.RestorePassword}>Restore Password</Link>
          <Link to={Paths.ChangePassword}>Change Password</Link>
          <Link to={Paths.Test}>Test</Link>
          <button type="submit" onClick={logoutHandler}>
            LogOut
          </button>
        </div>
      </header>
      <main className={s.main}>
        <div className={s.mainContainer}>
          <Outlet />
        </div>
      </main>
    </>
  )
}
