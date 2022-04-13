import { SagaIterator } from 'redux-saga'
import { call, put, StrictEffect, takeEvery, takeLatest } from 'redux-saga/effects'

import { cardsApi } from 'api/cardsApi'
import { setOnePackCards, setPacks } from 'store/reducers/packReducer'
import { CardsT } from 'types'

export type CardsPackT = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type GetPackResponseT = {
  cardPacks: CardsPackT[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

type GetCardWorkerT = {
  type: string
  payload?: string
}

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

function* onePackCardsWorker({
  payload,
}: GetCardWorkerT): Generator<StrictEffect, void, CardsT> {
  try {
    const response: CardsT = yield call(cardsApi.getOnePackCards, payload)
    yield put(setOnePackCards(response))
  } catch (e) {
    yield put({ type: 'error', payload: e })
  }
}

export function* cardsWatcher(): SagaIterator {
  yield takeEvery('GET_CARDS', packsWorker)
  yield takeLatest('GET_ONE_PACK_CARDS', onePackCardsWorker)
}
