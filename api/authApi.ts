import { AxiosInstance } from 'axios';
import { User } from 'store/slices/types';

export type AuthPayload = {
  email: string;
  password: string;
};

export const authApi = (instance: AxiosInstance) => {
  return {
    register: (payload: AuthPayload): Promise<undefined> => {
      return instance.post(`/auth/register`, payload);
    },
    login: (payload: AuthPayload): Promise<User> => {
      return instance.post(`/auth/login`, payload).then(({ data }) => data.data);
    },
    getMe: (): Promise<User> => {
      return instance.get(`/auth/me`).then(({ data }) => data.data);
    },
    sendEmail: (): Promise<undefined> => {
      return instance.get(`/auth/sendEmail`);
    },
    verify: (hash: string): Promise<User> => {
      return instance.patch(`/auth/verify/${hash}`).then(({ data }) => data.data);
    },
  };
};
