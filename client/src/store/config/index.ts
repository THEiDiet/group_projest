import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { appReducer } from '../reducers/appReducer'

import { testReducer } from 'store/reducers'
import { authReducer } from 'store/reducers/authReducer'
import rootSaga from 'store/sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
