import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})
export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions
