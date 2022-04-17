import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import { userApi } from 'api/userApi'
import { AuthTypeSaga } from 'enums/AuthTypeSaga'
import { setIsLoggedInAC, setUserError, setUserInfo } from 'store/reducers'
import { UserType } from 'types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* loginWorker(data: any) {
  try {
    const res: AxiosResponse<UserType> = yield call(userApi.login, data.values)
    yield put(setUserInfo(res.data))
    yield put(setIsLoggedInAC(true))
  } catch (e) {
    yield put(setUserError((e as AxiosError)?.response?.data.error))
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* loginWatcher() {
  yield takeEvery(AuthTypeSaga.LoginSaga, loginWorker)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* logOutWorker() {
  try {
    yield call(userApi.logOut)
    yield put(setIsLoggedInAC(false))
  } catch (e) {
    console.log(e)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* logOutWatcher() {
  yield takeEvery(AuthTypeSaga.LogOutSaga, logOutWorker)
}
