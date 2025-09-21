import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authslice from './authslice'
import jobslice from "./jobslice";
import companyslice from './companyslice'  // 👈 import karo
import applicationSlice from './applicationSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer=combineReducers({
    auth:authslice,
    job:jobslice,
    company: companyslice, 
    application:applicationSlice  
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export default store