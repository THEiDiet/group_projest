import { SagaIterator } from 'redux-saga'
import { call, put, StrictEffect, takeEvery, takeLatest } from 'redux-saga/effects'

import { cardsApi } from 'api/cardsApi'
import { SagaActions } from 'enums/sagaActions'
import { setOnePackCards, setPacks } from 'store/reducers'
import { PackT } from 'types'
import { GetPacksWorkerT, GetPacksResponseT, GetPacksPayload } from 'types/PacksType'

function* packsWorker({
  payload,
}: GetPacksWorkerT): Generator<StrictEffect, void, GetPacksResponseT> {
  try {
    const response: GetPacksResponseT = yield call(cardsApi.getPacks, payload)
    yield put(setPacks(response))
  } catch (e) {
    yield put({ type: 'error', payload: e })
  }
}

function* onePackCardsWorker({
  payload,
}: {
  payload: string
  type: string
}): Generator<StrictEffect, void, PackT> {
function* onePackCardsWorker({ payload }: GetCardWorkerT): Generator<StrictEffect, void, CardsT> {
  try {
    const response: PackT = yield call(cardsApi.getOnePackCards, payload)
    yield put(setOnePackCards(response))
  } catch (e) {
    yield put({ type: 'error', payload: e })
  }
}

export function* cardsWatcher(): SagaIterator {
  yield takeEvery(SagaActions.GetPacks, packsWorker)
  yield takeLatest('GET_ONE_PACK_CARDS', onePackCardsWorker)
}

export const getPacksS = (payload?: Partial<GetPacksPayload>) =>
  ({ type: SagaActions.GetPacks, payload } as const)

export const getOnePackS = (payload: GetPacksWorkerT) =>
  ({ type: SagaActions.GetPacks, payload } as const)
