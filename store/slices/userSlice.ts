import { Currency } from './../../pages/market/[currencyId]';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';

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

export type UserSliceState = {
  portfolio: UserPortfolio | null;
};

const initialState: UserSliceState = {
  portfolio: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPortfolio: (state, action: PayloadAction<UserPortfolio>) => {
      state.portfolio = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
      state.portfolio = action.payload.user.portfolio;
    }),
});

export const { setUserPortfolio } = userSlice.actions;
export const userReducer = userSlice.reducer;
