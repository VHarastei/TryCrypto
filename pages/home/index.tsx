import { Banner } from 'components/Banner';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { RecentTransactions } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import { Watchlist } from 'components/Watchlist';
import React from 'react';
import styles from './Home.module.scss';
import btcIcon from 'public/static/btc.png';
import Image from 'next/image';
import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
import { VictoryPie } from 'victory';
import { PieChart } from 'components/PieChart';
import { Asset } from 'pages/portfolio';

export default function Home() {
  return (
    <Layout>
      <Banner
        title="Learn and earn crypto with TryCrypto Education"
        text="Learn about cryptocurrencies like Bitcoin, Ethereum, Binance Coin and earn them for free!"
        button="Earn crypto"
      />
      <Watchlist />
      <Banner
        title="Get $50 free"
        text="Confirm your email address and get bonus"
        button="Confirm email"
      />
      <ContentLayout>
        <Card title="Portfolio balance" withPadding>
          <div className={styles.portfolioBalanceContainer}>
            <div className={styles.portfolioBalance}>
              <Typography variant="regularText" color="gray">
                Account balance:
              </Typography>
              <Typography fw="fw-500" fs="fs-24">
                $53.21
              </Typography>
            </div>
            <PieChart data={assets} />
          </div>
        </Card>

        <Card title="Invite a friend and get bonus" withPadding>
          <Typography variant="regularText" color="gray">
            Invite a friend and you will both receive $20 when they confirm email and buy crypto for
            $50 or more
          </Typography>
          <div className={styles.inviteUrl}>https://trycrypto.com/invite/sdfr24csfd</div>
          <Button fullWidth>Copy link</Button>
        </Card>
      </ContentLayout>
      <Card title="Education" transparent>
        <div className={styles.educationContainer}>
          <Paper className={styles.education}>
            <div className={styles.educationCurrency}>
              <Image layout="fixed" src={btcIcon} alt={`btc icon`} width={48} height={48} />
              <Typography className={styles.educationCurrencyName} fs="fs-22" fw="fw-500">
                Bitcoin
              </Typography>
              <Typography fs="fs-22" fw="fw-500" color="gray">
                BTC
              </Typography>
            </div>
            <Typography variant="regularText" color="gray">
              A decentralized digital currency, without a central bank or single administrator, that
              can be sent from user to user on the peer-to-peer bitcoin network without the need for
              intermediaries
            </Typography>
            <Button fullWidth className={styles.educationBtn}>
              Learn more
            </Button>
          </Paper>
          <Paper className={styles.education}>
            <div className={styles.educationCurrency}>
              <Image layout="fixed" src={btcIcon} alt={`btc icon`} width={48} height={48} />
              <Typography className={styles.educationCurrencyName} fs="fs-22" fw="fw-500">
                Bitcoin
              </Typography>
              <Typography fs="fs-22" fw="fw-500" color="gray">
                BTC
              </Typography>
            </div>
            <Typography variant="regularText" color="gray">
              A decentralized digital currency, without a central bank or single administrator, that
              can be sent from user to user on the peer-to-peer bitcoin network without the need for
              intermediaries
            </Typography>
            <Button fullWidth className={styles.educationBtn}>
              Learn more
            </Button>
          </Paper>
          <Paper className={styles.education}>
            <div className={styles.educationCurrency}>
              <Image layout="fixed" src={btcIcon} alt={`btc icon`} width={48} height={48} />
              <Typography className={styles.educationCurrencyName} fs="fs-22" fw="fw-500">
                Bitcoin
              </Typography>
              <Typography fs="fs-22" fw="fw-500" color="gray">
                BTC
              </Typography>
            </div>
            <Typography variant="regularText" color="gray">
              A decentralized digital currency, without a central bank or single administrator, that
              can be sent from user to user on the peer-to-peer bitcoin network without the need for
              intermediaries
            </Typography>
            <Button fullWidth className={styles.educationBtn}>
              Learn more
            </Button>
          </Paper>
        </div>
      </Card>
    </Layout>
  );
}

const assets: Asset[] = [
  {
    id: 'usd',
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
