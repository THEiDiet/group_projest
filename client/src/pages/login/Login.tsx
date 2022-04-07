import React, { useCallback, useState } from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import styles from './Login.module.scss'

import Security from 'components/assets/security.svg'
import unSecurity from 'components/assets/unSecurity.svg'
import { Button } from 'components/common'
import { CustomInput } from 'components/input/CustomInput'
import { Paths } from 'enums'
import { AuthTypeSaga } from 'enums/AuthTypeSaga'
import { useAppDispatch, useAppSelector } from 'hooks'
import { LoginValues } from 'types'

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const [isSecurity, setIsSecurity] = useState(false)
  const changeSecurity = useCallback((): void => {
    setIsSecurity(x => !x)
  }, [])
  const formik = useFormik({
    validate: values => {
      const minLengthPassword = 8
      const errors: Partial<LoginValues> = {}
      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (values.password.length < minLengthPassword) {
        errors.password = 'Password is short'
      } else if (!values.password) {
        errors.password = 'Password is required'
      }
      return errors
    },
    initialValues: {
      email: '',
      password: '',
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
          </div>
          <div className={styles.input_block}>
            {isSecurity ? (
              <CustomInput
                name="password"
                label="Password"
                id="password"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                icon={Security}
                onClick={changeSecurity}
              />
            ) : (
              <CustomInput
                name="password"
                id="password"
                label="Password"
                type="password"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                icon={unSecurity}
                onChange={formik.handleChange}
                onClick={changeSecurity}
              />
            )}
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
          <div className={styles.errorMessage}>
            <p> {formik.touched.email && formik.errors.email}</p>
            <p> {formik.touched.password && formik.errors.password}</p>
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
