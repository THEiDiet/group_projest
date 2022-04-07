import { AxiosError } from 'axios'

import { instance } from 'api/config'
import { ResponseStatuses } from 'enums/responseStatuses'
import { UserT } from 'types/UserType'

export const userApi = {
  // eslint-disable-next-line no-return-await
  ping: async () => await instance.get('ping'),
  // eslint-disable-next-line consistent-return
  register: async (body: UserT) => {
    try {
      const res = await instance.post('auth/register', JSON.stringify(body))
      if (res.status === ResponseStatuses.Created) {
        return res.data
      }
    } catch (e) {
      return (e as AxiosError)?.response?.data.error
    }
  },
  // eslint-disable-next-line no-return-await
  login: async (body: any) => await instance.post('auth/login', JSON.stringify(body)),
  // eslint-disable-next-line no-return-await
  me: async () => await instance.post('auth/me', JSON.stringify({})),
  // eslint-disable-next-line no-return-await
  update: async (body: any) => await instance.put('auth/me', JSON.stringify(body)),

  // eslint-disable-next-line consistent-return
  forgot: async (forgotData: any) => {
    try {
      const res = await instance.post('auth/forgot', JSON.stringify(forgotData))
      return res.data
    } catch (e) {
      return (e as AxiosError)?.response?.data.error
    }
  },
}
