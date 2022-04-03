import { call, put, takeEvery } from 'redux-saga/effects'

import { AuthTypeSaga } from '../../../enums/AuthTypeSaga'
import { LoginParamsType } from '../../../types/userApiType'
import { setIsLoggedInAC } from '../../reducers/authReducer/authReducer'

import { userApi } from 'api/userApi'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* loginWorker(data: LoginParamsType) {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const response = yield call(userApi.login(data))
  yield put(setIsLoggedInAC({ isLoggedIn: true }))
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* logOutWorker() {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const response = yield call(userApi.logOut())
  yield put(setIsLoggedInAC({ isLoggedIn: false }))
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* loginWatcher() {
  // @ts-ignore
  yield takeEvery(AuthTypeSaga.LoginSaga, loginWorker)
  // @ts-ignore
  yield takeEvery(AuthTypeSaga.LogOutSaga, logOutWorker)
}
