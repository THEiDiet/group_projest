import React, { useState } from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import styles from './Login.module.scss'

import Security from 'assets/icons/security.svg'
import unSecurity from 'assets/icons/unSecurity.svg'
import { Button } from 'components/common'
import { CustomInput } from 'components/common/input/CustomInput'
import { Paths } from 'enums'
import { AuthTypeSaga } from 'enums/AuthTypeSaga'
import { useAppDispatch, useAppSelector } from 'hooks'
import { LoginValues } from 'types'
import { validatePassAndEmail } from 'utils/validatePassAndEmail'

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isSecurity, setIsSecurity] = useState(false)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const changeSecurity = (): void => {
    setIsSecurity(x => !x)
  }
  const formik = useFormik({
    validate: validatePassAndEmail,
    initialValues: {
      email: '',
      password: 'qwerty123',
      rememberMe: false,
    },
    onSubmit: (values: LoginValues) => {
      dispatch({ type: AuthTypeSaga.LoginSaga, values })
      formik.resetForm()
    },
  })

  if (isLoggedIn) return <Navigate to={Paths.Profile} />
  return (
    <div className={styles.login_container}>
      <h1>Card App</h1>
      <span className={styles.signIn}>Sign In</span>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.input_block}>
            <CustomInput
              name="email"
              type="text"
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email}
          </div>
          <div className={styles.input_block}>
            <CustomInput
              name="password"
              id="password"
              label="Password"
              type={isSecurity ? 'text' : 'password'}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              icon={isSecurity ? Security : unSecurity}
              onChange={formik.handleChange}
              onClick={changeSecurity}
            />
            {formik.touched.password && formik.errors.password}
          </div>
          <div className={styles.login_settings}>
            <span>
              Remember me
              <input
                name="rememberMe"
                id="rememberMe"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
              />
            </span>
            <NavLink className={styles.forgetPass} to={Paths.RestorePassword}>
              Forgot Password
            </NavLink>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
      <div>
        <p className={styles.textDown}>Don’t have an account?</p>
        <NavLink className={styles.signUp} to={Paths.Auth}>
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}
