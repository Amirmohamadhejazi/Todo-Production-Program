//
import reducers from './reducers';
import sagas from './sagas';
import createSagaMiddleware from 'redux-saga'
import {
    configureStore,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper'

export const makeStore = (context) => {
    const sagaMiddleware = createSagaMiddleware();
    // const store = createStore(reducers, bindMiddleware([sagaMiddleware]))
    const store = configureStore({
  reducer: reducers,
   middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
});

    store.sagaTask = sagaMiddleware.run(sagas)

    return store
}

export const wrapper = createWrapper(makeStore, { debug: true })
