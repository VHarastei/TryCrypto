import { fetcher, MarketApi } from 'api/marketApi';
import { DbAsset } from './getAssetsMarketData';
import { getPaginatedData } from './getPaginatedData';
import { getPagination } from './getPagination';
const db = require('db/models/index');

export const getAssets = async (userId: string, currencyIds: string[], page = 0, size = 7) => {
  const assets: any[] = await db.Asset.findAll({
    where: { userId, currencyId: currencyIds },
    attributes: ['id', 'amount'],
    //order: [[{ model: db.Transaction, as: 'transactions' }, 'date', 'DESC']],
    //limit: 7,
    //subQuery: false,
    include: [
      {
        model: db.Currency,
        as: 'currency',
      },
      // {
      //   model: db.Transaction,
      //   as: 'transactions',
      //   attributes: { exclude: ['assetId'] },
      // },
    ],
  });

  const paginatedAssets = await Promise.all(
    assets.map(async (asset: any) => {
      const plainAsset = asset.get({ plain: true });
      const { limit, offset } = getPagination(size, page);
      const dbTransactions = await db.Transaction.findAndCountAll({
        where: { assetId: asset.id },
        attributes: { exclude: ['assetId'] },
        order: [['date', 'DESC']],
        limit,
        offset,
      });
      const paginatedTransactions = getPaginatedData(dbTransactions, page, limit);

      return {
        ...plainAsset,
        transactions: paginatedTransactions,
      };

      // return {
      //   ...plainAsset,
      //   transactions: {
      //     totalItems: null,
      //     totalPages: null,
      //     currentPage: null,
      //     items: plainAsset.transactions,
      //   },
      // };
    })
  );

  if (!assets.length) return [];
  //if (currencyIds.length === 1) return paginatedAssets[0];

  return paginatedAssets;
};
