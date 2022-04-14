import React, { ChangeEvent, FC, useState } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { Button } from 'components/common'
import { Input } from 'components/index'
import { useAppDispatch, useAppSelector } from 'hooks/useAppDispatchAndSelector'
import { requestChangePassword } from 'store/reducers/userReducer'
import styles from 'styles/Auth/Auth.module.scss'

export const ChangePassword: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const error = useAppSelector<string>(state => state.user.error)
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState<string>('')
  const minimalPasswordLength = 7
  const trimmedPassword = password.trim()
  const params = useParams<'*'>()
  const token = params['*']
  const confirmPassword = (): void => {
    if (token && trimmedPassword) {
      dispatch(requestChangePassword(token, trimmedPassword))
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value)
  }
  if (isLoggedIn) return <Navigate to="/" />

  return (
    //   <div>Set new password</div>
    //   <input
    //     type="text"
    //     onChange={onChangeHandler}
    //   />
    //   {/* тут будет вывод еррора */}
    //   <div>
    //     <button
    //       type="button"
    //       onClick={confirmPassword}
    //       disabled={trimmedPassword.length < minimalPasswordLength}
    //     >
    //       confirm new password
    //     </button>
    //   </div>

    <div className={styles.login_container}>
      <h1>Restore pass</h1>
      <div>
        <div>
          <Input
            name="password"
            label="password"
            type="password"
            onChange={onChangeHandler}
            value={password}
          />
          {error && <div>{error}</div>}
          <Button
            onClick={confirmPassword}
            disabled={trimmedPassword.length < minimalPasswordLength}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
