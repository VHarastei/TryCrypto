export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface Currency {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

export type Asset = {
  id: number;
  amount: number;
  usdValue: number;
  usdValuePercentage: number;
  currencyPrice: number;
  currency: Currency;
  transactions: PaginatedTransactions;
};

export type Transaction = {
  id: number;
  date: string;
  source: 'market' | 'education';
  type: 'buy' | 'sell' | 'receive';
  usdValue: number;
  amount: number;
  total: number;
  asset: Pick<Asset, 'amount' | 'currency'>;
};

export type PaginatedTransactions = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: Transaction[];
  loadingState: LoadingState;
};

export type HistoricalDataItem = {
  date: string;
  usdValue: number;
};

export type HistoricalData = {
  balance: HistoricalDataItem[];
  PNL: HistoricalDataItem[];
};

export type PNL = {
  usdValue: number;
  usdValueChangePercetage: number;
};

export type UserPortfolio = {
  balance: number;
  recentTransactions: Transaction[];
  yesterdaysPNL: PNL;
  thirtydaysPNL: PNL;
  historicalData: HistoricalData;
  transactionHistory: PaginatedTransactions;
};
export type WatchlistCurrency = {
  id: string;
  currencyId: string;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  token: string;
  confirmed: boolean;
};
