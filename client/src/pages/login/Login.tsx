import React, { useState } from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import Security from 'assets/icons/security.svg'
import unSecurity from 'assets/icons/unSecurity.svg'
import { Input } from 'components'
import { Button } from 'components/common'
import { Paths } from 'enums'
import { AuthTypeSaga } from 'enums/AuthTypeSaga'
import { useAppDispatch, useAppSelector } from 'hooks'
import styles from 'styles/Auth/Auth.module.scss'
import { LoginValues } from 'types'
import { validatePassAndEmail } from 'utils/validatePassAndEmail'

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isSecurity, setIsSecurity] = useState(false)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const changeSecurity = (): void => {
    setIsSecurity(value => !value)
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
      setIsSecurity(false)
      formik.resetForm()
    },
  })

  if (isLoggedIn) return <Navigate to={Paths.Profile} />
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Card App</h1>
        <h2>Sign In</h2>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.input_block}>
              <Input
                name="email"
                type="text"
                label="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className={styles.input_block}>
              <Input
                name="password"
                id="password"
                label="Password"
                type={isSecurity ? 'text' : 'password'}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                icon={!isSecurity ? Security : unSecurity}
                onChange={formik.handleChange}
                onClick={changeSecurity}
              />
            </div>
            <div className={styles.settings}>
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
              <p>{formik.touched.password && formik.errors.password}</p>
            </div>
            <Button type="submit">Login</Button>
          </form>
        </div>
        <div>
          <p className={styles.textDown}>Don’t have an account?</p>
          <NavLink className={styles.down_Link} to={Paths.Auth}>
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  )
}
