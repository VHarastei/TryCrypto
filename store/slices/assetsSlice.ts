import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTransactionPayload } from 'api/userApi';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store';
import { Api } from './../../api/index';
import { FetchAssetTransactionsPayload } from './../../api/userApi';
import { Asset, LoadingState, PaginatedTransactions } from './types';

export type AssetsSliceState = {
  items: Asset[];
  loadingState: LoadingState;
  transactionLoadingState: LoadingState;
};

const initialState: AssetsSliceState = {
  items: [],
  loadingState: LoadingState.NEVER,
  transactionLoadingState: LoadingState.NEVER,
};

export const fetchUserAssets = createAsyncThunk<{ assets: Asset[]; balance: number }>(
  'assets/fetchUserAssets',
  async () => {
    const assets = await Api().getUserAssets();
    return assets;
  }
);

export const fetchUserAsset = createAsyncThunk<Asset, string>(
  'assets/fetchUserAsset',
  async (currencyId) => {
    const asset = await Api().getUserAsset(currencyId);
    return asset;
  }
);

export const fetchCreateTransaction = createAsyncThunk<
  Asset[],
  { currencyId: string; payload: CreateTransactionPayload }
>('assets/fetchCreateTransaction', async ({ currencyId, payload }) => {
  const updatedAssets = await Api().createTransaction(currencyId, payload);
  return updatedAssets;
});

export const fetchAssetTransactions = createAsyncThunk<
  { currencyId: string; transactions: PaginatedTransactions },
  FetchAssetTransactionsPayload
>('assets/fetchAssetTransactions', async (payload) => {
  const transactions = await Api().getAssetTransactions(payload);
  return transactions;
});

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setUserAssets: (state, action: PayloadAction<Asset[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCreateTransaction.fulfilled.type, (state, action: PayloadAction<Asset[]>) => {
        action.payload.forEach((asset) => {
          const assetIndex = state.items.findIndex((a) => a.currency.id === asset.currency.id);
          if (assetIndex === -1) state.items.push(asset);
          state.items[assetIndex] = asset;
        });
        state.transactionLoadingState = LoadingState.LOADED;
      })
      .addCase(fetchCreateTransaction.pending.type, (state) => {
        state.transactionLoadingState = LoadingState.LOADING;
      })
      .addCase(
        fetchUserAssets.fulfilled.type,
        (state, action: PayloadAction<{ assets: Asset[]; balance: number }>) => {
          state.items = action.payload.assets;
        }
      )
      .addCase(fetchUserAsset.pending.type, (state) => {
        state.loadingState = LoadingState.LOADING;
      })
      .addCase(fetchUserAsset.fulfilled.type, (state, action: PayloadAction<Asset>) => {
        const assetIndex = state.items.findIndex(
          (a) => a.currency.id === action.payload.currency.id
        );
        state.items[assetIndex] = action.payload;
        state.loadingState = LoadingState.LOADED;
      })
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.items = action.payload.assets.items;
      })
      .addCase(
        fetchAssetTransactions.fulfilled.type,
        (
          state,
          action: PayloadAction<
            Omit<{ currencyId: string; transactions: PaginatedTransactions }, 'loadingState'>
          >
        ) => {
          const assetIndex = state.items.findIndex(
            (a) => a.currency.id === action.payload.currencyId
          );
          const trx = state.items[assetIndex].transactions;
          trx.items = [...trx.items, ...action.payload.transactions.items];
          trx.currentPage = action.payload.transactions.currentPage;
        }
      ),
});

export const { setUserAssets } = assetsSlice.actions;
export const assetsReducer = assetsSlice.reducer;
