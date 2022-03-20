import React, { ReactElement } from 'react'

import { Link, Outlet } from 'react-router-dom'

import s from 'components/header/style/header.module.scss'
import { Paths } from 'enums'

export const Header = (): ReactElement => (
  <>
    <header className={s.header}>
      <div className={s.container}>
        <Link to={Paths.Home}>Home page</Link>
        <Link to={Paths.Sample}>Sample</Link>
      </div>
    </header>
    <main className={s.main}>
      <Outlet />
    </main>
  </>
)
