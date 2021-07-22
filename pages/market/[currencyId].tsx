import { Api } from 'api';
import { fetcher, MarketApi } from 'api/marketApi';
import { Button } from 'components/Button';
import { BuySellCard } from 'components/BuySellCard';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketChart } from 'components/MarketChart';
import { MarketTransactions } from 'components/MarketTransactions';
import { Preloader } from 'components/Preloader';
import { PriceStatistics } from 'components/PriceStatistics';
import Image from 'next/image';
import { useRouter } from 'next/router';
import starIcon from 'public/static/star.svg';
import React from 'react';
import { wrapper } from 'store';
import { setUserAssets, setUserPortfolio } from 'store/slices/userSlice';
import useSWR from 'swr';
import styles from './Market.module.scss';

interface CurrencyData extends Omit<Currency, 'image'> {
  image: any;
  market_data: any;
  description: any;
}

export interface Currency {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

export default function CurrencyPage() {
  const router = useRouter();
  const { currencyId } = router.query;

  let { data: currencyData } = useSWR<CurrencyData>(
    currencyId ? MarketApi.getCurrencyDataUrl(currencyId as string) : null,
    fetcher,
    { refreshInterval: 30000 }
  );
  const [tab, setTab] = React.useState<'tab1' | 'tab2'>('tab1');
  const handleChangeTab = (newTab: 'tab1' | 'tab2') => {
    setTab(newTab);
  };

  if (!currencyData)
    return (
      <Layout>
        <div className={styles.preloaderContainer}>
          <Preloader />
        </div>
      </Layout>
    );

  let currency: Currency = {
    id: currencyData.id,
    name: currencyData.name,
    symbol: currencyData.symbol,
    image: currencyData.image.large,
  };

  return (
    <Layout>
      <div>
        <div className={styles.header}>
          <div className={styles.nameContainer}>
            <img
              src={currencyData.image.large}
              alt={`${currencyData.symbol} icon`}
              width={48}
              height={48}
            />
            <h1 className={styles.name}>{currencyData.name}</h1>
            <h1>{currencyData.symbol.toUpperCase()}</h1>
            <Button color="secondary" className={styles.watchlistBtn}>
              <Image layout="fixed" src={starIcon} alt={`star icon`} width={24} height={24} />
            </Button>
          </div>
          <div>
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
                Buy/Sell
              </div>
            </div>
          </div>
        </div>

        {tab === 'tab1' ? (
          <ContentLayout>
            <div>
              <MarketChart currencyId={currencyData.id} marketData={currencyData.market_data} />
              {currencyData.description.en && (
                <Card title={`About ${currencyData.name}`} withPadding>
                  <div
                    className={styles.aboutCurrency}
                    dangerouslySetInnerHTML={{
                      __html: currencyData.description.en.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                    }}
                  ></div>
                </Card>
              )}
            </div>
            <div>
              <PriceStatistics currency={currency} data={currencyData.market_data} />
            </div>
          </ContentLayout>
        ) : (
          <ContentLayout>
            <div>
              <MarketTransactions currency={currency} />
            </div>
            <div>
              <BuySellCard
                currency={currency}
                currentPrice={currencyData.market_data.current_price.usd}
              />
            </div>
          </ContentLayout>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  try {
    const data = await Api().getUserAssets();
    store.dispatch(setUserAssets(data.assets));
    return {
      props: {},
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
});
