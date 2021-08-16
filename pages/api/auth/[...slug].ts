import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
const db = require('db/models/index');
import passport from 'middlewares/passport';
import { generateMD5 } from 'utils/generateHash';
import { User } from 'store/slices/types';
import * as nodemailer from 'nodemailer';
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
      // query reflink
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
        verifyHash: generateMD5(process.env.SECRET_KEY + email || Math.random().toString()),
      };

      const user = await db.User.create(data);
      const userId = user.id;

      const usdtAsset = await db.Asset.create({
        currencyId: 'tether',
        amount: 100.0,
        userId,
      });
      await db.Transaction.create({
        date: new Date().toISOString(),
        source: 'bonuses',
        type: 'receive',
        usdValue: 100.0,
        amount: 100.0,
        total: 100.0,
        assetId: usdtAsset.id,
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
  })
  .get(
    'api/auth/sendEmail',
    passport.authenticate('jwt', { session: false }),
    async (req: NextApiReqWithUser, res: NextApiResponse) => {
      try {
        const user = await db.User.findByPk(req.user.id);
        console.log(process.env.GMAIL_USER);
        const options = {
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        };
        const mailer = nodemailer.createTransport(options);
        mailer.sendMail(
          {
            from: 'trycrypto@gmail.com',
            to: user.email,
            subject: 'Email verification for TryCrypto',
            html: `To verify your email, go to <a href="http://localhost:3000/verification/${user.verifyHash}">this link</a>`,
          },
          (err) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                status: 'error',
                message: 'Error when sending email',
                details: err,
              });
            }
          }
        );
        res.status(200).json({
          status: 'success',
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
  .patch('api/auth/verify/:hash', async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { slug: hash } = req.query as { slug: string };
      if (!hash)
        return res.status(400).json({
          status: 'error',
          message: 'Hash is not defined',
        });

      const user = await db.User.findOne({ where: { verifyHash: hash } });

      if (!user)
        return res.status(404).json({
          status: 'error',
          message: 'User is not defined',
        });

      if (user.verified === true)
        return res.status(400).json({
          status: 'error',
          message: 'User already verified',
        });

      user.verified = true;
      await user.save();

      const usdtAsset = await db.Asset.findOne({
        where: { userId: user.id, currencyId: 'tether' },
      });

      const transaction = await db.Transaction.create({
        date: new Date().toISOString(),
        source: 'bonuses',
        type: 'receive',
        usdValue: 50.0,
        amount: 50.0,
        total: 50.0,
        assetId: usdtAsset.id,
      });
      const newAmount = +(usdtAsset.amount + transaction.amount).toFixed(6);
      usdtAsset.amount = newAmount;
      await usdtAsset.save();

      const { id, email, verified, referralLink } = user;
      res.status(200).json({
        status: 'success',
        data: { id, email, verified, referralLink },
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
