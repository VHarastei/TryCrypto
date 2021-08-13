import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthPayload } from 'api/authApi';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';
import { Api } from './../../api/index';
import { fetchUserAssets } from './assetsSlice';
import {
  Asset,
  HistoricalDataItem,
  LoadingState,
  PaginatedTransactions,
  User,
  UserPortfolio,
} from './types';

export type UserSliceState = {
  portfolio: UserPortfolio;
  data: User | null;
  loadingState: LoadingState;
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
  data: null,
  loadingState: LoadingState.NEVER,
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

export const fetchRegister = createAsyncThunk<undefined, AuthPayload>(
  'user/fetchRegister',
  async (payload) => {
    const user = await Api().register(payload);
    return user;
  }
);

export const fetchLogin = createAsyncThunk<User, AuthPayload>(
  'user/fetchLogin',
  async (payload) => {
    const user = await Api().login(payload);
    return user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPortfolio: (state, action: PayloadAction<UserPortfolio>) => {
      state.portfolio = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserSliceState['data']>) => {
      state.data = action.payload;
    },
    setUserLoadingState: (state, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
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
      .addCase(fetchLogin.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.loadingState = LoadingState.LOADED;
      })
      .addCase(fetchLogin.pending.type, (state) => {
        state.data = null;
        state.loadingState = LoadingState.LOADING;
      })
      .addCase(fetchLogin.rejected.type, (state) => {
        state.loadingState = LoadingState.ERROR;
      })
      .addCase(fetchRegister.fulfilled.type, (state) => {
        state.loadingState = LoadingState.LOADED;
      })
      .addCase(fetchRegister.pending.type, (state) => {
        state.loadingState = LoadingState.LOADING;
      })
      .addCase(fetchRegister.rejected.type, (state) => {
        state.loadingState = LoadingState.ERROR;
      })
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.portfolio = action.payload.user.portfolio;
        state.data = action.payload.user.data;
      }),
});

export const { setUserPortfolio, setUserData, setUserLoadingState, setUserTransactionHistory } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
