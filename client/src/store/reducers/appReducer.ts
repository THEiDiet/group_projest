import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { userApi } from '../../api'

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
    yield call(userApi.me)
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
