import { SagaIterator } from 'redux-saga'
import { call, put, StrictEffect, takeEvery, takeLatest } from 'redux-saga/effects'

import { cardsApi } from 'api/cardsApi'
import { setOnePackCards, setPacks } from 'store/reducers'
import { PackT } from 'types'
import { GetCardWorkerT, GetPackResponseT } from 'types/PacksType'

function* packsWorker({
  payload,
}: GetCardWorkerT): Generator<StrictEffect, void, GetPackResponseT> {
  try {
    const response: GetPackResponseT = yield call(cardsApi.getPack, payload)
    yield put(setPacks(response))
  } catch (e) {
    yield put({ type: 'error', payload: e })
  }
}

function* onePackCardsWorker({ payload }: GetCardWorkerT): Generator<StrictEffect, void, PackT> {
  try {
    const response: PackT = yield call(cardsApi.getOnePackCards, payload)
    yield put(setOnePackCards(response))
  } catch (e) {
    yield put({ type: 'error', payload: e })
  }
}


export function* cardsWatcher(): SagaIterator {
  yield takeEvery('GET_CARDS', packsWorker)
  yield takeLatest('GET_ONE_PACK_CARDS', onePackCardsWorker)
}
