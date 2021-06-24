import { Button } from 'components/Button';
import { BuySellCard } from 'components/BuySellCard';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { Paper } from 'components/Paper';
import { PriceStatisticItem } from 'components/PriceStatisticItem';
import { RecentTransactions } from 'components/RecentTransactions';
import Image from 'next/image';
import { useRouter } from 'next/router';
import btcIcon from 'public/static/btc.png';
import starIcon from 'public/static/star.png';
import React from 'react';
import styles from './Market.module.scss';

const Currency = () => {
  const router = useRouter();
  const { currencyId } = router.query;

  const [tab, setTab] = React.useState<'tab1' | 'tab2'>('tab1');
  const handleChangeTab = (newTab: 'tab1' | 'tab2') => {
    setTab(newTab);
  };

  return (
    <Layout>
      <div className={styles.header}>
        <div className={styles.nameContainer}>
          <Image layout="fixed" src={btcIcon} alt={`btc icon`} width={48} height={48} />
          <h1 className={styles.name}>Bitcoin</h1>
          <h1>BTC</h1>
        </div>
        <Button color="secondary">
          <div className={styles.watchlistBtn}>
            <Image layout="fixed" src={starIcon} alt={`star icon`} width={24} height={24} />
            <span>Watchlist</span>
          </div>
        </Button>
      </div>
      <div className={styles.menu}>
        <div
          onClick={() => handleChangeTab('tab1')}
          className={`${styles.tab} ${tab === 'tab1' ? styles.active : ''}`}
        >
          Overview
        </div>
        <div
          onClick={() => handleChangeTab('tab2')}
          className={`${styles.tab} ${tab === 'tab2' ? styles.active : ''}`}
        >
          Wallet
        </div>

        <div className={styles.line}></div>
      </div>
      {tab === 'tab1' ? (
        <ContentLayout>
          <div>
            <Paper>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
              <div>CONTENT</div>
            </Paper>
            <Card title="About Bitcoin" withPadding>
              <div>
                The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the
                internet through a digital ledger known as a blockchain. Bitcoins are divisible into
                smaller units known as satoshis — each satoshi is worth 0.00000001 bitcoin.
              </div>
            </Card>
          </div>
          <div>
            <Card title="BTC Price Statistics" withPadding>
              <PriceStatisticItem prop={'Current price'} value={'$32,682.58'} />
              <PriceStatisticItem prop={'24h Low'} value={'$32,258.06'} />
              <PriceStatisticItem prop={'24h High'} value={'$36,059.48'} />
              <PriceStatisticItem prop={'Market Cap'} value={'$617.5B'} />
              <PriceStatisticItem prop={'24h Volume'} value={'$49.0B'} last />
            </Card>
          </div>
        </ContentLayout>
      ) : (
        <ContentLayout>
          <div>
            <RecentTransactions currency="Bitcoin" simplified />
          </div>
          <div>
            <BuySellCard currency="Bitcoin" symbol="BTC" />
          </div>
        </ContentLayout>
      )}
    </Layout>
  );
};

export default Currency;
