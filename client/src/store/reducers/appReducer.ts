import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects'

import { userApi } from '../../api'
import { GenericReturnType, UserType } from '../../types'

import { setUserInfo } from './userReducer'

const initialState = {
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializeAC: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const appReducer = slice.reducer

export const { setInitializeAC } = slice.actions

export const requestInitialize = () => ({ type: 'REQUEST_INITIALIZE' })

export function* setInitializeWorker(): SagaIterator {
  try {
    const response: AxiosResponse<UserType> = yield call(userApi.me)
    yield put(setUserInfo(response.data))
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setInitializeAC(true))
  }
}

export function* AppWatcher(): GenericReturnType {
  yield takeLatest('REQUEST_INITIALIZE', setInitializeWorker)
}

// export type NullableType<T> = null | T
// export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
