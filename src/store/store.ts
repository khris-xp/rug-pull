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
import { roomSlice } from './room/room.slice';
import { statusSlice } from './status/status.slice';
import storage from './storage';
import { topicsSlice } from './topics/topics.slice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  boardGames: boardGameSlice.reducer,
  rooms: roomSlice.reducer,
  topics: topicsSlice.reducer,
  status: statusSlice.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'boardGames', 'rooms', 'topics', 'status'],
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
