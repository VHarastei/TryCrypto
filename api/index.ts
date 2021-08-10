import { authApi } from './authApi';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { userApi } from './userApi';

type ApiReturnType = ReturnType<typeof userApi> & ReturnType<typeof authApi>;

// TODO: Типизировать
export const Api = (): ApiReturnType => {
  // const cookies = Cookies.get(ctx);
  // const token = cookies.token;

  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    // headers: {
    //   Authorization: 'Bearer ' + token,
    // },
  });

  return [userApi, authApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
};
