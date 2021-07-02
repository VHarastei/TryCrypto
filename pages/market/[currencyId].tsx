import { fetcher } from 'api';
import { MarketApi } from 'api/marketApi';
import { Button } from 'components/Button';
import { BuySellCard } from 'components/BuySellCard';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { Paper } from 'components/Paper';
import { PriceStatistics } from 'components/PriceStatistics';
import { RecentTransactions } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import { formatDollar } from 'helpers/formatDollar';
import { formatPercent } from 'helpers/formatPercent';
import Image from 'next/image';
import { useRouter } from 'next/router';
import loadingIcon from 'public/static/loading.svg';
import starIcon from 'public/static/star.png';
import React from 'react';
import useSWR from 'swr';
import styles from './Market.module.scss';

export default function Currency() {
  const router = useRouter();
  const { currencyId } = router.query;

  let { data: currency } = useSWR(
    currencyId ? MarketApi.getCurrencyDataUrl(currencyId as string) : null,
    fetcher
  );
  console.log(currency);

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
                {currency.description.en && (
                  <Card title={`About ${currency.name}`} withPadding>
                    {/* <pre
                    dangerouslySetInnerHTML={{ __html: currency.description.en }}
                  ></pre> */}
                    {/* <textarea>{currency.description.en}</textarea> */}

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
                {/* <Card title={`${currency.name} Statistics`} withPadding>
                  <div>{`${currency.name} Price Today`}</div>
                  <PriceStatisticItem
                    prop={'Current price'}
                    value={formatDollar(currency.market_data.current_price.usd, 20)}
                  />
                  <PriceStatisticItem
                    prop={'24h Low'}
                    value={formatDollar(currency.market_data.low_24h.usd, 20)}
                  />
                  <PriceStatisticItem
                    prop={'24h High'}
                    value={formatDollar(currency.market_data.high_24h.usd, 20)}
                  />
                  <PriceStatisticItem
                    prop={'Market Cap'}
                    value={formatDollar(currency.market_data.market_cap.usd, 20)}
                  />
                  <PriceStatisticItem
                    prop={'24h Market Cap Change'}
                    value={formatPercent(currency.market_data.market_cap_change_percentage_24h)}
                  />
                  <PriceStatisticItem
                    prop={'24h Volume'}
                    value={formatDollar(currency.market_data.total_volume.usd, 20)}
                  />
                </Card> */}
                <PriceStatistics currency={currency.name} data={currency.market_data} />
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
        <div className={styles.preloader}>
          <Image src={loadingIcon} alt="Search icon" width={72} height={72} />
        </div>
      )}
    </Layout>
  );
}

type PriceStatisticGroupPropsType = {
  title: string;
  children: React.ReactNode;
};

const PriceStatisticGroup: React.FC<PriceStatisticGroupPropsType> = ({ title, children }) => {
  return (
    <div>
      <div>{title}</div>
      {children}
    </div>
  );
};
