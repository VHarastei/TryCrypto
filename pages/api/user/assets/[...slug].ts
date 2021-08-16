import { NextApiReqWithUser } from './../../auth/[...slug]';
import { getPagination } from './../../../../utils/apiRoutes/getPagination';
import { fetcher, MarketApi } from 'api/marketApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssets } from 'utils/apiRoutes/getAssets';
import { DbAsset, getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';
import { getPaginatedData } from 'utils/apiRoutes/getPaginatedData';
import passport from 'middlewares/passport';

const db = require('db/models/index');
const handler = nextConnect()
  .use(passport.authenticate('jwt', { session: false }))
  .get('api/user/assets/:slug', async (req: NextApiReqWithUser, res: NextApiResponse) => {
    try {
      const userId = req.user.id;
      const { slug: currencyId } = req.query as { slug: string };
      const asset = await getAssets(userId, [currencyId]);
      if (!asset)
        return res.status(404).json({
          status: 'error',
          message: `Asset with ${currencyId} not found`,
        });

      const { assets: assetWithMarketData } = await getAssetsMarketData([asset[0]]);
      res.status(200).json({
        status: 'success',
        data: assetWithMarketData[0],
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

      const { limit, offset } = getPagination(+size, +page);
      const transactions = await db.Transaction.findAndCountAll({
        where: { assetId },
        attributes: { exclude: ['assetId'] },
        order: [['date', 'DESC']],
        limit,
        offset,
      });

      if (!transactions)
        return res.status(404).json({
          status: 'error',
          message: `Transactions for assetId: ${assetId} not found`,
        });

      const data = getPaginatedData(transactions, +page, limit);

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
  .post(async (req: NextApiReqWithUser, res: NextApiResponse) => {
    try {
      const userId = req.user.id;

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
        newUsdtAsset -= transaction.total; //TODO: this may cause problems: -0.000007
      } else {
        newAssetAmount -= transaction.amount;
        newUsdtAsset += transaction.total;
      }

      asset.amount = +newAssetAmount.toFixed(6);
      usdtAsset.amount = +newUsdtAsset.toFixed(6);
      await asset.save();
      await usdtAsset.save();
      await transaction.save(); //fullfilled

      const updatedAssets = await getAssets(userId, [currencyId, 'tether']);
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
