import { instance } from 'api';
import { AxiosResponse } from 'axios';

export type TableCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

export const MarketApi = {
  getTableData: (page: number = 1): Promise<TableCoin[]> => {
    return instance
      .get(
        `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`
      )
      .then(({ data }) => data);
  },
};
