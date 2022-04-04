import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { userApi } from '../../api'

const initialState = {
  isLoggedIn: true,
  user: {} as UserType,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = action.payload
    },
    setUpdatedUserInfo(state, action: PayloadAction<UserType>) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload
    },
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC, setUpdatedUserInfo } = slice.actions

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const requestInitialize = () => ({ type: 'REQUEST_INITIALIZE' })
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,no-unused-vars,@typescript-eslint/no-unused-vars
export const requestChangeName = (name: string) =>
  ({
    type: 'REQUEST_CHANGENAME',
    payload: name,
  } as const)

type requestChangeNameType = ReturnType<typeof requestChangeName>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* setNameWorker(action: requestChangeNameType) {
  try {
    const res: AxiosResponse<UserType> = yield call(userApi.update, {
      name: action.payload,
      avatar: '',
    })
    yield put(setUpdatedUserInfo(res.data))
  } catch (e) {
    console.warn(e)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* AuthWatcher() {
  yield takeLatest('REQUEST_CHANGENAME', setNameWorker)
}

type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}
