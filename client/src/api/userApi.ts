import { instance } from 'api/config'

export const userApi = {
  // eslint-disable-next-line no-return-await
  ping: async () => await instance.get('/ping'),
}
