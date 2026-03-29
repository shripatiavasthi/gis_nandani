import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '../features/auth/authSlice'
import projectsReducer from '../features/projects/projectsSlice'

const persistConfig = {
  key: 'gis-root',
  storage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
