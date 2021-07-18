import { fetcher, MarketApi } from 'api/marketApi';
import { Currency } from 'pages/market/[currencyId]';

export type DbAsset = {
  id: number;
  amount: number;
  currency: Omit<Currency, 'image'>;
};

export const getAssetsMarketData = async (dbAssets: DbAsset[]) => {
  // const dbAssets: dbAsset[] = await db.Asset.findAll({
  //   where: { userId: 1 },
  //   attributes: { exclude: ['userId', 'currencyId'] },
  //   include: [
  //     {
  //       model: db.Currency,
  //       as: 'currency',
  //     },
  //   ],
  // });
  const assetsMarketData = await Promise.all(
    dbAssets.map((asset) => {
      return fetcher(MarketApi.getCurrencyDataUrl(asset.currency.id));
    })
  );

  const assets = assetsMarketData.map((mAsset, index) => {
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

  return { assets, balance: +balance.toFixed(2) };
};
