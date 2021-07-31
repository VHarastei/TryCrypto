import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = 1;
    const dbWatchlist = await db.Watch.findAll({
      where: { userId },
      attributes: { exclude: ['userId'] },
    });

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: dbWatchlist,
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
