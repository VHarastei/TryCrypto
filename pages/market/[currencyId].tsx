import { fetcher } from 'api';
import { MarketApi } from 'api/marketApi';
import { Button } from 'components/Button';
import { BuySellCard } from 'components/BuySellCard';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketChart } from 'components/MarketChart';
import { Paper } from 'components/Paper';
import { Preloader } from 'components/Preloader';
import { PriceStatistics } from 'components/PriceStatistics';
import { RecentTransactions } from 'components/RecentTransactions';
import Image from 'next/image';
import { useRouter } from 'next/router';
import starIcon from 'public/static/star.png';
import React from 'react';
import useSWR from 'swr';
import styles from './Market.module.scss';

export default function Currency() {
  const router = useRouter();
  const { currencyId } = router.query;

  let { data: currency } = useSWR(
    currencyId ? MarketApi.getCurrencyDataUrl(currencyId as string) : null,
    fetcher,
    { refreshInterval: 30000 }
  );

  const [tab, setTab] = React.useState<'tab1' | 'tab2'>('tab1');
  const handleChangeTab = (newTab: 'tab1' | 'tab2') => {
    setTab(newTab);
  };

  return (
    <Layout>
      {currency ? (
        <div>
          <div className={styles.header}>
            <div className={styles.nameContainer}>
              <img
                src={currency.image.large}
                alt={`${currency.symbol} icon`}
                width={48}
                height={48}
              />
              <h1 className={styles.name}>{currency.name}</h1>
              <h1>{currency.symbol.toUpperCase()}</h1>
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
                <MarketChart currencyId={currency.id} marketData={currency.market_data} />
                {currency.description.en && (
                  <Card title={`About ${currency.name}`} withPadding>
                    <div
                      className={styles.aboutCurrency}
                      dangerouslySetInnerHTML={{
                        __html: currency.description.en.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                      }}
                    ></div>
                  </Card>
                )}
              </div>
              <div>
                <PriceStatistics
                  currency={currency.name}
                  symbol={currency.symbol}
                  data={currency.market_data}
                />
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
        </div>
      ) : (
        <div className={styles.preloaderContainer}>
          <Preloader />
        </div>
      )}
    </Layout>
  );
}
