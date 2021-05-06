import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import rootSaga from './sagas'

// creates the store
const configureStore = (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */

    const middleware = []
    const enhancers = []


    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware))


    const createAppropriateStore = createStore
    const store = createAppropriateStore(rootReducer, compose(...enhancers))

    // kick off root saga
    sagaMiddleware.run(rootSaga)

    return store
}

const createRootStore =  () => {
    return configureStore(rootReducer, rootSaga)
}

export { createRootStore }