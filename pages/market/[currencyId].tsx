import { Api } from 'api';
import { fetcher, MarketApi } from 'api/marketApi';
import { BuySellCard } from 'components/BuySellCard';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketChart } from 'components/MarketChart';
import { MarketTransactions } from 'components/MarketTransactions';
import { Preloader } from 'components/Preloader';
import { PriceStatistics } from 'components/PriceStatistics';
import { WatchlistButton } from 'components/WatchlistButton';
import { useRouter } from 'next/router';
import React from 'react';
import { wrapper } from 'store';
import { setUserAssets } from 'store/slices/assetsSlice';
import { Currency } from 'store/slices/types';
import { setUserWatchlistCurrency } from 'store/slices/watchlistSlice';
import useSWR from 'swr';
import { checkAuth } from 'utils/checkAuth';
import styles from './Market.module.scss';

interface CurrencyData extends Omit<Currency, 'image'> {
  image: any;
  market_data: any;
  description: any;
}

export default function CurrencyPage() {
  const router = useRouter();
  const { currencyId } = router.query as { currencyId: string };

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

            <WatchlistButton outlined currencyId={currencyId} />
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      try {
        const token = req.cookies.token;
        const isRedirect = await checkAuth(store, token);
        if (isRedirect) return isRedirect;

        const { currencyId } = query as { currencyId: string };

        const [data, watchlistCurrency] = await Promise.all([
          Api(token).getUserAssets(),
          Api(token).getUserWatchlistCurrency(currencyId),
        ]);

        store.dispatch(setUserAssets(data.assets));
        if (watchlistCurrency) {
          store.dispatch(setUserWatchlistCurrency(watchlistCurrency));
        }
        return {
          props: {},
        };
      } catch (err) {
        console.log(err);
        return {
          props: {},
        };
      }
    }
);
