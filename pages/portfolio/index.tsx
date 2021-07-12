import { BarChart } from 'components/BarChart';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { ChartArray } from 'components/MarketChart';
import { CustomChart } from 'components/MarketChart/CustomChart';
import { Paper } from 'components/Paper';
import { PieChart } from 'components/PieChart';
import { PriceChangeField } from 'components/PriceChangeField';
import { RecentTransactions } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import { formatDollar } from 'helpers/formatDollar';
import Link from 'next/link';
import { Currency } from 'pages/market/[currencyId]';
import React from 'react';
import styles from './Portfolio.module.scss';

export interface Asset extends Currency {
  amount: number;
  pricePercentage: number;
  price: number;
}

export default function Portfolio() {
  return (
    <Layout>
      <Paper className={styles.header}>
        <div className={styles.headerItem}>
          <Typography variant="mediumText" color="gray">
            Estimated Balance
          </Typography>
          <div className={styles.headerItemValueContainer}>
            <span className={styles.headerItemValue}>{formatDollar(data.balance, 20)}</span>
          </div>
        </div>
        <div className={styles.headerPnls}>
          <div className={styles.headerItem}>
            <Typography variant="mediumText" color="gray">
              Yesterday's PNL
            </Typography>
            <div className={styles.headerItemValueContainer}>
              <span className={styles.headerItemValue}>
                {`${data.yesterdaysPNL > 0 ? '+' : ''}${formatDollar(data.yesterdaysPNL, 20)}`}
              </span>
              <PriceChangeField fs="fs-16" fw="fw-500" value={data.yesterdaysPNLChange} />
            </div>
          </div>
          <div className={styles.headerItem}>
            <Typography variant="mediumText" color="gray">
              30 day's PNL
            </Typography>
            <div className={styles.headerItemValueContainer}>
              <span className={styles.headerItemValue}>
                {`${data.thirtydaysPNL > 0 ? '+' : ''}${formatDollar(data.thirtydaysPNL, 20)}`}
              </span>
              <PriceChangeField fs="fs-16" fw="fw-500" value={data.thirtydaysPNLChange} />
            </div>
          </div>
        </div>
      </Paper>
      <ContentLayout type="halfs">
        <Card title="Asset Net Worth">
          <CustomChart data={assetNetWorth} dataInterval={'30'} />
        </Card>
        <Card title="Daily PNL">
          <BarChart />
        </Card>
      </ContentLayout>
      <ContentLayout type="halfs">
        <div>
          <Card title="Your Assets">
            <div className={styles.assetsTable}>
              <div className={styles.assetsTableHeader}>
                <Typography className={styles.assetsTableAsset} color="gray">
                  Asset
                </Typography>
                <Typography className={styles.assetsTableAmount} color="gray">
                  Amount
                </Typography>
                <Typography className={styles.assetsTablePrice} color="gray">
                  Price
                </Typography>
              </div>
              <div>
                {assets.map((asset) => {
                  return <AssetsTableRow asset={asset} />;
                })}
              </div>
            </div>
          </Card>
        </div>
        <div className={styles.allocationContainer}>
          <div>
            <Card title="Asset Allocation" withPadding>
              <PieChart data={assets} />
            </Card>
          </div>
          <div>
            <RecentTransactions />
          </div>
        </div>
      </ContentLayout>
    </Layout>
  );
}

type AssetsTableRowPropsType = {
  asset: Asset;
};
const AssetsTableRow: React.FC<AssetsTableRowPropsType> = ({ asset }) => {
  return (
    <Link href={`market/${asset.id}`}>
      <a className={styles.tableRowContainer}>
        <div className={styles.assetsTableAsset}>
          <img src={asset.image} alt={`${asset.symbol} icon`} width={30} height={30} />
          <div className={styles.assetsTableAssetName}>
            <Typography variant="regularText">{asset.name}</Typography>
          </div>
          <Typography variant="regularText" color="gray">
            {asset.symbol.toUpperCase()}
          </Typography>
        </div>

        <Typography className={styles.assetsTableAmount}>{asset.amount}</Typography>
        <Typography className={styles.assetsTablePrice}>{formatDollar(asset.price, 20)}</Typography>
      </a>
    </Link>
  );
};

const assetNetWorth: ChartArray[] = [
  [1626002996433, 32.23635896383309],
  [1626003298251, 32.278343677327044],
  [1626003594872, 32.25833262925587],
  [1626003894496, 32.24991715207208],
  [1626004179437, 32.180415148314545],
  [1626004477062, 32.170041311076425],
  [1626004797634, 32.177943723101485],
  [1626005047578, 32.216686568548994],
  [1626005391193, 32.26167700454967],
  [1626005666064, 32.23888880631192],
  [1626005968685, 32.22758927181381],
  [1626006299271, 32.17351413111313],
  [1626006593386, 32.11751467823188],
  [1626006871828, 32.12208239358226],
  [1626007215010, 32.13716922542593],
  [1626007499545, 32.153346745774044],
  [1626007773938, 32.1560111659612],
  [1626008098383, 32.10509072945368],
  [1626008354015, 32.08047520780977],
  [1626008693720, 32.044916824696145],
  [1626009015161, 31.942403072159383],
  [1626009263130, 31.937729725372176],
  [1626009598388, 31.944122060442897],
  [1626009880506, 31.949071470811706],
  [1626010043000, 31.98347751056691],
];

const data = {
  balance: 32.52,
  yesterdaysPNL: 2.65,
  yesterdaysPNLChange: 1.21,
  thirtydaysPNL: -8.12,
  thirtydaysPNLChange: -3.56,
};

const assets: Asset[] = [
  {
    id: 'tether',
    name: 'USD',
    symbol: 'usd',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    amount: 132.003241,
    pricePercentage: 34.23,
    price: 132.01,
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    amount: 0.002345,
    pricePercentage: 25.11,
    price: 112.53,
  },
  {
    id: 'matic-network',
    name: 'Polygon',
    symbol: 'matic',
    image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
    amount: 102.212464,
    pricePercentage: 16.01,
    price: 95.34,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    amount: 0.068444,
    pricePercentage: 15.21,
    price: 90.24,
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ada',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860',
    amount: 1.456784,
    pricePercentage: 5.24,
    price: 34.95,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'sol',
    image:
      'https://assets.coingecko.com/coins/images/4128/large/coinmarketcap-solana-200.png?1616489452',
    amount: 1.023545,
    pricePercentage: 4.97,
    price: 31.95,
  },
  {
    id: 'dia-data',
    name: 'DIA',
    symbol: 'DIA',
    image:
      'https://assets.coingecko.com/coins/images/11955/large/DIA-icon-colour_%281%29.png?1596423488',
    amount: 15.124556,
    pricePercentage: 3.42,
    price: 20.2,
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'xrp',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
    amount: 30.000341,
    pricePercentage: 3.11,
    price: 15.84,
  },
];
