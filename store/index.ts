import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { userReducer, UserSliceState } from './slices/userSlice';

export type RootState = {
  user: UserSliceState;
};

export const rootReducer = combineReducers({
  user: userReducer,
});

export const makeStore = (): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });
