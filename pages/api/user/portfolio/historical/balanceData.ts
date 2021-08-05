import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getTransactionHistory } from 'utils/apiRoutes/getTransactionHistory';
const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { interval } = req.query as { interval: string };
    const data = await db.HistoricalData.findOne({
      where: { userId: 1 },
      attributes: ['id'],
      include: [
        {
          model: db.Balance,
          as: 'balance',
          attributes: { exclude: ['id', 'historicalDataId'] },
          order: [['date', 'DESC']],
          limit: +interval,
        },
      ],
    });

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: data.balance,
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
