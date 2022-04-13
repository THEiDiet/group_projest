import { AxiosResponse } from 'axios'

import { instance } from './config'

import { CardsPackT } from 'store/sagas/cardsSaga'
import { CardsT } from 'types/PackTypes'

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
  getPack: async (payload: string = '20') => {
    const res: AxiosResponse<CardsPackT[]> = await instance.get(
      `cards/pack${payload && `?pageCount=${payload}`}`,
    )
    return res.data
  },
  getOnePackCards: async (payload: string = '') => {
    const res: AxiosResponse<CardsT> = await instance.get(
      // TODO: сделать полный набор параметров, не только cardsPack
      `cards/card?cardsPack_id=${payload}`,
    )
    return res.data
  },
}
