import { Transaction } from '../../store/slices/userSlice';
import { fetcher, MarketApi } from 'api/marketApi';
import { Currency } from 'pages/market/[currencyId]';
const db = require('db/models/index');

export type DbAsset = {
  id: number;
  amount: number;
  currency: Omit<Currency, 'image'>;
  transactions: Transaction[];
};

export const getAssetsMarketData = async (dbAssets: any) => {
  const assetsMarketData = await Promise.all(
    dbAssets.map((asset: any) => {
      return fetcher(MarketApi.getCurrencyDataUrl(asset.currency.id));
    })
  );

  const assets = assetsMarketData.map((mAsset: any, index) => {
    return {
      id: dbAssets[index].id,
      amount: dbAssets[index].amount,
      usdValue: +(mAsset.market_data.current_price.usd * dbAssets[index].amount).toFixed(2),
      usdValuePercentage: 0,
      currencyPrice: mAsset.market_data.current_price.usd,
      currency: {
        id: mAsset.id,
        name: mAsset.name,
        symbol: mAsset.symbol,
        image: mAsset.image.large,
      },
      transactions: dbAssets[index].transactions || {
        totalItems: null,
        totalPages: null,
        currentPage: null,
        items: [],
      },
      //transactions: [],
    };
  });
  let balance = 0;
  assets.forEach((asset) => (balance += asset.currencyPrice * asset.amount));
  assets.forEach((asset, index) => {
    assets[index].usdValuePercentage = +(
      ((asset.currencyPrice * asset.amount) / balance) *
      100
    ).toFixed(2);
  });
  assets.sort((a, b) => (a.usdValue > b.usdValue ? -1 : 1));
  return { assets, balance: +balance.toFixed(2) };
};
