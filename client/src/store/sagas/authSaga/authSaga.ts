import { call, put, takeEvery } from 'redux-saga/effects'

import { userApi } from 'api/userApi'
import { AuthTypeSaga } from 'enums/AuthTypeSaga'
import { setIsLoggedInAC } from 'store/reducers/authReducer/authReducer'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* loginWorker(data: any) {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const response = yield call(userApi.login, data.values)
  yield put(setIsLoggedInAC({ isLoggedIn: true }))
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* loginWatcher() {
  // @ts-ignore
  yield takeEvery(AuthTypeSaga.LoginSaga, loginWorker)
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* logOutWorker() {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const response = yield call(userApi.logOut())
  // eslint-disable-next-line no-debugger
  debugger
  yield put(setIsLoggedInAC({ isLoggedIn: false }))
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* logOutWatcher() {
  // @ts-ignore
  yield takeEvery(AuthTypeSaga.LogOutSaga, logOutWorker)
}
