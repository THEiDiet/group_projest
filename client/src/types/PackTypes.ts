import { EPacksSort } from 'enums'

export type SortT = EPacksSort.Date | EPacksSort.Name | EPacksSort.UserName | EPacksSort.CardsCount

type CardT = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type PackT = {
  cards: CardT[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
