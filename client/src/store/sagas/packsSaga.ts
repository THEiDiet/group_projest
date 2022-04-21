import { AxiosError } from 'axios'
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { AddPackT, cardsApi } from 'api/cardsApi'
import { SagaActions } from 'enums/sagaActions'
import { RootState } from 'store/config'
import { setError } from 'store/reducers/appReducer'
import { getPacksS } from 'store/sagas/cardsSaga'

function* addPacksWorker({ payload }: AddPackST) {
  try {
    yield call(cardsApi.addPack, payload)
    const { cards }: RootState = yield select()
    yield put(getPacksS({ max: cards.rangeValues.maxCardsCount }))
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

function* editPackWorker({ payload }: AddPackST) {
  try {
    yield call(cardsApi.updatePack, payload)
    const { cards }: RootState = yield select()
    yield put(getPacksS({ max: cards.rangeValues.maxCardsCount }))
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

function* deletePackWorker({ payload }: DelPackST) {
  try {
    yield call(cardsApi.deletePack, payload)
    const { cards }: RootState = yield select()
    yield put(getPacksS({ max: cards.rangeValues.maxCardsCount }))
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

export function* packsWatcher() {
  yield takeEvery(SagaActions.AddPack, addPacksWorker)
  yield takeEvery(SagaActions.DeletePack, deletePackWorker)
  yield takeLatest(SagaActions.UpdatePack, editPackWorker)
}
export const addPackS = (payload: AddPackT) => ({ type: SagaActions.AddPack, payload } as const)
export const delPackS = (payload: string) => ({ type: SagaActions.DeletePack, payload } as const)
export const updatePackS = (payload: AddPackT) =>
  ({ type: SagaActions.UpdatePack, payload } as const)
type AddPackST = ReturnType<typeof addPackS>
type UpdatePackST = ReturnType<typeof updatePackS>
type DelPackST = ReturnType<typeof delPackS>
