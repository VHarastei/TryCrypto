import { RootState } from 'store';
import { LoadingState } from './slices/userSlice';

export const selectUserPortfolio = (state: RootState) => state.user.portfolio;
export const selectUserAssets = (state: RootState) => state.user.portfolio.assets;
export const selectUserMarketAsset = (state: RootState) => state.user.marketAsset.data;
export const selectUserMarketAssetIsLoading = (state: RootState) =>
  state.user.marketAsset.loadingState === LoadingState.LOADING;
export const selectUserMarketAssetIsNever = (state: RootState) =>
  state.user.marketAsset.loadingState === LoadingState.NEVER;
export const selectUserMarketAssetIsError = (state: RootState) =>
  state.user.marketAsset.loadingState === LoadingState.ERROR;
