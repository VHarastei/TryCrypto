import { AxiosInstance } from 'axios';
import {
  PaginatedTransactions,
  Asset,
  Transaction,
  UserPortfolio,
  WatchlistCurrency,
  HistoricalDataItem,
} from 'store/slices/types';

interface UserPortfolioWithAssets extends UserPortfolio {
  assets: Asset[];
}
export interface CreateTransactionPayload extends Omit<Transaction, 'id' | 'asset'> {
  assetId: number | null;
}
export interface FetchAssetTransactionsPayload extends PaginationPayload {
  currencyId: string;
  assetId: string;
}
export type PaginationPayload = {
  size?: number;
  page?: number;
};

export const userApi = (instance: AxiosInstance) => {
  return {
    // getMe: async (): Promise<UserData> => {
    //   const { data } = await instance.get('/auth/me');
    //   return data;
    // },
    getUserPortfolio: (): Promise<UserPortfolioWithAssets> => {
      return instance.get('/user/portfolio').then(({ data }) => data.data);
    },
    getUserTransactionHistory: ({
      size = 15,
      page = 0,
    }: PaginationPayload): Promise<PaginatedTransactions> => {
      return instance
        .get(`/user/portfolio/transactionHistory?size=${size}&page=${page}`)
        .then(({ data }) => data.data);
    },
    getUserAssets: (): Promise<{ assets: Asset[]; balance: number }> => {
      return instance.get('/user/assets').then(({ data }) => data.data);
    },
    getUserAsset: (currencyId: string): Promise<Asset> => {
      return instance.get(`/user/assets/${currencyId}`).then(({ data }) => data.data);
    },
    getAssetTransactions: ({
      currencyId,
      assetId,
      size = 7,
      page = 1,
    }: FetchAssetTransactionsPayload): Promise<{
      currencyId: string;
      transactions: PaginatedTransactions;
    }> => {
      return instance
        .get(`/user/assets/${currencyId}/transactions?assetId=${assetId}&size=${size}&page=${page}`)
        .then(({ data }) => data.data);
    },
    createTransaction: (
      currencyId: string,
      payload: CreateTransactionPayload
    ): Promise<Asset[]> => {
      return instance.post(`/user/assets/${currencyId}`, payload).then(({ data }) => data.data);
    },
    getUserWatchlist: (): Promise<WatchlistCurrency[]> => {
      return instance.get('/user/watchlist').then(({ data }) => data.data);
    },
    getUserWatchlistCurrency: (currencyId: string): Promise<WatchlistCurrency> => {
      return instance.get(`/user/watchlist/${currencyId}`).then(({ data }) => data.data);
    },
    createUserWatchlistCurrency: (currencyId: string): Promise<WatchlistCurrency> => {
      return instance.post(`/user/watchlist/${currencyId}`).then(({ data }) => data.data);
    },
    deleteUserWatchlistCurrency: (currencyId: string): Promise<string> => {
      return instance.delete(`/user/watchlist/${currencyId}`).then(() => currencyId);
    },
    getHistoricalBalanceData: (interval: number): Promise<HistoricalDataItem[]> => {
      return instance
        .get(`/user/portfolio/historical/balanceData?interval=${interval}`)
        .then(({ data }) => data.data);
    },
    getHistoricalPnlData: (interval: number): Promise<HistoricalDataItem[]> => {
      return instance
        .get(`/user/portfolio/historical/pnlData?interval=${interval}`)
        .then(({ data }) => data.data);
    },
  };
};
