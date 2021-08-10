import { AxiosInstance } from 'axios';
import { Asset, User } from 'store/slices/types';

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export const authApi = (instance: AxiosInstance) => {
  return {
    register: (payload: RegisterPayload): Promise<undefined> => {
      return instance.post(`/auth/register`, payload);
    },
  };
};
