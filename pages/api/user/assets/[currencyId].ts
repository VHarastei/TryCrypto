import { fetcher, MarketApi } from 'api/marketApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAsset } from 'utils/apiRoutes/getAsset';
import { DbAsset } from 'utils/apiRoutes/getAssets';

const db = require('db/models/index');

const handler = nextConnect()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    //this route will return paginated asset transactions
    try {
      const { currencyId } = req.query;

      const asset = await db.Asset.findOne({
        where: { userId: 1, currencyId },
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

      if (!asset)
        return res.status(404).json({
          status: 'error',
          message: `Asset with ${currencyId} not found`,
        });

      const currencyPrice = (await fetcher(MarketApi.getCurrencyDataUrl(asset.currency.id)))
        .market_data.current_price.usd;

      const usdValue = +(currencyPrice * asset.amount).toFixed(2);
      asset.setDataValue('usdValue', usdValue);
      asset.setDataValue('currencyPrice', currencyPrice); // TODO: this is useful?

      res.status(200).json({
        status: 'success',
        data: asset,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        data: err,
      });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = 1;
      const data = req.body;
      const { currencyId } = req.query;

      // add transaction state: for example: pending, fullfilled, rejected
      const usdtAsset = await db.Asset.findOne({
        where: { userId, currencyId: 'tether' },
      });

      let asset;
      asset = await db.Asset.findOne({
        where: { userId, id: data.assetId },
      });

      if (!asset) {
        asset = await db.Asset.create({ currencyId, amount: 0, userId });
      }

      const transaction = await db.Transaction.build({ ...data, assetId: asset.id }); //pending
      if (!transaction)
        return res.status(400).json({
          status: 'error',
          message: `Transaction not created`,
        });

      let newAssetAmount = asset.amount;
      let newUsdtAsset = usdtAsset.amount;
      if (transaction.type === 'buy') {
        newAssetAmount += transaction.amount;
        newUsdtAsset -= transaction.total;
      } else {
        newAssetAmount -= transaction.amount;
        newUsdtAsset += transaction.total;
      }
      console.log(newAssetAmount);
      asset.amount = +newAssetAmount.toFixed(6);
      usdtAsset.amount = +newUsdtAsset.toFixed(6);
      await asset.save();
      await usdtAsset.save();

      await transaction.save(); //fullfilled

      const updatedAsset = await getAsset(1, currencyId as string);

      res.status(200).json({
        status: 'success',
        //data: updatedAsset,
        data: updatedAsset, //maybe also return updatedUsdtAsset?
      });
    } catch (err) {
      console.log(err);
      //rejected
      res.status(500).json({
        status: 'error',
        data: err,
      });
    }
  });

export default handler;
