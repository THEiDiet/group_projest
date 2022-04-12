import { instance } from './config'

export const cardsApi = {
  setPack() {
    const data = {
      cardsPack: {
        name: 'name',
        deckCover: 'some cover',
        private: false,
      },
    }
    const res = instance.post('cards/pack', data)
    console.log(res)
  },
  getPack() {
    const res = instance.get('cards/pack')
    console.log(res)
  },
}
