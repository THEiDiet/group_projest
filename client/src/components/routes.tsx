import React, { FC, ReactElement } from 'react'

import { Route, Routes } from 'react-router-dom'

import { Paths } from '../enums'

import { Header } from './header/Header'

import {
  Auth,
  MainPage,
  Login,
  Profile,
  TestComponent,
  RestorePassword,
  ChangePassword,
  NotFound,
} from 'pages'

export const Router: FC = (): ReactElement => (
  <Routes>
    <Route path={Paths.Home} element={<Header />}>
      <Route index element={<MainPage />} />
      <Route path={Paths.Auth} element={<Auth />} />
      <Route path={Paths.Login} element={<Login />} />
      <Route path={`${Paths.ChangePassword}/*`} element={<ChangePassword />} />
      <Route path={Paths.RestorePassword} element={<RestorePassword />} />
      <Route path={Paths.Profile} element={<Profile />} />
      <Route path={Paths.Test} element={<TestComponent />} />
      <Route path={Paths.NotFound} element={<NotFound />} />
    </Route>
  </Routes>
)
