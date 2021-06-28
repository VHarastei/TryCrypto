import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export const fetcher = (url: string) => instance.get(url).then((res) => res.data);
