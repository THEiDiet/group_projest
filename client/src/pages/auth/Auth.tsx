import React, { FC, useState } from 'react'

import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { userApi } from 'api/userApi'
import Security from 'assets/icons/security.svg'
import unSecurity from 'assets/icons/unSecurity.svg'
import { CustomInput } from 'components'
import { Button } from 'components/common/button/Button'
import { Paths } from 'enums/Paths'
import { useAppDispatch, useAppSelector } from 'hooks/useAppDispatchAndSelector'
import styles from 'pages/login/Login.module.scss'
import { AuthResponse } from 'types/AuthorizationTypes'
import { LoginParamsType } from 'types/UserApiType'
import { validatePassAndEmail } from 'utils/validatePassAndEmail'

export type HandleResponseT = {
  [key: string]: string
}

export const Auth: FC = () => {
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState('')
  const [error, setError] = useState('')
  const [isSecurity, setIsSecurity] = useState(false)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const changeSecurity = (): void => {
    setIsSecurity(x => !x)
  }

  const onSubmitForm = async (
    values: Omit<LoginParamsType, 'rememberMe'>,
  ): Promise<HandleResponseT> => {
    const res: AuthResponse = await userApi.register(values)
    if (typeof res === 'string') {
      setError(res)
      return { error: res }
    }
    setUserName(res.addedUser.name)
    return { name: res.addedUser.name }
  }

  const formik = useFormik({
    validate: validatePassAndEmail,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: Omit<LoginParamsType, 'rememberMe'>) => {
      onSubmitForm(values).then((res: HandleResponseT) => {
        if (res?.name) {
          formik.resetForm()
        }
      })
    },
  })

  return (
    <div className={styles.login_container}>
      <h1>Auth</h1>
      <h1>Auth</h1>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
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
          <div className={styles.login_settings}>
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
          <Button type="submit">Auth</Button>
          <span>{userName}</span>
        </form>
      </div>
      <div>
        <div>{error || userName}</div>
        <p className={styles.textDown}>Do you have an account?</p>
        <NavLink className={styles.signUp} to={Paths.Login}>
          Login
        </NavLink>
      </div>
    </div>
  )
}
