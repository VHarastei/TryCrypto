import { Asset } from 'store/slices/userSlice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { LoadingState } from './slices/userSlice';

export const selectUserPortfolio = (state: RootState) => state.user.portfolio;
export const selectUserAssets = (state: RootState) => state.user.assets.items;
// export const selectUserAsset = (state: RootState, currencyId: string) =>
//   state.user.portfolio.assets.find((a) => a.currency.id === currencyId);
type Selector<S> = (state: RootState) => S;

export const selectUserAsset = (currencyId: string): Selector<Asset | undefined> =>
  createSelector(
    [(state: RootState) => state.user.assets.items.find((a) => a.currency.id === currencyId)],
    (asset) => asset
  );

// export const selectUserMarketAsset = (state: RootState) => state.user.marketAsset.data;
// export const selectUserMarketAssetIsLoading = (state: RootState) =>
//   state.user.marketAsset.loadingState === LoadingState.LOADING;
// export const selectUserMarketAssetIsNever = (state: RootState) =>
//   state.user.marketAsset.loadingState === LoadingState.NEVER;
// export const selectUserMarketAssetIsError = (state: RootState) =>
//   state.user.marketAsset.loadingState === LoadingState.ERROR;
