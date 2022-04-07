import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { userApi } from '../../api'
import { UserType } from '../../types'
import { setIsLoggedInAC } from '../reducers/authReducer'
import {
  requestChangeNameType,
  requestChangePasswordType,
  setUpdatedUserInfo,
} from '../reducers/userReducer'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* setNameWorker(action: requestChangeNameType) {
  try {
    // Отправить запрос на изменение имени и аватарки, т.к. до аватарки пока не дошли - пусто.
    const res: AxiosResponse<UserType> = yield call(userApi.update, {
      name: action.payload,
      avatar: '',
    })
    // по окончании запроса, приходить полный объект юзер и сетаем его в стейт
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
  yield takeLatest('REQUEST_CHANGE_PASS', setNewPasswordWorker)
}
