import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTransactionPayload } from 'api/userApi';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';
import { Api } from './../../api/index';
import { FetchAssetTransactionsPayload } from './../../api/userApi';
import {
  Asset,
  HistoricalDataItem,
  LoadingState,
  PaginatedTransactions,
  UserPortfolio,
} from './types';

export type UserSliceState = {
  portfolio: UserPortfolio;
  assets: {
    items: Asset[];
    loadingState: LoadingState;
    transactionLoadingState: LoadingState;
  };
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
  assets: {
    items: [],
    loadingState: LoadingState.NEVER,
    transactionLoadingState: LoadingState.NEVER,
  },
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
    setUserAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets.items = action.payload;
    },
    setUserTransactionHistory: (state, action: PayloadAction<PaginatedTransactions>) => {
      state.portfolio.transactionHistory = action.payload;
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
        state.assets.transactionLoadingState = LoadingState.LOADED;
      })
      .addCase(fetchCreateTransaction.pending.type, (state) => {
        state.assets.transactionLoadingState = LoadingState.LOADING;
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
        state.assets.loadingState = LoadingState.LOADED;
      })
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
          const trx = state.assets.items[assetIndex].transactions;
          trx.items = [...trx.items, ...action.payload.transactions.items];
          trx.currentPage = action.payload.transactions.currentPage;
        }
      ),
});

export const { setUserPortfolio, setUserAssets, setUserTransactionHistory } = userSlice.actions;
export const userReducer = userSlice.reducer;

// .addMatcher<any>(
//   isAnyOf<any>(fetchUserAsset.fulfilled.type, fetchCreateTransaction.fulfilled.type),
//   (state, action: PayloadAction<Asset>) => {
//   }
// )
