import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from 'types'

const initialState = {
  userInfo: {} as initialStateType,
  error: '',
}
type initialStateType = {
  userId: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  updated: Date
  error?: string
}
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserType>) {
      const {
        name,
        avatar,
        _id: userId,
        error,
        email,
        publicCardPacksCount,
        updated,
      } = action.payload
      state.userInfo = { name, avatar, userId, error, email, publicCardPacksCount, updated }
    },
    setUserError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})

export const userReducer = slice.reducer

// ACTION CREATORS

export const { setUserInfo, setUserError } = slice.actions

export const requestChangeUserInfo = (name: string, avatar: string, email: string) =>
  ({
    type: 'REQUEST_CHANGE_USER_INFO',
    payload: { name, avatar, email },
  } as const)

export const requestChangePassword = (resetPasswordToken: string, password: string) =>
  ({
    type: 'REQUEST_CHANGE_PASS',
    payload: {
      resetPasswordToken,
      password,
    },
  } as const)
// TYPES

export type requestChangeUserInfoType = ReturnType<typeof requestChangeUserInfo>
export type requestChangePasswordType = ReturnType<typeof requestChangePassword>
