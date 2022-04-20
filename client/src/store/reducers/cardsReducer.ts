import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EHelpers, EPacksSort } from 'enums'
import { CardT, PackT, SortT } from 'types'
import { CardsPackT, GetPacksResponseT } from 'types/PacksType'

const initialState = {
  currentPage: 1,
  amountOfElementsToShow: 10,
  portionSizeForPages: 10,
  portionNumber: 1,
  packs: [] as CardsPackT[],
  page: 1,
  pageCount: 0,
  cardPacksTotalCount: 0,
  rangeValues: {
    minCardsCount: 0,
    maxCardsCount: 25,
  },
  currentPack: {
    cards: [] as CardT[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
  },
  revert: {
    [EPacksSort.Name]: false,
    [EPacksSort.UserName]: false,
    [EPacksSort.Date]: false,
    [EPacksSort.CardsCount]: false,
  },
  searchPack: '',
  onlyUserPack: [] as CardsPackT[],
  localMinRage: 0,
  localMaxRage: 25,
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
    setPacks: (state, action: PayloadAction<GetPacksResponseT>) => {
      const { cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount, pageCount, page } =
        action.payload
      state.packs = cardPacks
      state.rangeValues = { minCardsCount, maxCardsCount }
      console.log(state.rangeValues)
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
    setSearchPacks: (state, action: PayloadAction<string>) => {
      const { payload: filterByName } = action
      state.searchPack = filterByName
    },
    setMinMaxCardInPacks: (state, action: PayloadAction<[number, number]>) => {
      const [min, max] = action.payload
      state.localMinRage = min
      state.localMaxRage = max
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
  setMinMaxCardInPacks,
  setSearchPacks,
} = slice.actions
