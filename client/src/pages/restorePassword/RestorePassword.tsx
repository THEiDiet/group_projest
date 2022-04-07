import React, { FC } from 'react'

import { userApi } from 'api/userApi'

export const RestorePassword: FC = () => {
  const forgotData = {
    email: 'alex96kravets@gmail.com',
    from: 'ale@gmail.com',
    message: `http://localhost:3000/#/set-new-password/$token$`,
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClick = async () => {
    const res = await userApi.forgot(forgotData)
    console.log(res)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const me = async () => {
    const res = await userApi.me()
    console.log(res)
  }
  return (
    <div>
      <button type="button" onClick={me}>
        me
      </button>
      <button type="button" onClick={handleClick}>
        restore
      </button>
    </div>
  )
}
