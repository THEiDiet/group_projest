import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'

import { setUserInfo } from './userReducer'

import { userApi } from 'api'
import { cardsApi } from 'api/cardsApi'
import { setIsLoggedInAC } from 'store/reducers/authReducer'
import { CardsPackT } from 'store/sagas/cardsSaga'
import { GenericReturnType, UserType } from 'types'

const initialState = {
  isInitialized: false,
  error: '',
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
    yield put(setIsLoggedInAC(true))
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
