import { Currency } from './../../pages/market/[currencyId]';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';

type PortfolioCurrency = Omit<Currency, 'image'>;

type PortfolioAsset = {
  id: number;
  amount: number;
  currency: PortfolioCurrency;
};

export type UserPortfolio = {
  assets: PortfolioAsset[];
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
