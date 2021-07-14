import type { NextApiRequest, NextApiResponse } from 'next';

import nextConnect from 'next-connect';
const db = require('db/models/index');

const handler = nextConnect()
  // Middleware
  //.use(middleware)

  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const assets = await db.Asset.findAll({
        where: { userId: 1 },
        attributes: { exclude: ['userId', 'currencyId'] },
        include: [
          {
            model: db.Currency,
            as: 'currency',
          },
        ],
      });

      res.statusCode = 200;
      res.json({
        status: 'success',
        data: assets,
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
