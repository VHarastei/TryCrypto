import { instance } from 'api';

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
  // getTableData: (page: number = 1): Promise<TableCoin[]> => {
  //   return instance
  //     .get(
  //       `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
  //     )
  //     .then(({ data }) => data);
  // },
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
