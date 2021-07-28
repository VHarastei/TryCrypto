import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';
import { getTransactionHistory } from 'utils/apiRoutes/getTransactionHistory';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { size, page } = req.query as { assetId: string; size: string; page: string };

    const data = await getTransactionHistory(1, +size, +page);
    res.statusCode = 200;
    res.json({
      status: 'success',
      data,
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
