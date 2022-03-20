import { call, put, takeEvery } from 'redux-saga/effects'

import { userApi } from 'api/userApi'
import { getUsers } from 'store/reducers/testReducer'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* worker() {
  // @ts-ignore
  const response = yield call(userApi.getAllUsers)
  yield put(getUsers({ users: response.data }))
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* watcherSaga() {
  yield takeEvery('sagaAction', worker)
}
