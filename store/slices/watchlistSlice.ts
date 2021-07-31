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

// export const fetchUserWatchlist = createAsyncThunk<WatchlistCurrency[]>(
//   'watchlist/fetchUserWatchlist',
//   async () => {
//     const watchlist = await Api().getUserWatchlist();
//     return watchlist;
//   }
// );

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
  },
  extraReducers: (builder) =>
    builder
      // .addCase(
      //   fetchUserWatchlist.fulfilled.type,
      //   (state, action: PayloadAction<WatchlistCurrency[]>) => {
      //     state.watchlist.items = action.payload;
      //   }
      // )
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
          console.log(index);
          if (index !== -1) state.items.splice(index, 1);
          state.loadingState = LoadingState.LOADED;
        }
      )
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.items = action.payload.watchlist.items;
      }),
});

export const { setUserWatchlist } = watchlistSlice.actions;
export const watchlistReducer = watchlistSlice.reducer;
