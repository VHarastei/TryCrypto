import { fetcher, MarketApi } from 'api/marketApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { DbAsset } from 'utils/apiRoutes/getAssetsMarketData';

const db = require('db/models/index');

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { currencyId } = req.query;

    const asset = await db.Asset.findOne({
      where: { userId: 1, currencyId },
      attributes: ['id', 'amount'],
      include: [
        {
          model: db.Currency,
          as: 'currency',
        },
        {
          model: db.Transaction,
          as: 'transactions',
          attributes: { exclude: ['assetId'] },
        },
      ],
    });

    if (!asset)
      return res.status(404).json({
        status: 'error',
        message: `Asset with ${currencyId} not found`,
      });

    const currenPrice = (await fetcher(MarketApi.getCurrencyDataUrl(asset.currency.id))).market_data
      .current_price.usd;

    const usdValue = +(currenPrice * asset.amount).toFixed(2);
    asset.setDataValue('usdValue', usdValue);

    res.status(200).json({
      status: 'success',
      data: asset,
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
