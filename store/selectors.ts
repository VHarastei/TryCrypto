import { RootState } from 'store';

export const selectUserPortfolio = (state: RootState) => state.user.portfolio;
export const selectUserAssets = (state: RootState) => state.user.portfolio.assets;
