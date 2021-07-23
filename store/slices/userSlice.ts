import { Api } from './../../api/index';
import { Currency } from './../../pages/market/[currencyId]';
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';
import { CreateTransactionPayload } from 'api/userApi';

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
  transactions: Transaction[];
};

export type Transaction = {
  id: number;
  date: string;
  source: 'market' | 'education';
  type: 'buy' | 'sell' | 'receive';
  usdValue: number;
  amount: number;
  total: number;
  asset: Pick<Asset, 'amount' | 'currency'>;
};

export interface RecentTransaction extends Transaction {
  asset: Pick<Asset, 'amount' | 'currency'>;
}

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
  recentTransactions: RecentTransaction[];
  yesterdaysPNL: PNL;
  thirtydaysPNL: PNL;
  historicalData: HistoricalData;
};

// export interface MarketAsset extends Omit<Asset, 'usdValuePercentage' | 'currencyPrice'> {
//   transactions: Omit<Transaction, 'asset'>[];
// }

export type UserSliceState = {
  portfolio: UserPortfolio;
  assets: {
    items: Asset[];
    loadingState: LoadingState;
  };
  // marketAsset: {
  //   data: MarketAsset | null;
  //   loadingState: LoadingState;
  // };
};

const initialState: UserSliceState = {
  portfolio: {
    balance: 0,
    recentTransactions: [],
    yesterdaysPNL: { usdValue: 0, usdValueChangePercetage: 0 },
    thirtydaysPNL: { usdValue: 0, usdValueChangePercetage: 0 },
    historicalData: { balance: [], PNL: [] },
  },
  assets: {
    items: [],
    loadingState: LoadingState.NEVER,
  },
  // marketAsset: {
  //   data: null,
  //   loadingState: LoadingState.NEVER,
  // },
};

export const fetchUserAssets = createAsyncThunk<{ assets: Asset[]; balance: number }>(
  'user/fetchUserAssets',
  async () => {
    const assets = await Api().getUserAssets();
    return assets;
  }
);
export const fetchUserAsset = createAsyncThunk<Asset, string>(
  'user/fetchUserAsset',
  async (currencyId) => {
    const asset = await Api().getUserAsset(currencyId);
    return asset;
  }
);

export const fetchCreateTransaction = createAsyncThunk<
  Asset,
  { currencyId: string; payload: CreateTransactionPayload }
>('user/fetchCreateTransaction', async ({ currencyId, payload }) => {
  const asset = await Api().createTransaction(currencyId, payload);
  return asset;
});

//createAssetTransaction

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPortfolio: (state, action: PayloadAction<UserPortfolio>) => {
      state.portfolio = action.payload;
    },
    setUserAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets.items = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder //TODO: when we make transaction alsa update USDT asset
      .addCase(fetchCreateTransaction.fulfilled.type, (state, action: PayloadAction<Asset>) => {
        const currentAssetIndex = state.assets.items.findIndex(
          (a) => a.currency.id === action.payload.currency.id
        );
        console.log('currentAssetIndex', currentAssetIndex);
        if (currentAssetIndex === -1) state.assets.items.push(action.payload);
        state.assets.items[currentAssetIndex] = action.payload;
        state.assets.loadingState = LoadingState.LOADED;
      })
      .addCase(
        fetchUserAssets.fulfilled.type,
        (state, action: PayloadAction<{ assets: Asset[]; balance: number }>) => {
          state.assets.items = action.payload.assets;
          state.portfolio.balance = action.payload.balance;
        }
      )
      // .addMatcher<any>(
      //   isAnyOf<any>(fetchUserAsset.fulfilled.type, fetchCreateTransaction.fulfilled.type),
      //   (state, action: PayloadAction<Asset>) => {
      //     const currentAssetIndex = state.assets.items.findIndex(
      //       (a) => a.currency.id === action.payload.currency.id
      //     );
      //     //if (currentAssetIndex === -1) state.assets.items.push(action.payload);
      //     state.assets.items[currentAssetIndex] = action.payload;
      //     state.assets.loadingState = LoadingState.LOADED;
      //   }
      // )
      .addCase(fetchUserAsset.pending.type, (state) => {
        state.assets.loadingState = LoadingState.LOADING;
      })
      .addCase(fetchUserAsset.fulfilled.type, (state, action: PayloadAction<Asset>) => {
        const currentAssetIndex = state.assets.items.findIndex(
          (a) => a.currency.id === action.payload.currency.id
        );
        //if (currentAssetIndex === -1) state.assets.items.push(action.payload);
        state.assets.items[currentAssetIndex] = action.payload;
        state.assets.loadingState = LoadingState.LOADED;
      })
      .addCase(fetchUserAsset.rejected.type, (state) => {
        state.assets.loadingState = LoadingState.ERROR;
      })
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.portfolio = action.payload.user.portfolio;
        state.assets = action.payload.user.assets;
      }),
});

export const { setUserPortfolio, setUserAssets } = userSlice.actions;
export const userReducer = userSlice.reducer;
