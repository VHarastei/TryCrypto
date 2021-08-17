const db = require('db/models/index');

export const updateUsdtAsset = async (asset: any, amount: number) => {
  const transaction = await db.Transaction.create({
    date: new Date().toISOString(),
    source: 'bonuses',
    type: 'receive',
    usdValue: amount,
    amount,
    total: amount,
    assetId: asset.id,
  });

  const newAmount = +(asset.amount + transaction.amount).toFixed(6);
  asset.amount = newAmount;
  await asset.save();
};
