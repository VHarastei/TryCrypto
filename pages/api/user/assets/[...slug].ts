import { getPagination } from './../../../../utils/apiRoutes/getPagination';
import { fetcher, MarketApi } from 'api/marketApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssets } from 'utils/apiRoutes/getAssets';
import { DbAsset, getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';
import { getPaginatedData } from 'utils/apiRoutes/getPaginatedData';

const db = require('db/models/index');

const handler = nextConnect()
  .get('api/user/assets/:slug', async (req: NextApiRequest, res: NextApiResponse) => {
    //this route will return paginated asset transactions
    try {
      const { slug: currencyId } = req.query as { slug: string };
      const asset = await getAssets(1, [currencyId]);
      // const asset = await db.Asset.findOne({
      //   where: { userId: 1, currencyId },
      //   attributes: ['id', 'amount'],
      //   include: [
      //     {
      //       model: db.Currency,
      //       as: 'currency',
      //     },
      //     {
      //       model: db.Transaction,
      //       as: 'transactions',
      //       attributes: { exclude: ['assetId'] },
      //     },
      //   ],
      // });

      if (!asset.length)
        return res.status(404).json({
          status: 'error',
          message: `Asset with ${currencyId} not found`,
        });

      const { assets } = await getAssetsMarketData([asset[0]]);

      res.status(200).json({
        status: 'success',
        data: assets[0],
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        data: err,
      });
    }
  })
  .get('api/user/assets/:slug/transactions', async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { assetId, size, page } = req.query as { assetId: string; size: string; page: string };
      const currencyId = req.query.slug[0];
      const { limit, offset } = getPagination(size, page);
      // const asset = await db.Asset.findOne({
      //   where: { userId: 1, currencyId },
      //   attributes: ['id'],
      //   include: [
      //     {
      //       model: db.Transaction,
      //       as: 'transactions',
      //       attributes: { exclude: ['assetId'] },
      //       limit,
      //       offset,
      //     },
      //   ],
      // });

      const transactions = await db.Transaction.findAndCountAll({
        where: { assetId },
        attributes: { exclude: ['assetId'] },
        order: [['date', 'DESC']],
        limit,
        offset,
      });

      const data = getPaginatedData(transactions, page, limit);
      res.status(200).json({
        status: 'success',
        data: {
          currencyId,
          transactions: data,
        },
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
      const currencyId = req.query.slug[0];
      console.log(currencyId);

      //TODO: add transaction state: for example: pending, fullfilled, rejected
      const usdtAsset = await db.Asset.findOne({ where: { userId, currencyId: 'tether' } });

      let asset;
      asset = await db.Asset.findOne({ where: { userId, id: data.assetId } });
      if (!asset) asset = await db.Asset.create({ currencyId, amount: 0, userId });

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

      asset.amount = +newAssetAmount.toFixed(6);
      usdtAsset.amount = +newUsdtAsset.toFixed(6);
      await asset.save();
      await usdtAsset.save();
      await transaction.save(); //fullfilled

      const updatedAssets = await getAssets(1, [currencyId, 'tether']);
      const { assets: updatedAssetsWithMarketData } = await getAssetsMarketData(updatedAssets);

      res.status(200).json({
        status: 'success',
        data: updatedAssetsWithMarketData, // arr[0] - updated asset, arr[1] - updated usdt asset
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
