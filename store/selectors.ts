import { RootState } from 'store';

export const selectUserPortfolio = (state: RootState) => state.user.portfolio;
