import passport from 'middlewares/passport';
import type { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';
import { getTransactionHistory } from 'utils/apiRoutes/getTransactionHistory';
import { NextApiReqWithUser } from './../../auth/[...slug]';

const db = require('db/models/index');

const handler = nextConnect().get(
  passport.authenticate('jwt', { session: false }),
  async (req: NextApiReqWithUser, res: NextApiResponse) => {
    try {
      const userId = req.user.id;
      const data = await db.User.findOne({
        where: { id: userId },
        attributes: [],
        include: [
          {
            model: db.Asset,
            as: 'assets',
            attributes: { exclude: ['userId', 'currencyId'] },
            include: [{ model: db.Currency, as: 'currency' }],
          },
        ],
      });

      const historicalData = await db.HistoricalData.findOne({
        where: { userId },
        attributes: ['id'],
        include: [
          {
            model: db.Balance,
            as: 'balance',
            attributes: { exclude: ['id', 'historicalDataId'] },
            order: [['date', 'DESC']],
            limit: 30,
          },
          {
            model: db.PNL,
            as: 'PNL',
            attributes: { exclude: ['id', 'historicalDataId'] },
            order: [['date', 'DESC']],
            limit: 30,
          },
        ],
      });

      const { assets, balance } = await getAssetsMarketData(data.assets);
      const recentTransactions = await getTransactionHistory(userId);

      const calcChange = (a: number, b: number) => +(((b - a) / a) * 100).toFixed(2);
      let yesterdaysPNL, thirtydaysPNL;
      if (
        historicalData.balance.length &&
        historicalData.PNL.length &&
        historicalData.balance.length !== 1
      ) {
        console.log(historicalData.PNL.length - 1);
        yesterdaysPNL = {
          usdValue: historicalData.PNL[0].usdValue,
          usdValueChangePercetage: calcChange(
            historicalData.balance[1].usdValue,
            historicalData.balance[0].usdValue
          ),
        };

        thirtydaysPNL = {
          usdValue: +(
            historicalData.balance[0].usdValue -
            historicalData.balance[historicalData.balance.length - 1].usdValue
          ).toFixed(2),
          usdValueChangePercetage: calcChange(
            historicalData.balance[historicalData.balance.length - 1].usdValue,
            historicalData.balance[0].usdValue
          ),
        };
      } else {
        yesterdaysPNL = { usdValue: 0, usdValueChangePercetage: 0 };
        thirtydaysPNL = { usdValue: 0, usdValueChangePercetage: 0 };
      }

      res.status(200).json({
        status: 'success',
        data: {
          balance,
          assets,
          recentTransactions: recentTransactions.items,
          yesterdaysPNL, //: { usdValue: 10, usdValueChangePercetage: 2 },
          thirtydaysPNL, //: { usdValue: 15, usdValueChangePercetage: 5 },
          historicalData,
        },
      });
    } catch (err) {
      //console.log(err);
      res.statusCode = 500;
      res.json({
        status: 'error',
        data: err,
      });
    }
  }
);

export default handler;
