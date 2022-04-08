import { AxiosError } from 'axios'

import { instance } from 'api/config'
import { Responses } from 'enums/EResponse'
import { LoginParamsType, ResponseType, SetNewPasswordRequestType } from 'types'

export const userApi = {
  // eslint-disable-next-line no-return-await
  ping: async () => await instance.get('ping'),
  register: async (body: Omit<LoginParamsType, 'rememberMe'>) => {
    try {
      const res = await instance.post('auth/register', JSON.stringify(body))
      if (res.status === Responses.Created) {
        return res.data
      }
      return res.data
    } catch (e) {
      return (e as AxiosError)?.response?.data?.error || 'some error'
    }
  },
  login: async (body: LoginParamsType) =>
    // eslint-disable-next-line no-return-await
    await instance.post<ResponseType>('auth/login', body),
  // eslint-disable-next-line no-return-await
  me: async () => await instance.post<ResponseType>('auth/me', {}),
  // eslint-disable-next-line no-return-await
  logOut: async () => await instance.delete('auth/me'),
  // eslint-disable-next-line no-return-await
  update: async (body: any) => await instance.put('auth/me', body),
  setNewPassword: async (body: SetNewPasswordRequestType) =>
    // eslint-disable-next-line no-return-await
    await instance.post('auth/set-new-password', body),
  forgot: async (email: string) => {
    const body = {
      email,
      from: 'alex96kravets@gmail.com',
      message: `<div style='background-color: lime; padding: 15px'>password recovery link: 
                <a href='http://localhost:3000/#/set-new-password$token$'>link</a></div>`,
    }
    try {
      const res = await instance.post('auth/forgot', JSON.stringify(body))
      if (res.status === Responses.Success) {
        return res.data
      }
      return res.data
    } catch (e) {
      return (e as AxiosError)?.response?.data?.error
    }
  },
}
