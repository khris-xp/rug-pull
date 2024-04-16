import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { authSlice } from './auth/auth.slice';
import { boardGameSlice } from './board-game/board-game.slice';
import storage from './storage';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  boardGames: boardGameSlice.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'board-game'],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
