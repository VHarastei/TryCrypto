import { nanoid } from '@reduxjs/toolkit';
import { fetcher, MarketApi } from 'api/marketApi';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Preloader } from 'components/Preloader';
import { PriceChangeField } from 'components/PriceChangeField';
import { Typography } from 'components/Typography';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { formatDollar } from 'utils/formatDollar';
import { VictoryChart, VictoryLine } from 'victory';
import styles from './Watchlist.module.scss';

export const Watchlist = React.memo(() => {
  const currenciesId = [
    'bitcoin',
    'cardano',
    'solana',
    'solanium',
    'matic-network',
    'tether',
    'ethereum', //
    'ripple',
    //'terra-luna',
    // 'bitcoin',
    // 'bitcoin',
    // 'bitcoin',
  ];
  let { data } = useSWR<any[]>(
    () =>
      currenciesId.map((currId) => {
        return MarketApi.getCurrencyDataUrl(currId);
      }),
    fetcher
  );
  if (!data) return <Preloader />;
  if (!Array.isArray(data)) data = [data];

  const divider = data.length % 3 === 0 ? 3 : data.length % 5 === 0 ? 5 : 4;

  const dividedData: any[] = [];
  let fourItems: any[] = [];
  data.forEach((item, index) => {
    fourItems.push(item);
    if ((index + 1) % divider === 0) {
      dividedData.push(fourItems);
      fourItems = [];
    }
  });
  if (fourItems.length) dividedData.push(fourItems);

  const withDiscoverMore =
    (fourItems.length && fourItems.length <= 2) || (fourItems.length === 3 && divider === 4);
  if (withDiscoverMore) fourItems.push('discoverMore');

  return (
    <Card title="Watchlist" transparent>
      <div className={styles.container}>
        {dividedData.map((fourItems) => {
          return (
            <div key={nanoid()} className={styles.miniChartsContainer}>
              {fourItems.map((curr: any) =>
                curr === 'discoverMore' ? (
                  <div key={nanoid()} className={styles.discoverMore}>
                    <Link href="/market">
                      <a>
                        <Button>Discover more</Button>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <MiniChart key={curr.id} currency={curr} />
                )
              )}
            </div>
          );
        })}
        {!withDiscoverMore && (
          <div key={nanoid()} className={`${styles.discoverMore} ${styles.discoverMoreWide}`}>
            <Link href="/market">
              <a>
                <Button>Discover more</Button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
});

type MiniChartPropsType = {
  currency: any;
};

const MiniChart: React.FC<MiniChartPropsType> = React.memo(({ currency }) => {
  const [display, setDisplay] = React.useState(false);
  return (
    <div
      className={styles.miniChart}
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
    >
      <div className={styles.miniChartDesc}>
        <div className={styles.miniChartInfo}>
          <div>
            <img
              src={currency.image.small}
              alt={`${currency.symbol} icon`}
              width={30}
              height={30}
            />
            <Typography fs="fs-18" fw="fw-500" className={styles.miniChartInfoName}>
              {currency.symbol.toUpperCase()}
            </Typography>
          </div>
          <Typography fs="fs-22" fw="fw-500">
            {formatDollar(currency.market_data.current_price.usd, 20)}
          </Typography>
        </div>
        <div className={styles.miniChartInfo}>
          <Typography fs="fs-18" fw="fw-500" color="gray">
            7D
          </Typography>
          <PriceChangeField fw="fw-500" value={currency.market_data.price_change_percentage_7d} />
        </div>
      </div>
      <Sparkline data={currency.market_data} />
      <Link href={`/market/${currency.id}`}>
        <a>
          <Button className={`${styles.miniChartButton} ${display && styles.display}`}>
            View more
          </Button>
        </a>
      </Link>
    </div>
  );
});

const Sparkline = React.memo(({ data }: any) => {
  return (
    <VictoryChart width={500} height={150} padding={0} domainPadding={{ y: 16 }}>
      <VictoryLine
        style={{
          data: {
            stroke: data.price_change_percentage_7d < 0 ? '#f84960' : '#02c076',
            strokeWidth: 2,
          },
        }}
        data={data.sparkline_7d.price}
      />
    </VictoryChart>
  );
});
