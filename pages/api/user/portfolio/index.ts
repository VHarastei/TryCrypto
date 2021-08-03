import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';
import { getTransactionHistory } from 'utils/apiRoutes/getTransactionHistory';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await db.User.findOne({
      where: { id: 1 },
      attributes: [],
      order: [
        [
          { model: db.HistoricalData, as: 'historicalData' },
          { model: db.Balance, as: 'balance' },
          'date',
          'ASC',
        ],
        [
          { model: db.HistoricalData, as: 'historicalData' },
          { model: db.PNL, as: 'PNL' },
          'date',
          'ASC',
        ],
      ],
      include: [
        {
          model: db.Asset,
          as: 'assets',
          attributes: { exclude: ['userId', 'currencyId'] },
          include: [{ model: db.Currency, as: 'currency' }],
        },
        {
          model: db.HistoricalData,
          as: 'historicalData',
          attributes: { exclude: ['userId'] },
          include: [
            {
              model: db.Balance,
              as: 'balance',
              attributes: { exclude: ['id', 'historicalDataId'] },
            },
            {
              model: db.PNL,
              as: 'PNL',
              attributes: { exclude: ['id', 'historicalDataId'] },
            },
          ],
        },
      ],
    });

    const { assets, balance } = await getAssetsMarketData(data.assets);
    const recentTransactions = await getTransactionHistory(1);

    //const calcChange = (a: number, b: number) => +(((b - a) / a) * 100).toFixed(2);
    // if (data.historicalData) {
    //   const yesterdaysPNL = {
    //     usdValue: data.historicalData.PNL[data.historicalData.PNL.length - 1].usdValue,
    //     usdValueChangePercetage: calcChange(
    //       data.historicalData.balance[data.historicalData.balance.length - 2].usdValue,
    //       data.historicalData.balance[data.historicalData.balance.length - 1].usdValue
    //     ),
    //   };
    //   const thirtydaysPNL = {
    //     usdValue: +(
    //       data.historicalData.balance[data.historicalData.balance.length - 1].usdValue -
    //       data.historicalData.balance[0].usdValue
    //     ).toFixed(2),
    //     usdValueChangePercetage: calcChange(
    //       data.historicalData.balance[0].usdValue,
    //       data.historicalData.balance[data.historicalData.balance.length - 1].usdValue
    //     ),
    //   };
    // }

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: {
        balance,
        assets,
        recentTransactions: recentTransactions.items,
        yesterdaysPNL: { usdValue: 10, usdValueChangePercetage: 2 },
        thirtydaysPNL: { usdValue: 15, usdValueChangePercetage: 5 },
        historicalData: data.historicalData,
      },
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