import { instance } from 'api/config'

export const userApi = {
  // eslint-disable-next-line no-return-await
  ping: async () => await instance.get('ping'),
  register: async (body: any) =>
    // eslint-disable-next-line no-return-await
    await instance.post('auth/register', JSON.stringify(body)),
  // eslint-disable-next-line no-return-await
  login: async (body: any) => await instance.post('auth/login', JSON.stringify(body)),
  // eslint-disable-next-line no-return-await
  me: async () => await instance.post('auth/me', JSON.stringify({})),
  // eslint-disable-next-line no-return-await
  update: async (body: any) => await instance.put('auth/me', JSON.stringify(body)),
}
