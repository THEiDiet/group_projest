import React, { useState } from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import Security from '../../components/assets/security.svg'
import unSecurity from '../../components/assets/unSecurity.svg'
import { Button } from '../../components/common'
import { CustomInput } from '../../components/input/CustomInput'
import { Paths } from '../../enums'
import { AuthTypeSaga } from '../../enums/AuthTypeSaga'
import { useAppDispatch, useAppSelector } from '../../hooks'

import styles from './Login.module.scss'

interface Values {
  password: string
  email: string
}

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isSecurity, setIsSecurity] = useState(false)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const changeSecurity = (): void => {
    setIsSecurity(x => !x)
  }
  const formik = useFormik({
    validate: values => {
      const minLengthPassword = 8
      const errors: Partial<Values> = {}
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
    onSubmit: (values: Values) => {
      dispatch({ type: AuthTypeSaga.LoginSaga, values })
      formik.resetForm()
    },
  })

  if (isLoggedIn) return <Navigate to={Paths.Profile} />
  return (
    <div className={styles.login_container}>
      <h1>it-incubator</h1>
      <span>Sign In</span>
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
            {formik.touched.password && formik.errors.password}
          </div>
          <div>
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
            <p>Forgot Password</p>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
      <div>
        <p>Don’t have an account?</p>
        <NavLink to="/signUp">Sign Up</NavLink>
      </div>
    </div>
  )
}
