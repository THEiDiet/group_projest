import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { userApi } from '../../api'
import { UserType } from '../../types'

import { setUserInfo } from './userReducer'

const initialState = {
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializeAC: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isInitialized = action.payload
    },
  },
})

export const appReducer = slice.reducer

export const { setInitializeAC } = slice.actions

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const requestInitialize = () => ({ type: 'REQUEST_INITIALIZE' })

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* setInitializeWorker() {
  try {
    const response: AxiosResponse<UserType> = yield call(userApi.me)
    yield put(setUserInfo(response.data))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setInitializeAC(true))
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* AppWatcher() {
  yield takeLatest('REQUEST_INITIALIZE', setInitializeWorker)
}

// export type NullableType<T> = null | T
// export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
