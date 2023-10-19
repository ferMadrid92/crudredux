import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
//redux Persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: true
})

export const persistor = persistStore(store)
export default store
