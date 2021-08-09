import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import { assetsReducer, AssetsSliceState } from './slices/assetsSlice';
import { userReducer, UserSliceState } from './slices/userSlice';
import { watchlistReducer, WatchlistSliceState } from './slices/watchlistSlice';

export type RootState = {
  user: UserSliceState;
  assets: AssetsSliceState;
  watchlist: WatchlistSliceState;
};

export const rootReducer = combineReducers({
  user: userReducer,
  assets: assetsReducer,
  watchlist: watchlistReducer,
});

export const makeStore = (): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
  });

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<Store<RootState>>(makeStore);
//{ debug: true }
