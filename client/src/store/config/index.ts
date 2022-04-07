import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { testReducer } from 'store/reducers'
import { appReducer } from 'store/reducers/appReducer'
import { authReducer } from 'store/reducers/authReducer'
import { userReducer } from 'store/reducers/userReducer'
import rootSaga from 'store/sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    app: appReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
