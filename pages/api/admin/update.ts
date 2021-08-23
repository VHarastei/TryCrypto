import { addDays } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const isAuth = req.headers.authorization === process.env.ADMIN_SECRET_KEY;
    // if (!isAuth) return res.status(403).send('unauthorized');
    // turned off because easycron can`t set headers with free plan

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
        const historicalDataId = historicalData.id;

        const { assets, balance } = await getAssetsMarketData(user.assets);

        const yesterdayBalance = await db.Balance.findOne({
          where: { historicalDataId: historicalData.id },
          order: [['date', 'DESC']],
        });

        //const date = addDays(new Date(), 1);
        const date = new Date().toISOString();
        await db.Balance.create({
          date, //new Date().toISOString(),
          usdValue: balance,
          historicalDataId,
        });
        await db.PNL.create({
          date, //new Date().toISOString(),
          usdValue: yesterdayBalance ? +(balance - yesterdayBalance.usdValue).toFixed(2) : 0,
          historicalDataId,
        });
        console.log('UPDATED');

        // return {
        //   date, //new Date().toISOString(),
        //   usdValue: balance,
        //   historicalDataId,
        // };
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
