import React, { FC, useState } from 'react'

import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { userApi } from 'api/userApi'
import Security from 'assets/icons/security.svg'
import unSecurity from 'assets/icons/unSecurity.svg'
import { Input } from 'components'
import { Button } from 'components/common/button/Button'
import { Paths } from 'enums/Paths'
import { useAppDispatch, useAppSelector } from 'hooks/useAppDispatchAndSelector'
import styles from 'styles/Auth/Auth.module.scss'
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
  const navigate = useNavigate()
  const changeSecurity = (): void => {
    setIsSecurity(value => !value)
  }

  const onSubmitForm = async (values: Omit<LoginParamsType, 'rememberMe'>): Promise<any> => {
    const res: AuthResponse = await userApi.register(values)
    if (typeof res === 'string') {
      setError(res)
    }
    navigate(Paths.Login)
  }

  const formik = useFormik({
    validate: values => validatePassAndEmail(values),
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: Omit<LoginParamsType, 'rememberMe'>) => {
      onSubmitForm(values).then(() => {
        formik.resetForm()
      })
    },
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Card App</h1>
        <h2>Auth</h2>
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
            <div className={styles.errorMessage}>
              <p> {formik.touched.email && formik.errors.email}</p>
              <p>{formik.touched.password && formik.errors.password}</p>
              <p>{error || userName}</p>
            </div>
            <Button type="submit">Auth</Button>
            <span>{userName}</span>
          </form>
        </div>
        <div>
          <p className={styles.textDown}>Do you have an account?</p>
          <NavLink className={styles.down_Link} to={Paths.Login}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  )
}
