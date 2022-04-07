import React, { FC } from 'react'

import { userApi } from 'api/userApi'

export const Login: FC = () => {
  const email = 'alex96kravets@gmail.com'
  const password = 'alexalex'

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const h = async () => {
    console.log(await userApi.login({ email, password, rememberMe: true }))
  }
  return (
    <div>
      <button type="button" onClick={h}>
        click
      </button>
    </div>
  )
}
