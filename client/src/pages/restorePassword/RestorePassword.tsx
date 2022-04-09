import React, { ChangeEvent, FC, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { userApi } from 'api/userApi'
import { CustomInput } from 'components'
import { Button } from 'components/common/button/Button'
import { Paths } from 'enums/Paths'
import { useLoader } from 'hooks/useLoader'
import styles from 'pages/login/Login.module.scss'

const MIN_EMAIL_LENGTH = 6

export const RestorePassword: FC = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState<any>(null)
  const { isLoading, startLoading, stopLoading } = useLoader()

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

  return (
    <div className={styles.login_container}>
      <h1>Restore pass</h1>
      <div>
        <div>
          <CustomInput
            name="email"
            label="Email"
            type="text"
            onChange={handleChange}
            value={email}
          />
          <Button onClick={restorePassword}>Restore</Button>
        </div>
      </div>
      {error || response}
      {isLoading && <span>Loading...</span>}
    </div>
  )
}
