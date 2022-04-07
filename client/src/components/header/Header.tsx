import React, { ReactElement } from 'react'

import { Link, Outlet } from 'react-router-dom'

import s from 'components/header/style/header.module.scss'
import { Paths } from 'enums'

export const Header = (): ReactElement => (
  <>
    <header className={s.header}>
      <div className={s.container}>
        <Link to={Paths.Home}>Home page</Link>
        <Link to={Paths.Profile}>Profile</Link>
        <Link to={Paths.Auth}>Auth</Link>
        <Link to={Paths.Login}>Login</Link>
        <Link to={Paths.RestorePassword}>Restore Password</Link>

        <Link to={Paths.Test}>Test</Link>
      </div>
    </header>
    <main className={s.main}>
      <div className={s.mainContainer}>
        <Outlet />
      </div>
    </main>
  </>
)
