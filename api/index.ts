import Cookies from 'js-cookie';
import { authApi } from './authApi';
import axios from 'axios';
import { userApi } from './userApi';
import { isDevMode } from 'utils/isDevMode';

type ApiReturnType = ReturnType<typeof userApi> & ReturnType<typeof authApi>;

export const Api = (token?: string): ApiReturnType => {
  if (!token) token = Cookies.get('token');

  const instance = axios.create({
    //baseURL: 'http://localhost:3000/api',
    baseURL: isDevMode() ? 'http://localhost:3000/api' : 'https://try-crypto.herokuapp.com/api',
    headers: {
      Authorization: 'Bearer ' + token || Cookies.get('token'),
    },
  });

  return [userApi, authApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
};
