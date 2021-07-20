import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAssets } from 'utils/apiRoutes/getAssets';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { assets, balance } = await getAssets(1);

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: {
        balance,
        assets,
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
