import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Asset, LoadingState, WatchlistCurrency } from './slices/types';
type Selector<S> = (state: RootState) => S;

export const selectUserLoadingState = (state: RootState) => state.user.loadingState;
export const selectUser = (state: RootState) => state.user.data;

export const selectUserPortfolio = (state: RootState) => state.user.portfolio;
export const selectUserTransactionHistory = (state: RootState) =>
  state.user.portfolio.transactionHistory;

export const selectUserAssets = (state: RootState) => state.assets.items;
export const selectUserAsset = (currencyId: string): Selector<Asset | undefined> =>
  createSelector(
    [(state: RootState) => state.assets.items.find((a) => a.currency.id === currencyId)],
    (asset) => asset
  );
export const selectUserAssetsIsLoading = (state: RootState) =>
  state.assets.loadingState === LoadingState.LOADING;
export const selectAssetsTransactionIsLoading = (state: RootState) =>
  state.assets.transactionLoadingState === LoadingState.LOADING;

export const selectUserWatchlist = (state: RootState) => state.watchlist.items;
export const selectIsWatclistedCurrency = (
  currencyId: string
): Selector<WatchlistCurrency | boolean> =>
  createSelector(
    [(state: RootState) => state.watchlist.items.some((a) => a.currencyId === currencyId)],
    (asset) => asset
  );
