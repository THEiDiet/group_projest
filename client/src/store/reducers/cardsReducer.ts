import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EHelpers, EPacksSort } from 'enums'
import { PackT, SortT } from 'types'
import { CardsPackT, GetPackResponseT } from 'types/PacksType'

const initialState = {
  currentPage: 1,
  amountOfElementsToShow: 10,
  totalPacksCount: 4660,
  portionSizeForPages: 10,
  portionNumber: 1,
  packs: [] as CardsPackT[],
  page: 1,
  pageCount: 0,
  cardPacksTotalCount: 0,
  rangeValues: {
    minCardsCount: 0,
    maxCardsCount: 0,
  },
  currentPack: null as unknown as PackT,
  revert: {
    [EPacksSort.Name]: false,
    [EPacksSort.UserName]: false,
    [EPacksSort.Date]: false,
    [EPacksSort.CardsCount]: false,
  },
}

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setAmountOfElementsToShow(state, action: PayloadAction<number>) {
      state.amountOfElementsToShow = action.payload
    },
    setPortionNumber(state, action: PayloadAction<number>) {
      state.portionNumber = action.payload
    },
    setPacks: (state, action: PayloadAction<GetPackResponseT>) => {
      const { cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount, pageCount, page } =
        action.payload
      state.packs = cardPacks
      state.rangeValues = { minCardsCount, maxCardsCount }
      state.page = page
      state.pageCount = pageCount
      state.cardPacksTotalCount = cardPacksTotalCount
    },
    sortCards: (state, action: PayloadAction<SortT>) => {
      const { payload: sortType } = action
      if (state.revert[sortType]) {
        state.revert[sortType] = !state.revert[sortType]
        state.packs.sort((a, b) => (a[sortType] < b[sortType] ? EHelpers.One : EHelpers.MinusOne))
      } else {
        state.revert[sortType] = !state.revert[sortType]
        state.packs.sort((a, b) => (a[sortType] > b[sortType] ? EHelpers.One : EHelpers.MinusOne))
      }
    },
    setOnePackCards: (state, action: PayloadAction<PackT>) => {
      state.currentPack = action.payload
    },
  },
})

export const cardsReducer = slice.reducer

// ACTION CREATORS
export const {
  setCurrentPage,
  setAmountOfElementsToShow,
  setPacks,
  sortCards,
  setOnePackCards,
  setPortionNumber,
} = slice.actions
