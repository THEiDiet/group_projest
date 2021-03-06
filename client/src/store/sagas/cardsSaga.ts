import { AxiosError, AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, put, select, StrictEffect, takeLatest } from 'redux-saga/effects'

import { RootState } from '../config'
import { setCardUpdatedGrade } from '../reducers/cardsReducer'

import { cardsApi } from 'api/cardsApi'
import { SagaActions } from 'enums/sagaActions'
import { setOnePackCards, setPacks } from 'store/reducers'
import { setError } from 'store/reducers/appReducer'
import { PackT } from 'types'
import { CardsPackT, GetPacksPayload, GetPacksResponseT, GetPacksWorkerT } from 'types/PacksType'
import { UpdatedGradeRequestT, UpdatedGradeT, CardTypePartial } from 'types/PackTypes'

function* packsWorker({ payload }: GetPacksWorkerT): Generator<StrictEffect, void, CardsPackT[]> {
  try {
    // @ts-ignore
    const response: AxiosResponse<GetPacksResponseT> = yield call(cardsApi.getPacks, payload)
    yield put(setPacks(response.data))
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data.error))
  }
}
type CardsT = any

function* onePackCardsWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
    const response: AxiosResponse<PackT> = yield call(cardsApi.getOnePackCards, payload)
    yield put(setOnePackCards(response.data))
  } catch (e) {
    console.log(e)
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

export const getOnePackS = (payload: CardTypePartial) =>
  ({ type: SagaActions.GetOnePack, payload } as const)

export const deleteOneCard = (payload: string) =>
  ({ type: SagaActions.DeleteCard, payload } as const)

const getCurrentPackId = (state: RootState) => state.cards.currentPackId
const getCardsTotalCount = (state: RootState) => state.cards.currentPack.cardsTotalCount

function* deleteOneCardFromPackWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
    console.log(payload)
    yield call(cardsApi.deleteCardFromCurrentPack, payload)

    // eslint-disable-next-line camelcase
    const cardsPack_id = yield select(getCurrentPackId)
    const max = yield select(getCardsTotalCount)
    // eslint-disable-next-line camelcase
    yield put({ type: SagaActions.GetOnePack, payload: { cardsPack_id, max } })
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

function* updateOneCardFromPackWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
    console.log(payload)
    yield call(cardsApi.updateCardInCurrentPack, payload)
    // eslint-disable-next-line camelcase
    const cardsPack_id = yield select(getCurrentPackId)
    const max = yield select(getCardsTotalCount)
    // eslint-disable-next-line camelcase
    yield put({ type: SagaActions.GetOnePack, payload: { cardsPack_id, max } })
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}
export const updateOneCard = (payload: CardTypePartial) =>
  ({ type: SagaActions.UpdateCard, payload } as const)

function* createNewCardInPackWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
    yield call(cardsApi.createCardInCurrentPack, payload)
    // eslint-disable-next-line camelcase
    const cardsPack_id = yield select(getCurrentPackId)
    const max = yield select(getCardsTotalCount)
    // eslint-disable-next-line camelcase
    yield put({ type: SagaActions.GetOnePack, payload: { cardsPack_id, max } })
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data.error))
  }
}
export const createNewCard = (payload: CardTypePartial) =>
  ({ type: SagaActions.CreateCard, payload } as const)

function* rateCardWorker({ payload }: any): Generator<StrictEffect, void, CardsT> {
  try {
    const response: UpdatedGradeT = yield call(cardsApi.rateCard, payload)

    // @ts-ignore
    yield put(setCardUpdatedGrade(response.updatedGrade))
  } catch (e) {
    yield put(setError((e as AxiosError)?.response?.data))
  }
}

export const rateCard = (payload: UpdatedGradeRequestT) =>
  ({ type: SagaActions.RateCard, payload } as const)

export function* cardsWatcher(): SagaIterator {
  yield takeLatest(SagaActions.GetPacks, packsWorker)
  yield takeLatest(SagaActions.GetOnePack, onePackCardsWorker)
  yield takeLatest(SagaActions.DeleteCard, deleteOneCardFromPackWorker)
  yield takeLatest(SagaActions.UpdateCard, updateOneCardFromPackWorker)
  yield takeLatest(SagaActions.CreateCard, createNewCardInPackWorker)
  yield takeLatest(SagaActions.RateCard, rateCardWorker)
}

export const getPacksS = (payload: Partial<GetPacksPayload>) =>
  ({ type: SagaActions.GetPacks, payload } as const)

// export const getOnePackS = (payload: any) => ({ type: SagaActions.GetOnePack, payload } as const)
