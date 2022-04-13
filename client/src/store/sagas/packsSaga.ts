import { call, put, takeEvery } from 'redux-saga/effects'
import { setSearchPack } from 'store/reducers'

function* searchPacksWorker(data: any) {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    try {
        yield put(setSearchPack(''))
        // yield call(userApi.login, data.values)
        // yield put(setIsLoggedInAC(true))
    } catch (e) {
        console.log(e)
    }
}


export function* searchPacksWatcher() {
    // yield takeEvery(AuthTypeSaga.LogOutSaga, searchPacksWorker)
}
