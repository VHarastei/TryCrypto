import passport from 'middlewares/passport';
import type { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getTransactionHistory } from 'utils/apiRoutes/getTransactionHistory';
import { NextApiReqWithUser } from './../../auth/[...slug]';

const db = require('db/models/index');

const handler = nextConnect().get(
  passport.authenticate('jwt', { session: false }),
  async (req: NextApiReqWithUser, res: NextApiResponse) => {
    try {
      const userId = req.user.id;
      const { size, page } = req.query as { size: string; page: string };

      const data = await getTransactionHistory(userId, +size, +page);
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
  }
);

export default handler;
