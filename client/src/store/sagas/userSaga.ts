import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  requestChangeNameType,
  requestChangePasswordType,
  setUpdatedUserInfo,
  setUserError,
} from '../reducers/userReducer'

import { userApi } from 'api/userApi'
import { setIsLoggedInAC } from 'store/reducers'
import { setNameUserResponseType } from 'types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* setNameWorker(action: requestChangeNameType) {
  try {
    const res: AxiosResponse<setNameUserResponseType> = yield call(userApi.update, {
      name: action.payload,
      avatar: '',
    })
    yield put(setUpdatedUserInfo(res.data.updatedUser))
  } catch (e) {
    console.warn(e)
  }
}

export function* setNewPasswordWorker(action: requestChangePasswordType) {
  try {
    // отправить запрос на изменение с токеном и паролем, если все ок залогиниться?
    const response: AxiosResponse = yield call(userApi.setNewPassword, action.payload)
    // тут должен быть login запрос?
    yield put(setIsLoggedInAC(true))
  } catch (e) {
    yield put(setUserError((e as AxiosError)?.response?.data.error))
  }
}

export function* UserWatcher() {
  yield takeLatest('REQUEST_CHANGE_NAME', setNameWorker)
  yield takeEvery('REQUEST_CHANGE_PASS', setNewPasswordWorker)
}
