import passport from 'middlewares/passport';
import type { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { NextApiReqWithUser } from 'pages/api/auth/[...slug]';
import { getAssetsMarketData } from 'utils/apiRoutes/getAssetsMarketData';

const db = require('db/models/index');

const handler = nextConnect().get(
  passport.authenticate('jwt', { session: false }),
  async (req: NextApiReqWithUser, res: NextApiResponse) => {
    try {
      const userId = req.user.id;

      const dbAssets = await db.Asset.findAll({
        where: { userId },
        attributes: { exclude: ['userId', 'currencyId'] },
        include: [{ model: db.Currency, as: 'currency' }],
      });

      let { assets, balance } = await getAssetsMarketData(dbAssets);

      if (!Array.isArray(assets)) assets = [assets]; //TODO: fix this

      res.status(200).json({
        status: 'success',
        data: {
          balance,
          assets,
        },
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
