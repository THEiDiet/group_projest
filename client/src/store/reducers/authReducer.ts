import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// init State
const initialState = {
  isLoggedIn: false,
}
// reducer
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})

export const authReducer = slice.reducer

// ACTION CREATORS
export const { setIsLoggedInAC } = slice.actions
