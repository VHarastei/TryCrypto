import { fetcher, MarketApi } from 'api/marketApi';
import { DbAsset } from './getAssetsMarketData';
const db = require('db/models/index');

export const getAssets = async (userId: number, currencyIds: string[]) => {
  const assets = await db.Asset.findAll({
    where: { userId, currencyId: currencyIds },
    attributes: ['id', 'amount'],
    order: [[{ model: db.Transaction, as: 'transactions' }, 'date', 'DESC']],
    limit: 7,
    subQuery: false,
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

  const paginatedAssets = assets.map((asset: any) => {
    const plainAsset = asset.get({ plain: true });
    return {
      ...plainAsset,
      transactions: {
        totalItems: null,
        totalPages: null,
        currentPage: null,
        items: plainAsset.transactions,
      },
    };
  });

  if (!assets.length) return 404;

  return paginatedAssets;
};
