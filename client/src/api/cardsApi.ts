import { AxiosResponse } from 'axios'

import { CardT, CardTypePartial } from '../types/PackTypes'

import { instance } from './config'

import { CardsPackT, GetPacksPayload } from 'types/PacksType'

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
  getOnePackCards: (payload: any = '') =>
    instance.get(
      // TODO: сделать полный набор параметров, не только cardsPack
        // Я добавил зачем-то чтобы запрашивались все карточки из пака сразу.
      `cards/card?cardsPack_id=${payload.cardsPack_id}&page=1&pageCount=${payload.max}`,
    ),
  createCardInCurrentPack: async (payload: CardTypePartial) => {
    const res: AxiosResponse<CardT> = await instance.post(`cards/card`, { card: payload })
    return res.data
  },
  deleteCardFromCurrentPack: async (payload: string) => {
    const res: AxiosResponse<CardT> = await instance.delete(`cards/card?id=${payload}`)
    return res.data
  },
  updateCardInCurrentPack: async (payload: CardTypePartial) => {
    const res: AxiosResponse<CardT> = await instance.put(`cards/card`, { card: payload })
    return res.data
  },
}
