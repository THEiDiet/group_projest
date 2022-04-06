import React, { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { Paths } from 'enums'
import { useAppSelector } from 'hooks'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  if (!isLoggedIn) return <Navigate to={Paths.Login} />

  return <div>Profile</div>
}
