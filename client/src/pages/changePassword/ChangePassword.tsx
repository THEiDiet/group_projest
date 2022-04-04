import React, { FC, useState } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { requestChangePassword } from '../../store/reducers/authReducer'

import { useAppDispatch, useAppSelector } from 'hooks/useAppDispatchAndSelector'

export const ChangePassword: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const params = useParams<'*'>()
  const token = params['*']
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const confirmPassword = () => {
    if (token) {
      dispatch(requestChangePassword(token, password))
    }
  }
  if (isLoggedIn) return <Navigate to="/" />

  return (
    <>
      <div>Set new password</div>
      <input
        type="text"
        onChange={e => {
          setPassword(e.currentTarget.value)
        }}
      />
      <div>
        <button type="button" onClick={confirmPassword}>
          confirm new password
        </button>
      </div>
    </>
  )
}
