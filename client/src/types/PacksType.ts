export type PackType = {
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
}

export type PacksType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}
export type InitialStateType = {
  packs: PacksType
  sort: string
  searchPack: string
  isMyPack: boolean
  rerenderFlag: string[] // for delete
  localMinRage: number
  localMaxRage: number
  resultMessageAddPack: string
}

export type GetPacksPayload = {
  packName: string
  min: number
  max: number
  sortPacks: string
  pageCount: number
  page: number
  userId: string
}

export type CardsPackT = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type GetPacksResponseT = {
  cardPacks: CardsPackT[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type GetPacksWorkerT = {
  type: string
  payload: GetPacksPayload
}
