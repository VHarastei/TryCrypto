import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});
