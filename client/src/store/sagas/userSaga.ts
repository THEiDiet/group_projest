import { AxiosResponse } from 'axios'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  requestChangeNameType,
  requestChangePasswordType,
  setUpdatedUserInfo,
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
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* setNewPasswordWorker(action: requestChangePasswordType) {
  try {
    // отправить запрос на изменение с токеном и паролем, если все ок залогиниться?
    yield call(userApi.setNewPassword, action.payload)
    // что сделать, если упадет ошибка?
    yield put(setIsLoggedInAC(true))
  } catch (e) {
    // поправить нормальную обработку ошибок
    console.warn(e)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* UserWatcher() {
  yield takeLatest('REQUEST_CHANGE_NAME', setNameWorker)
  yield takeEvery('REQUEST_CHANGE_PASS', setNewPasswordWorker)
}
