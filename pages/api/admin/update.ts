import { addDays } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await db.User.findAll({
      attributes: ['id'],
      include: [
        {
          model: db.Asset,
          as: 'assets',
          attributes: { exclude: ['userId', 'currencyId'] },
          include: [{ model: db.Currency, as: 'currency' }],
        },
      ],
    });

    const balances = await Promise.all(
      users.map(async (user: any) => {
        const historicalData = await db.HistoricalData.findOne({
          where: { userId: user.id },
        });

        const { assets, balance } = await getAssetsMarketData(user.assets);

        const yesterdayBalance = await db.Balance.findOne({
          where: { historicalDataId: historicalData.id },
          order: [['date', 'DESC']],
        });

        const date = addDays(new Date(), 1);
        await db.Balance.create({
          date, //new Date().toISOString(),
          usdValue: balance,
          historicalDataId: historicalData.id,
        });
        await db.PNL.create({
          date, //new Date().toISOString(),
          usdValue: yesterdayBalance ? +(balance - yesterdayBalance.usdValue).toFixed(2) : 0,
          historicalDataId: historicalData.id,
        });

        return {
          date, //new Date().toISOString(),
          usdValue: balance,
          historicalDataId: historicalData.id,
        };
      })
    );

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: balances,
    });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      status: 'error',
      data: err,
    });
  }
});

export default handler;
