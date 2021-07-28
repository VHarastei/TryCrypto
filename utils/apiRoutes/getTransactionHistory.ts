import { getPaginatedData } from './getPaginatedData';
import { getPagination } from './getPagination';
const db = require('db/models/index');

export const getTransactionHistory = async (userId: number | number[], size = 4, page = 0) => {
  const { limit, offset } = getPagination(size, page);

  const dbTransactions = await db.Transaction.findAndCountAll({
    attributes: { exclude: ['assetId'] },
    order: [['date', 'DESC']],
    limit,
    offset,
    include: [
      {
        model: db.Asset,
        as: 'transactions',
        attributes: ['amount'],
        include: [{ model: db.Currency, as: 'currency' }],
        where: { userId: 1 },
      },
    ],
  });
  const paginatedTransactions = getPaginatedData(dbTransactions, page, limit);

  const refactoredTransactions = paginatedTransactions.items.map((trn: any) => {
    let copy = JSON.parse(JSON.stringify(trn));
    const { transactions, ...newTrn } = copy; //because sequelize......
    newTrn.asset = transactions;
    return newTrn;
  });

  return {
    ...paginatedTransactions,
    items: refactoredTransactions,
  };
};
