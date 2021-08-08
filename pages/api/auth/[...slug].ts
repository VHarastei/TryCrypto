import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
const db = require('db/models/index');
import passport from 'middlewares/passport';
import { generateMD5 } from 'utils/generateHash';

const handler = nextConnect()
  .use(passport.initialize())
  .post(
    'api/auth/login',
    passport.authenticate('local', { session: false }),
    async (req: any, res: NextApiResponse) => {
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
    async (req: any, res: NextApiResponse) => {
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
  .post('api/auth/register', async (req: any, res: NextApiResponse) => {
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

      res.status(201).json({
        status: 'success',
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          confirmed: user.confirmed,
        },
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
