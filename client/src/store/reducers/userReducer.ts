import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from 'types'

const initialState = {
  userInfo: {} as UserType,
  error: '',
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUpdatedUserInfo(state, action: PayloadAction<UserType>) {
      // eslint-disable-next-line no-debugger
      state.userInfo = action.payload
    },
    setUserInfo(state, action: PayloadAction<UserType>) {
      state.userInfo = action.payload
    },
    setUserError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})

export const userReducer = slice.reducer

// ACTION CREATORS

export const { setUpdatedUserInfo, setUserInfo, setUserError } = slice.actions

export const requestChangeUserInfo = (name: string, avatar: string) =>
  ({
    type: 'REQUEST_CHANGE_USER_INFO',
    payload: { name, avatar },
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
