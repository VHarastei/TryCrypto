const db = require('db/models/index');

export const getRecentTransactions = async (assetsId: number | number[]) => {
  const transactions = await db.Transaction.findAll({
    where: { assetId: assetsId },
    attributes: { exclude: ['assetId'] },
    order: [['date', 'DESC']],
    include: [
      {
        model: db.Asset,
        as: 'transactions',
        attributes: ['amount'],
        include: [{ model: db.Currency, as: 'currency' }],
      },
    ],
  });
  return transactions.map((trn: any) => {
    let copy = JSON.parse(JSON.stringify(trn));
    const { transactions, ...newTrn } = copy;
    newTrn.asset = transactions;
    return newTrn;
  });
};
