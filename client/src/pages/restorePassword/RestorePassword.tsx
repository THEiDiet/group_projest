import React, { ChangeEvent, FC, useState } from 'react'

import { Navigate } from 'react-router-dom'

import { userApi } from 'api/userApi'
import { Input } from 'components'
import { Button } from 'components/common/button/Button'
import { Paths } from 'enums'
import { useAppSelector } from 'hooks'
import { useLoader } from 'hooks/useLoader'
import styles from 'styles/Auth/Auth.module.scss'

const MIN_EMAIL_LENGTH = 6

export const RestorePassword: FC = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState<any>(null)
  const { isLoading, startLoading, stopLoading } = useLoader()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const restorePassword = async (): Promise<void> => {
    if (email && email.length > MIN_EMAIL_LENGTH) {
      startLoading()
      const res = await userApi.forgot('log.m3.baby@gmail.com')
      if (typeof res === 'string') {
        setError(res)
      } else setResponse(res)
      stopLoading()
    }
  }
  if (isLoggedIn) {
    return <Navigate to={Paths.Profile} replace />
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Card App</h1>
        <h2>Restore pass</h2>
        <div>
          <div>
            <Input name="email" label="Email" type="text" onChange={handleChange} value={email} />
          </div>
        </div>
        <Button onClick={restorePassword}>Restore</Button>
        {isLoading && <span>Loading...</span>}
      </div>
    </div>
  )
}
