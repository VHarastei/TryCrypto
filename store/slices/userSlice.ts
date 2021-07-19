import { Api } from './../../api/index';
import { Currency } from './../../pages/market/[currencyId]';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';

export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export type Asset = {
  id: number;
  amount: number;
  usdValue: number;
  usdValuePercentage: number;
  currencyPrice: number;
  currency: Currency;
};

export type Transaction = {
  id: number;
  date: string;
  source: 'market' | 'education';
  type: 'buy' | 'sell' | 'receive';
  usdValue: number;
  amount: number;
  asset: Pick<Asset, 'amount' | 'currency'>;
};

export type HistoricalDataItem = {
  date: string;
  usdValue: number;
};

export type HistoricalData = {
  balance: HistoricalDataItem[];
  PNL: HistoricalDataItem[];
};

export type PNL = {
  usdValue: number;
  usdValueChangePercetage: number;
};

export type UserPortfolio = {
  balance: number;
  assets: Asset[];
  transactions: Transaction[];
  yesterdaysPNL: PNL;
  thirtydaysPNL: PNL;
  historicalData: HistoricalData;
};

export interface MarketAsset extends Omit<Asset, 'usdValuePercentage' | 'currencyPrice'> {
  transactions: Omit<Transaction, 'asset'>[];
}

export type UserSliceState = {
  portfolio: UserPortfolio;
  marketAsset: {
    data: MarketAsset | null;
    loadingState: LoadingState;
  };
};

const initialState: UserSliceState = {
  portfolio: {
    balance: 0,
    assets: [],
    transactions: [],
    yesterdaysPNL: { usdValue: 0, usdValueChangePercetage: 0 },
    thirtydaysPNL: { usdValue: 0, usdValueChangePercetage: 0 },
    historicalData: { balance: [], PNL: [] },
  },
  marketAsset: {
    data: null,
    loadingState: LoadingState.NEVER,
  },
};

export const fetchUserAssets = createAsyncThunk<{ assets: Asset[]; balance: number } | undefined>(
  'user/fetchUserAssets',
  async () => {
    try {
      const assets = await Api().getUserAssets();
      return assets;
    } catch (error) {
      console.log('user/fetchUserAssets', error);
    }
  }
);
export const fetchUserMarketAsset = createAsyncThunk<MarketAsset, string>(
  'user/fetchUserMarketAsset',
  async (currencyId) => {
    const asset = await Api().getUserMarketAsset(currencyId);
    return asset;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPortfolio: (state, action: PayloadAction<UserPortfolio>) => {
      state.portfolio = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchUserAssets.fulfilled.type,
        (state, action: PayloadAction<{ assets: Asset[]; balance: number }>) => {
          state.portfolio.assets = action.payload.assets;
          state.portfolio.balance = action.payload.balance;
        }
      )
      .addCase(fetchUserMarketAsset.pending.type, (state) => {
        state.marketAsset.data = null;
        state.marketAsset.loadingState = LoadingState.LOADING;
      })
      .addCase(fetchUserMarketAsset.fulfilled.type, (state, action: PayloadAction<MarketAsset>) => {
        state.marketAsset.data = action.payload;
        state.marketAsset.loadingState = LoadingState.LOADED;
      })
      .addCase(fetchUserMarketAsset.rejected.type, (state) => {
        state.marketAsset.loadingState = LoadingState.ERROR;
      })
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.portfolio = action.payload.user.portfolio;
      }),
});

export const { setUserPortfolio } = userSlice.actions;
export const userReducer = userSlice.reducer;
