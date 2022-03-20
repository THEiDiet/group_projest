import { all } from 'redux-saga/effects'

import { watcherSaga } from 'store/sagas/testSaga'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* rootSaga() {
  yield all([watcherSaga()])
}
