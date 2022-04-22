import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setError } from '../reducers/appReducer'

import { userApi } from 'api/userApi'
import { AuthTypeSaga } from 'enums/AuthTypeSaga'
import { setIsLoggedInAC, setUserInfo } from 'store/reducers'
import { UserType } from 'types'

function* loginWorker(data: any) {
  try {
    const res: AxiosResponse<UserType> = yield call(userApi.login, data.values)
    console.log(res)
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    yield put(setUserInfo(res.data))
    yield put(setIsLoggedInAC(true))
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

export function* loginWatcher() {
  yield takeEvery(AuthTypeSaga.LoginSaga, loginWorker)
}

function* logOutWorker() {
  try {
    yield call(userApi.logOut)
    yield put(setIsLoggedInAC(false))
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* logOutWatcher() {
  yield takeEvery(AuthTypeSaga.LogOutSaga, logOutWorker)
}
