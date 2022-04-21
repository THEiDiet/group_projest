import { EPacksSort } from 'enums'

export type SortT = EPacksSort.Date | EPacksSort.Name | EPacksSort.UserName | EPacksSort.CardsCount

export type CardT = {
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

export type CardTypePartial = Partial<CardT>

export type PackT = {
  cards: CardT[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
export type UpdatedGradeT = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}

export type UpdatedGradeRequestT = {
  card_id: string
  grade: number
}

