import React, { FC, useState } from 'react'

import { useFormik } from 'formik'

import { userApi } from 'api/userApi'
import { CustomInput } from 'components'
import { Button } from 'components/common/button/Button'
import { LoginParamsType } from 'types/UserApiType'

const MIN_PASS_LENGTH = 7

type AuthResponse =
  | {
      addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
      }
    }
  | string

type handleResponseT = {
  [key: string]: string
}

export const Auth: FC = () => {
  const [isSecurity, setIsSecurity] = useState(false)
  const [userName, setUserName] = useState('')
  const [error, setError] = useState('')
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmitForm = async (
    values: Omit<LoginParamsType, 'rememberMe'>,
  ): Promise<handleResponseT> => {
    const res: AuthResponse = await userApi.register(values)
    if (typeof res === 'string') {
      setError(res)
      return { error: res }
    }
    setUserName(res.addedUser.name)
    return { name: res.addedUser.name }
  }

  const formik = useFormik({
    validate: values => {
      const errors = {} as Omit<LoginParamsType, 'rememberMe'>
      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (values.password.length < MIN_PASS_LENGTH) {
        errors.password = 'Password must be more than 7 symbols'
      } else if (!values.password) {
        errors.password = 'Password is required'
      }
      return errors
    },
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: Omit<LoginParamsType, 'rememberMe'>) => {
      onSubmitForm(values).then((res: handleResponseT) => {
        if (res?.name) {
          formik.resetForm()
          console.log('hello', res?.name)
        } else console.log(res?.error || 'Something went wrong')
      })
    },
  })

  return (
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
      <div>
        {isSecurity ? (
          <CustomInput
            name="password"
            label="Password"
            id="password"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            // icon={Security}
            // onClick={changeSecurity}
          />
        ) : (
          <CustomInput
            name="password"
            id="password"
            label="Password"
            type="password"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            // icon={unSecurity}
            onChange={formik.handleChange}
            // onClick={changeSecurity}
          />
        )}
        {formik.touched.password && formik.errors.password}
      </div>
      <Button type="submit">Auth</Button>
      <span>{userName}</span>
    </form>
  )
}
