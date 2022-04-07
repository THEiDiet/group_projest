/*eslint-disable*/
import React, { FC, useState } from 'react'

import { userApi } from 'api/userApi'
import { AuthResponse } from 'types/UserType'

export const Auth: FC = () => {
  const [email, setEmail] = useState('alex96kravets@gmail.com')
  const [password, setPassword] = useState('alexalex')
  /**
   * Украду все остальное у ребят
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClick = async () => {
    const response: AuthResponse | string = await userApi.register({ email, password })
    console.log(response)
  }
  return (
    <div>
      <button type="button" onClick={handleClick}>
        click
      </button>
    </div>
  )
}
