import { AxiosInstance } from 'axios';
import { UserPortfolio } from 'store/slices/userSlice';

export const userApi = (instance: AxiosInstance) => {
  return {
    // getMe: async (): Promise<UserData> => {
    //   const { data } = await instance.get('/auth/me');
    //   return data;
    // },
    getUserPortfolio: (): Promise<UserPortfolio> => {
      return instance.get('/user/portfolio').then(({ data }) => data.data);
    },
  };
};
