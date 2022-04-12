import { call, put, takeEvery } from 'redux-saga/effects'

import { userApi } from 'api/userApi'
import { AuthTypeSaga } from 'enums/AuthTypeSaga'
import { setIsLoggedInAC } from 'store/reducers'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* loginWorker(data: any) {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  try {
    yield call(userApi.login, data.values)
    yield put(setIsLoggedInAC(true))
  } catch (e) {
    console.log(e)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* loginWatcher() {
  yield takeEvery(AuthTypeSaga.LoginSaga, loginWorker)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* logOutWorker() {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
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
