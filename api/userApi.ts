import { MarketAsset } from './../store/slices/userSlice';
import { AxiosInstance } from 'axios';
import { Asset, UserPortfolio } from 'store/slices/userSlice';

export const userApi = (instance: AxiosInstance) => {
  return {
    // getMe: async (): Promise<UserData> => {
    //   const { data } = await instance.get('/auth/me');
    //   return data;
    // },
    getUserPortfolio: (): Promise<UserPortfolio> => {
      return instance.get('/user/portfolio').then(({ data }) => data.data);
    },
    getUserAssets: (): Promise<{ assets: Asset[]; balance: number }> => {
      return instance.get('/user/assets').then(({ data }) => data.data);
    },
    getUserMarketAsset: (currencyId: string): Promise<MarketAsset> => {
      return instance.get(`/user/assets/${currencyId}`).then(({ data }) => data.data);
    },
  };
};
