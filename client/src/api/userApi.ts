import { instance } from 'api/config'

export const userApi = {
  // eslint-disable-next-line no-return-await
  ping: async () => await instance.get('ping'),
  register: async (body: any) =>
    // eslint-disable-next-line no-return-await
    await instance.post('auth/register', body),
  // eslint-disable-next-line no-return-await
  login: async (body: any) => await instance.post('auth/login', body),
  // eslint-disable-next-line no-return-await
  me: async () => await instance.post('auth/me', {}),
  // eslint-disable-next-line no-return-await
  update: async (body: any) => await instance.put('auth/me', body),
  setNewPassword: async (body: setNewPasswordRequestType) =>
    // eslint-disable-next-line no-return-await
    await instance.post('auth/set-new-password', body),
}

type setNewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
