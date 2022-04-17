import { AxiosResponse } from 'axios'

import { instance } from './config'

import { CardsPackT, GetPacksPayload, GetPacksResponseT } from 'types/PacksType'

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
  getPacks: (payload: GetPacksPayload): Promise<AxiosResponse<CardsPackT[]>> => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const { packName, min, sortPacks, userId, max, pageCount = 10, page } = payload
    return instance.get<CardsPackT[]>(`cards/pack`, {
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
  },
  getOnePackCards: (payload: string = '') =>
    instance.get(
      // TODO: сделать полный набор параметров, не только cardsPack
      `cards/card?cardsPack_id=${payload}`,
    ),
}
