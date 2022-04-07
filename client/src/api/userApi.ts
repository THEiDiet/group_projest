import { instance } from 'api/config'
import { LoginParamsType, ResponseType, SetNewPasswordRequestType } from 'types'

export const userApi = {
  // eslint-disable-next-line no-return-await
  ping: async () => await instance.get('ping'),
  register: async (body: any) =>
    // eslint-disable-next-line no-return-await
    await instance.post('auth/register', body),
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
}
