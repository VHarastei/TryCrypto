import { FetchAssetTransactionsPayload } from './../../api/userApi';
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
  transactions: PaginatedTransactions;
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

export type PaginatedTransactions = {
  totalItems: number | null;
  totalPages: number | null;
  currentPage: number | null;
  items: Transaction[];
  loadingState: LoadingState;
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
  Asset[],
  { currencyId: string; payload: CreateTransactionPayload }
>('user/fetchCreateTransaction', async ({ currencyId, payload }) => {
  const updatedAssets = await Api().createTransaction(currencyId, payload);
  return updatedAssets;
});

export const fetchAssetTransactions = createAsyncThunk<
  { currencyId: string; transactions: PaginatedTransactions },
  FetchAssetTransactionsPayload
>('user/fetchAssetTransactions', async (payload) => {
  const transactions = await Api().getAssetTransactions(payload);
  return transactions;
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
    builder
      .addCase(fetchCreateTransaction.fulfilled.type, (state, action: PayloadAction<Asset[]>) => {
        action.payload.forEach((asset) => {
          const assetIndex = state.assets.items.findIndex(
            (a) => a.currency.id === asset.currency.id
          );
          if (assetIndex === -1) state.assets.items.push(asset);
          state.assets.items[assetIndex] = asset;
        });

        state.assets.loadingState = LoadingState.LOADED;
      })
      .addCase(fetchCreateTransaction.pending.type, (state) => {
        state.assets.loadingState = LoadingState.LOADING;
      })
      .addCase(
        fetchUserAssets.fulfilled.type,
        (state, action: PayloadAction<{ assets: Asset[]; balance: number }>) => {
          state.assets.items = action.payload.assets;
          state.portfolio.balance = action.payload.balance;
        }
      )
      .addCase(fetchUserAsset.pending.type, (state) => {
        state.assets.loadingState = LoadingState.LOADING;
      })
      .addCase(fetchUserAsset.fulfilled.type, (state, action: PayloadAction<Asset>) => {
        const assetIndex = state.assets.items.findIndex(
          (a) => a.currency.id === action.payload.currency.id
        );
        state.assets.items[assetIndex] = action.payload;
        // state.assets.items[assetIndex].transactions.items =
        //   action.payload.transactions.items;
        state.assets.loadingState = LoadingState.LOADED;
      })
      .addCase(fetchUserAsset.rejected.type, (state) => {
        state.assets.loadingState = LoadingState.ERROR;
      })
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.portfolio = action.payload.user.portfolio;
        state.assets = action.payload.user.assets;
      })
      .addCase(
        fetchAssetTransactions.fulfilled.type,
        (
          state,
          action: PayloadAction<
            Omit<{ currencyId: string; transactions: PaginatedTransactions }, 'loadingState'>
          >
        ) => {
          const assetIndex = state.assets.items.findIndex(
            (a) => a.currency.id === action.payload.currencyId
          );
          state.assets.items[assetIndex].transactions.items = [
            ...state.assets.items[assetIndex].transactions.items,
            ...action.payload.transactions.items,
          ];
          state.assets.items[assetIndex].transactions.currentPage =
            action.payload.transactions.currentPage;
        }
      ),
});

export const { setUserPortfolio, setUserAssets } = userSlice.actions;
export const userReducer = userSlice.reducer;

// .addMatcher<any>(
//   isAnyOf<any>(fetchUserAsset.fulfilled.type, fetchCreateTransaction.fulfilled.type),
//   (state, action: PayloadAction<Asset>) => {
//   }
// )
