import passport from 'middlewares/passport';
import type { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { NextApiReqWithUser } from './../../../auth/[...slug]';
const db = require('db/models/index');

const handler = nextConnect().get(  passport.authenticate('jwt', { session: false }),
async (req: NextApiReqWithUser, res: NextApiResponse) => {
  try {
    const userId = req.user.id;

    const { interval } = req.query as { interval: string };
    const data = await db.HistoricalData.findOne({
      where: { userId },
      attributes: ['id'],
      include: [
        {
          model: db.PNL,
          as: 'PNL',
          attributes: { exclude: ['id', 'historicalDataId'] },
          order: [['date', 'DESC']],
          limit: +interval,
        },
      ],
    });

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: data.PNL,
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
