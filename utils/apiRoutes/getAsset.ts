import { fetcher, MarketApi } from 'api/marketApi';
const db = require('db/models/index');

export const getAsset = async (userId: number, currencyId: string) => {
  const asset = await db.Asset.findOne({
    where: { userId, currencyId },
    attributes: ['id', 'amount'],
    include: [
      {
        model: db.Currency,
        as: 'currency',
      },
      {
        model: db.Transaction,
        as: 'transactions',
        attributes: { exclude: ['assetId'] },
      },
    ],
  });

  if (!asset) return;

  const currencyPrice = (await fetcher(MarketApi.getCurrencyDataUrl(asset.currency.id))).market_data
    .current_price.usd;

  const usdValue = +(currencyPrice * asset.amount).toFixed(2);
  asset.setDataValue('usdValue', usdValue);

  return asset;
};
