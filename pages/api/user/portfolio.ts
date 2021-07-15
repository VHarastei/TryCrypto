import { fetcher, MarketApi } from 'api/marketApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Currency } from 'pages/market/[currencyId]';

const db = require('db/models/index');

type dbAsset = {
  id: number;
  amount: number;
  currency: Omit<Currency, 'image'>;
};

const handler = nextConnect().get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dbAssets: dbAsset[] = await db.Asset.findAll({
      where: { userId: 1 },
      attributes: { exclude: ['userId', 'currencyId'] },
      include: [
        {
          model: db.Currency,
          as: 'currency',
        },
      ],
    });
    const assetsMarketData = await Promise.all(
      dbAssets.map((asset) => {
        return fetcher(MarketApi.getCurrencyDataUrl(asset.currency.id));
      })
    );

    const assets = assetsMarketData.map((mAsset, index) => {
      return {
        price: mAsset.market_data.current_price.usd,
        amount: dbAssets[index].amount,
        pricePercentage: 0,
        //price amount ???????????????????????????
        currency: {
          id: mAsset.id,
          name: mAsset.name,
          symbol: mAsset.symbol,
          image: mAsset.image.large,
        },
      };
    });
    let balance = 0;
    assets.forEach((asset) => (balance += asset.price * asset.amount));
    assets.forEach((asset, index) => {
      assets[index].pricePercentage = +(((asset.price * asset.amount) / balance) * 100).toFixed(2);
    });

    console.log(assets, balance);
    // const currencyData = await fetcher(MarketApi.getCurrencyDataUrl('bitcoin'));
    // console.log(currencyData);
    res.statusCode = 200;
    res.json({
      status: 'success',
      data: dbAssets,
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
