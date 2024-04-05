import { configureStore } from '@reduxjs/toolkit'
import userSlicer from './slice/userSlicer'

import storage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig, userSlicer);


export const store = configureStore({
    reducer: {
        user:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export const persistor = persistStore(store);