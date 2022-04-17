import { AxiosResponse } from 'axios'

import { instance } from './config'

import { CardsPackT, GetPacksPayload } from 'types/PacksType'
import { PackT } from 'types/PackTypes'

export const cardsApi = {
  setPack() {
    const data = {
      cardsPack: {
        name: 'name',
        deckCover: 'some cover12',
        private: false,
      },
    }
    const res = instance.post('cards/pack', data)
    console.log(res)
  },
  getPacks: async (payload: GetPacksPayload) => {
    const { packName, min, sortPacks, userId, max, pageCount, page } = payload
    const res = await instance.get<CardsPackT[]>(`cards/pack`, {
      params: {
        packName,
        min,
        max,
        sortPacks,
        pageCount,
        page,
        user_id: userId,
      },
    })
    return res.data
  },
  getOnePackCards: async (payload: string = '') => {
    const res: AxiosResponse<PackT> = await instance.get(
      // TODO: сделать полный набор параметров, не только cardsPack
      `cards/card?cardsPack_id=${payload}`,
    )
    return res.data
  },
}
