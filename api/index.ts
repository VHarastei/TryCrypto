import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

//export const fetcher = (url: string) => instance.get(url).then((res) => res.data);
export const fetcher = (...urls: string[]) => {
  const f = (u: string) => instance.get(u).then((r) => r.data);

  if (urls.length > 1) {
    return Promise.all(urls.map(f));
  }
  return f(urls[0]);
};
