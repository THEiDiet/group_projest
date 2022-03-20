import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  counter: 0,
  users: [],
}
const testSlice = createSlice({
  name: 'testReducer',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.counter += action.payload
    },
    subst: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.counter -= action.payload
    },
    getUsers: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload.users
    },
  },
})
export const { add, subst, getUsers } = testSlice.actions
export const testReducer = testSlice.reducer
