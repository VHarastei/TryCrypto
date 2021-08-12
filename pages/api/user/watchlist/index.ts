import passport from 'middlewares/passport';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { NextApiReqWithUser } from 'pages/api/auth/[...slug]';
import { User } from 'store/slices/types';

const db = require('db/models/index');

const handler = nextConnect().get(
  passport.authenticate('jwt', { session: false }),
  async (req: NextApiReqWithUser, res: NextApiResponse) => {
    try {
      const userId = req.user.id;

      const dbWatchlist = await db.Watch.findAll({
        where: { userId },
        attributes: { exclude: ['userId'] },
      });

      res.status(200).json({
        status: 'success',
        data: dbWatchlist,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        data: err,
      });
    }
  }
);

export default handler;
