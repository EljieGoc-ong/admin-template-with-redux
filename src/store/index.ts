import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { baseApi } from './api/baseApi'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import dashboardReducer from './slices/dashboardSlice'
import uiReducer from './slices/uiSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
})

setupListeners(store.dispatch)

let resolveRehydrated: () => void
/** Resolves when persist rehydration is complete. Await before first render to avoid double paint. */
export const whenRehydrated = new Promise<void>((r) => {
  resolveRehydrated = r
})

export const persistor = persistStore(store, undefined, () => resolveRehydrated?.())
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
