import { fetcher, MarketApi } from 'api/marketApi';
const db = require('db/models/index');

export const getAssets = async (userId: number, currencyIds: string[]) => {
  const assets = await db.Asset.findAll({
    where: { userId, currencyId: currencyIds },
    attributes: ['id', 'amount'],
    order: [[{ model: db.Transaction, as: 'transactions' }, 'date', 'DESC']],
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

  if (!assets.length) return 404;

  return assets;
};
