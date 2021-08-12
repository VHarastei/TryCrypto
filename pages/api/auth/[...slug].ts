import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
const db = require('db/models/index');
import passport from 'middlewares/passport';
import { generateMD5 } from 'utils/generateHash';
import { User } from 'store/slices/types';

export interface NextApiReqWithUser extends NextApiRequest {
  user: User;
}

const handler = nextConnect()
  .use(passport.initialize())
  .post(
    'api/auth/login',
    passport.authenticate('local', { session: false }),
    async (req: NextApiReqWithUser, res: NextApiResponse) => {
      try {
        res.status(200).json({
          status: 'success',
          data: req.user,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          status: 'error',
          data: err,
        });
      }
    }
  )
  .get(
    'api/auth/me',
    passport.authenticate('jwt', { session: false }),
    async (req: NextApiReqWithUser, res: NextApiResponse) => {
      try {
        res.status(200).json({
          status: 'success',
          data: req.user,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          status: 'error',
          data: err,
        });
      }
    }
  )
  .post('api/auth/register', async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { username, password, email } = req.body;

      const emailInUse = await db.User.findOne({ where: { email } });
      if (emailInUse) {
        return res.status(409).json({
          status: 'error',
          message: 'Email in use',
        });
      }

      const data = {
        username,
        password: generateMD5(password + process.env.SECRET_KEY),
        email,
        confirmHash: generateMD5(process.env.SECRET_KEY + email || Math.random().toString()),
      };

      const user = await db.User.create(data);
      const userId = user.id;

      await db.Asset.create({
        currencyId: 'tether',
        amount: 50.0,
        userId,
      });
      await db.Watch.create({ currencyId: 'bitcoin', userId });
      await db.HistoricalData.create({ userId });

      res.status(201).json({
        status: 'success',
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
