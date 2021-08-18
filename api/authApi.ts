import { AxiosInstance } from 'axios';
import { User } from 'store/slices/types';

export type AuthPayload = {
  email: string;
  password: string;
  ref: string | undefined;
};

export const authApi = (instance: AxiosInstance) => {
  return {
    register: ({ email, password, ref }: AuthPayload): Promise<undefined> => {
      return instance.post(`/auth/register${ref ? '?ref=' + ref : ''}`, { email, password });
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
    getNumberOfReferrals: (): Promise<number> => {
      return instance.get(`/auth/referrals`).then(({ data }) => data.data);
    },
  };
};
