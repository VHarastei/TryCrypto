import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export const fetcher = (...urls: string[]) => {
  const f = (u: string) => instance.get(u).then((r) => r.data);
  if (urls.length > 1) return Promise.all(urls.map(f));

  return f(urls[0]);
};

export type TableCoin = {
  ordNum: number;
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
};

export type TableConfig = {
  direction: Direction;
  key: Key;
};

export type Direction = 'asc' | 'desc';
export type Key =
  | 'ordNum'
  | 'name'
  | 'current_price'
  | 'price_change_percentage_24h'
  | 'price_change_percentage_7d_in_currency'
  | 'market_cap';

export type ListCoin = Pick<TableCoin, 'id' | 'symbol' | 'name'>;

export const MarketApi = {
  getTableDataUrl: (page: number = 1, ids?: string[]) => {
    return () =>
      `coins/markets?vs_currency=usd${
        ids ? `&ids=${ids}` : ``
      }&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=7d`;
  },
  getCoinsListUrl: () => `coins/list?include_platform=false`,
  getCurrencyDataUrl: (currencyId: string) =>
    `coins/${currencyId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
  getMarketChartUrl: (currencyId: string, interval: string) =>
    `coins/${currencyId}/market_chart?vs_currency=usd&days=${interval}`,
};
