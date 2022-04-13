import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  amountOfElementsToShow: 10,
  totalPacksCount: 400,
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
  },
})

export const cardsReducer = slice.reducer

// ACTION CREATORS
export const { setCurrentPage, setAmountOfElementsToShow } = slice.actions
