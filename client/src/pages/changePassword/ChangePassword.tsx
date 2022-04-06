import React, { FC, useState } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { requestChangePassword } from '../../store/reducers/userReducer'

import { useAppDispatch, useAppSelector } from 'hooks/useAppDispatchAndSelector'

export const ChangePassword: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState<string>('')
  const minimalPasswordLength = 4
  const trimmedPassword = password.trim()
  const params = useParams<'*'>()
  const token = params['*']
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const confirmPassword = () => {
    if (token && trimmedPassword) {
      dispatch(requestChangePassword(token, trimmedPassword))
      // не вижу смысла занулять значение пароля, потому что я делаю isLoggedIn = true, соответственно делаю редирект
      //  и компонента умирает
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
      {/* тут будет вывод еррора */}
      <div>
        <button
          type="button"
          onClick={confirmPassword}
          disabled={trimmedPassword.length < minimalPasswordLength}
        >
          confirm new password
        </button>
      </div>
    </>
  )
}
