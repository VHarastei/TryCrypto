import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';
import { Api } from './../../api/index';
import { fetchUserAssets } from './assetsSlice';
import {
  Asset,
  HistoricalDataItem,
  LoadingState,
  PaginatedTransactions,
  UserPortfolio,
} from './types';

export type UserSliceState = {
  portfolio: UserPortfolio;
};

const initialState: UserSliceState = {
  portfolio: {
    balance: 0,
    recentTransactions: [],
    yesterdaysPNL: { usdValue: 0, usdValueChangePercetage: 0 },
    thirtydaysPNL: { usdValue: 0, usdValueChangePercetage: 0 },
    historicalData: { balance: [], PNL: [] },
    transactionHistory: {
      currentPage: 0,
      totalItems: 0,
      totalPages: 0,
      items: [],
      loadingState: LoadingState.NEVER,
    },
  },
};

export const fetchHistoricalBalanceData = createAsyncThunk<HistoricalDataItem[], number>(
  'user/fetchHistoricalBalanceData',
  async (interval) => {
    const balance = await Api().getHistoricalBalanceData(interval);
    return balance;
  }
);

export const fetchHistoricalPnlData = createAsyncThunk<HistoricalDataItem[], number>(
  'user/fetchHistoricalPnlData',
  async (interval) => {
    const pnl = await Api().getHistoricalPnlData(interval);
    return pnl;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPortfolio: (state, action: PayloadAction<UserPortfolio>) => {
      state.portfolio = action.payload;
    },
    setUserTransactionHistory: (state, action: PayloadAction<PaginatedTransactions>) => {
      state.portfolio.transactionHistory = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchUserAssets.fulfilled.type,
        (state, action: PayloadAction<{ assets: Asset[]; balance: number }>) => {
          state.portfolio.balance = action.payload.balance;
        }
      )
      .addCase(
        fetchHistoricalBalanceData.fulfilled.type,
        (state, action: PayloadAction<HistoricalDataItem[]>) => {
          state.portfolio.historicalData.balance = action.payload;
        }
      )
      .addCase(
        fetchHistoricalPnlData.fulfilled.type,
        (state, action: PayloadAction<HistoricalDataItem[]>) => {
          state.portfolio.historicalData.PNL = action.payload;
        }
      )
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.portfolio = action.payload.user.portfolio;
      }),
});

export const { setUserPortfolio, setUserTransactionHistory } = userSlice.actions;
export const userReducer = userSlice.reducer;
