import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EHelpers, EPacksSort } from 'enums'
import { CardsPackT, GetPackResponseT } from 'store/sagas/cardsSaga'
import { CardsT, SortT } from 'types/PackTypes'

const initialState = {
  packs: [] as CardsPackT[],
  page: 1,
  pageCount: 0,
  cardPacksTotalCount: 0,
  rangeValues: {
    minCardsCount: 0,
    maxCardsCount: 0,
  },
  currentPack: null as unknown as CardsT,
  revert: {
    [EPacksSort.Name]: false,
    [EPacksSort.UserName]: false,
    [EPacksSort.Date]: false,
    [EPacksSort.CardsCount]: false,
  },
  searchPack: '',
  actualPacks: [] as CardsPackT[],
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<GetPackResponseT>) => {
      const { cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount, pageCount, page } =
        action.payload
      state.packs = cardPacks
      state.rangeValues = { minCardsCount, maxCardsCount }
      state.page = page
      state.pageCount = pageCount
      state.cardPacksTotalCount = cardPacksTotalCount
      state.actualPacks = cardPacks
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
    setOnePackCards: (state, action: PayloadAction<CardsT>) => {
      state.currentPack = action.payload
    },
    setSearchPacks: (state, action: PayloadAction<string>) => {
      const { payload: filterByName } = action
      state.searchPack = filterByName
      state.actualPacks = state.packs.filter(
        p => p.name.toLowerCase().includes(filterByName.toLowerCase()) && p,
      )
    },
  },
})

export const packsReducer = slice.reducer

export const { setPacks, sortCards, setOnePackCards, setSearchPacks } = slice.actions
