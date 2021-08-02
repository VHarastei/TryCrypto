import { RootState } from './../index';
import { HYDRATE } from 'next-redux-wrapper';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '../../api/index';
import { LoadingState, WatchlistCurrency } from './types';

export type WatchlistSliceState = {
  items: WatchlistCurrency[];
  loadingState: LoadingState;
};

const initialState: WatchlistSliceState = {
  items: [],
  loadingState: LoadingState.NEVER,
};

export const fetchUserWatchlistCurrency = createAsyncThunk<WatchlistCurrency, string>(
  'watchlist/fetchUserWatchlistCurrency',
  async (currencyId) => {
    const watchlistCurrency = await Api().getUserWatchlistCurrency(currencyId);
    return watchlistCurrency;
  }
);

export const fetchCreateWatchlistCurrency = createAsyncThunk<WatchlistCurrency, string>(
  'watchlist/fetchCreateWatchlistCurrency',
  async (currencyId) => {
    const watchlistCurrency = await Api().createUserWatchlistCurrency(currencyId);
    return watchlistCurrency;
  }
);
export const fetchDeleteWatchlistCurrency = createAsyncThunk<string, string>(
  'watchlist/fetchDeleteWatchlistCurrency',
  async (currencyId) => {
    const watchlistCurrency = await Api().deleteUserWatchlistCurrency(currencyId);
    return watchlistCurrency;
  }
);

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setUserWatchlist: (state, action: PayloadAction<WatchlistCurrency[]>) => {
      state.items = action.payload;
      state.loadingState = LoadingState.LOADED;
    },
    setUserWatchlistCurrency: (state, action: PayloadAction<WatchlistCurrency>) => {
      const index = state.items.findIndex((i) => i.currencyId === action.payload.currencyId);
      console.log(index);
      if (index === -1) {
        state.items.push(action.payload);
        //state.loadingState = LoadingState.LOADED;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchUserWatchlistCurrency.fulfilled.type,
        (state, action: PayloadAction<WatchlistCurrency[]>) => {
          console.log(action.payload);
        }
      )
      .addCase(fetchCreateWatchlistCurrency.pending.type, (state) => {
        state.loadingState = LoadingState.LOADING;
      })
      .addCase(
        fetchCreateWatchlistCurrency.fulfilled.type,
        (state, action: PayloadAction<WatchlistCurrency>) => {
          state.items.push(action.payload);
          state.loadingState = LoadingState.LOADED;
        }
      )
      .addCase(fetchDeleteWatchlistCurrency.pending.type, (state) => {
        state.loadingState = LoadingState.LOADING;
      })
      .addCase(
        fetchDeleteWatchlistCurrency.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          const index = state.items.findIndex((i) => i.currencyId === action.payload);
          if (index !== -1) state.items.splice(index, 1);
          state.loadingState = LoadingState.LOADED;
        }
      )
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        //state = { ...state, ...action.payload }
        if (state.loadingState === LoadingState.NEVER) {
          state.loadingState = action.payload.watchlist.loadingState;
          state.items = action.payload.watchlist.items;
        }
      }),
});

export const { setUserWatchlist, setUserWatchlistCurrency } = watchlistSlice.actions;
export const watchlistReducer = watchlistSlice.reducer;
