import { AxiosInstance } from 'axios';
import { Asset, UserPortfolio } from 'store/slices/userSlice';

interface UserPortfolioWithAssets extends UserPortfolio {
  assets: Asset[];
}

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
  };
};
