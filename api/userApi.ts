import { AxiosInstance } from 'axios';
import { Asset, UserPortfolio, Transaction, PaginatedTransactions } from 'store/slices/userSlice';

interface UserPortfolioWithAssets extends UserPortfolio {
  assets: Asset[];
}
export interface CreateTransactionPayload extends Omit<Transaction, 'id' | 'asset'> {
  assetId: number | null;
}
export type FetchAssetTransactionsPayload = {
  currencyId: string;
  assetId: string;
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
  };
};
