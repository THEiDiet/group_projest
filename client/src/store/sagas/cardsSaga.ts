import { AxiosError, AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, put, StrictEffect, takeLatest } from 'redux-saga/effects'

import { CardTypePartial } from '../../types/PackTypes'

import { cardsApi } from 'api/cardsApi'
import { SagaActions } from 'enums/sagaActions'
import { setOnePackCards, setPacks } from 'store/reducers'
import { setError } from 'store/reducers/appReducer'
import { PackT } from 'types'
import { CardsPackT, GetPacksPayload, GetPacksWorkerT } from 'types/PacksType'

function* packsWorker({ payload }: GetPacksWorkerT): Generator<StrictEffect, void, CardsPackT[]> {
  try {
    // @ts-ignore
    // const response: AxiosResponse< CardsPackT[],GetPacksWorkerT> = yield call(cardsApi.getPacks, payload)
    const response: AxiosResponse<any> = yield call(cardsApi.getPacks, payload)
    yield put(setPacks(response.data))
  } catch (e) {
    // yield put({ type: 'error', payload: e })
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

type CardsT = any
type GetCardWorkerT = any

function* onePackCardsWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
    const response: AxiosResponse<PackT> = yield call(cardsApi.getOnePackCards, payload)
    yield put(setOnePackCards(response.data))
  } catch (e) {
    console.log(e)
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

export const getPacksS = (payload?: Partial<GetPacksPayload>) =>
  ({ type: SagaActions.GetPacks, payload } as const)

export const getOnePackS = (payload: any) => ({ type: SagaActions.GetOnePack, payload } as const)

export const deleteOneCard = (payload: string) =>
  ({ type: SagaActions.DeleteCard, payload } as const)

function* deleteOneCardFromPackWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
  console.log(payload)
  yield call(cardsApi.deleteCardFromCurrentPack, payload)
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

function* updateOneCardFromPackWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
    console.log(payload)
    yield call(cardsApi.updateCardInCurrentPack, payload)
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}
export const updateOneCard = (payload: string) =>
    ({ type: SagaActions.UpdateOrCreateCard, payload } as const)


export function* cardsWatcher(): SagaIterator {
  yield takeLatest(SagaActions.GetPacks, packsWorker)
  yield takeLatest(SagaActions.GetOnePack, onePackCardsWorker)
  yield takeLatest(SagaActions.DeleteCard, deleteOneCardFromPackWorker)
  yield takeLatest(SagaActions.UpdateOrCreateCard, updateOneCardFromPackWorker)
}
