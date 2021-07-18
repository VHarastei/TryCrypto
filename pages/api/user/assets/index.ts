import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { DbAsset, getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dbAssets: DbAsset[] = await db.Asset.findAll({
      where: { userId: 1 },
      attributes: { exclude: ['userId', 'currencyId'] },
      include: [
        {
          model: db.Currency,
          as: 'currency',
        },
      ],
    });
    const { assets, balance } = await getAssetsMarketData(dbAssets);

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
