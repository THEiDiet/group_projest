import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { userApi } from '../../api'

const initialState = {
  isLoggedIn: false,
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

// ACTION CREATORS

export const { setIsLoggedInAC, setUpdatedUserInfo } = slice.actions

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,no-unused-vars,@typescript-eslint/no-unused-vars
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

// SAGAS

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* setNameWorker(action: requestChangeNameType) {
  try {
    // Отправить запрос на изменение имени и аватарки, т.к. до аватарки пока не дошли - пусто.
    const res: AxiosResponse<UserType> = yield call(userApi.update, {
      name: action.payload,
      avatar: '',
    })
    // по  окончании запроса , приходить полный объект юзер и сетаем его в стейт
    yield put(setUpdatedUserInfo(res.data))
  } catch (e) {
    // поправить нормальную обработку ошибок
    console.warn(e)
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* setNewPasswordWorker(action: requestChangePasswordType) {
  try {
    // отправить запрос на изменение с токеном и паролем, если все ок залогиниться?
    yield call(userApi.setNewPassword, action.payload)
    // что сделать, если не упадет ошибка?
    yield put(setIsLoggedInAC(true))
  } catch (e) {
    // поправить нормальную обработку ошибок
    console.warn(e)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* AuthWatcher() {
  yield takeLatest('REQUEST_CHANGE_NAME', setNameWorker)
  yield takeLatest('REQUEST_CHANGE_PASS', setNewPasswordWorker)
}

// TYPES

type requestChangeNameType = ReturnType<typeof requestChangeName>
type requestChangePasswordType = ReturnType<typeof requestChangePassword>

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
