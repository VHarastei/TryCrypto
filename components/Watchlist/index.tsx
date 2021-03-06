import { fetcher, MarketApi } from 'api/marketApi';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { PriceChangeField } from 'components/PriceChangeField';
import { Typography } from 'components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import cryptoCurrencyIcon from 'public/static/cryptocurrency.svg';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserWatchlist } from 'store/selectors';
import useSWR from 'swr';
import { formatDollar } from 'utils/formatDollar';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';
import styles from './Watchlist.module.scss';

export const Watchlist = React.memo(function Watchlist() {
  const watchlist = useSelector(selectUserWatchlist).slice(0, 12); //max 12 elements

  const divider = watchlist.length % 3 === 0 ? 3 : watchlist.length % 5 === 0 ? 5 : 4;

  const dividedItems: any[] = [];
  let fourItems: any[] = [];
  watchlist.forEach((item, index) => {
    fourItems.push(item.currencyId);
    if ((index + 1) % divider === 0) {
      dividedItems.push(fourItems);
      fourItems = [];
    }
  });
  if (fourItems.length) dividedItems.push(fourItems);

  const withDiscoverMore =
    (fourItems.length && fourItems.length <= 2) || (fourItems.length === 3 && divider === 4);
  if (withDiscoverMore) fourItems.push('discoverMore');

  return (
    <Card title="Watchlist" transparent>
      <div className={styles.container}>
        {dividedItems.map((fourItems, index: number) => {
          return (
            <div key={index} className={styles.miniChartsContainer}>
              {fourItems.map((currencyId: string) =>
                currencyId === 'discoverMore' ? (
                  <div key={currencyId} className={styles.discoverMore}>
                    <Link href="/market">
                      <a>
                        <Button>Discover more</Button>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <MiniChart key={currencyId} currencyId={currencyId} />
                )
              )}
            </div>
          );
        })}
        {!watchlist.length && (
          <div className={styles.emptyWatchlistContainer}>
            <Image alt="cryptocurrency icon" src={cryptoCurrencyIcon} width={128} height={128} />
            <Typography className={styles.emptyWatchlistText} variant="regularText">
              Add crypto to your watchlist by clicking button below
            </Typography>
          </div>
        )}
        {!withDiscoverMore && (
          <div className={clsx(styles.discoverMore, styles.discoverMoreWide)}>
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
  currencyId: string;
};

export const MiniChart: React.FC<MiniChartPropsType> = React.memo(function MiniChart({
  currencyId,
}) {
  const [display, setDisplay] = React.useState(false);
  const { data: currency } = useSWR(() => MarketApi.getCurrencyDataUrl(currencyId), fetcher);

  if (!currency) return <MiniChartPreloader />;
  return (
    <div
      className={styles.miniChart}
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
    >
      <div className={styles.miniChartDesc}>
        <div className={styles.miniChartInfo}>
          <div className={styles.miniChartInfoImageNameCon}>
            <Image
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
          <Button className={clsx(styles.miniChartButton, display && styles.display)}>
            View more
          </Button>
        </a>
      </Link>
    </div>
  );
});

const MiniChartPreloader = React.memo(function MiniChartPreloader() {
  return (
    <div className={styles.miniChart}>
      <div className={styles.miniChartDesc}>
        <div className={styles.miniChartInfo}>
          <div className={styles.miniChartInfoImageNameCon}>
            <div className={clsx(styles.miniChartInfoImg, styles.shimmer)}></div>
            <div className={clsx(styles.miniChartInfoCurrName, styles.shimmer)}></div>
          </div>
          <div className={clsx(styles.miniChartInfoPrice, styles.shimmer)}></div>
        </div>
        <div className={styles.miniChartInfo}>
          <div className={clsx(styles.miniChartInfoDate, styles.shimmer)}></div>
          <div className={clsx(styles.miniChartInfoPriceChange, styles.shimmer)}></div>
        </div>
      </div>
      <div className={clsx(styles.miniChartSparkline, styles.shimmer)}>
        <VictoryChart width={500} height={150} padding={0} domainPadding={{ y: 16 }}>
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fill: 'transparent' },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
});

const Sparkline = React.memo(function Sparkline({ data }: any) {
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
