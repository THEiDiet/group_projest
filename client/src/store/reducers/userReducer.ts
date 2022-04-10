import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from 'types'

const initialState = {
  userInfo: {} as UserType,
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUpdatedUserInfo(state, action: PayloadAction<UserType>) {
      state.userInfo = action.payload
    },
    setUserInfo(state, action: PayloadAction<UserType>) {
      state.userInfo = action.payload
    },
  },
})

export const userReducer = slice.reducer

// ACTION CREATORS

export const { setUpdatedUserInfo, setUserInfo } = slice.actions

export const requestChangeName = (name: string) =>
  ({
    type: 'REQUEST_CHANGE_NAME',
    payload: name,
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

export type requestChangeNameType = ReturnType<typeof requestChangeName>
export type requestChangePasswordType = ReturnType<typeof requestChangePassword>
