import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const db = require('db/models/index');

const handler = nextConnect()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = 1;
      const { currencyId } = req.query as { currencyId: string };

      const watchlistCurrency = await db.Watch.findOne({
        where: { userId, currencyId },
      });

      res.status(200).json({
        status: 'success',
        data: watchlistCurrency,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        data: err,
      });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = 1;
      const { currencyId } = req.query as { currencyId: string };

      const newWatchlistCurrency = await db.Watch.create({
        userId,
        currencyId,
      });

      res.status(201).json({
        status: 'success',
        data: newWatchlistCurrency,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        data: err,
      });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = 1;
      const { currencyId } = req.query as { currencyId: string };

      await db.Watch.destroy({ where: { userId, currencyId } });

      res.status(200).json({
        status: 'success',
        data: {},
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        data: err,
      });
    }
  });

export default handler;
