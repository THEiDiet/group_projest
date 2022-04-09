import React, { ReactElement, useState } from 'react'

import { userApi } from 'api'

export const MainPage = (): ReactElement => {
  const [userData, setUserData] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onButtonClick = () => {
    const res: any = userApi.register({
      email: 'aka@testComponent.com',
      password: 'qwerty123',
    })
    console.log(res.data)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onButtonClick2 = async () => {
    const res: any = await userApi.login({
      email: 'aka@testComponent.com',
      password: 'qwerty123',
      rememberMe: true,
    })
    setUserData(res.data)
    console.log(res.data)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onButtonClick3 = async () => {
    const res: any = await userApi.me()
    console.log(res)
  }
  console.log(userData)
  return <div>MainPage</div>
}
