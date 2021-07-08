import { fetcher } from 'api';
import { MarketApi } from 'api/marketApi';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Preloader } from 'components/Preloader';
import { PriceChangeField } from 'components/PriceChangeField';
import { Typography } from 'components/Typography';
import { formatDollar } from 'helpers/formatDollar';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { VictoryArea, VictoryChart, VictoryLine } from 'victory';
import styles from './Watchlist.module.scss';

export const Watchlist = () => {
  const currenciesId = ['bitcoin', 'matic-network', 'titanswap'];

  let { data } = useSWR(
    () =>
      currenciesId.map((currId) => {
        return MarketApi.getCurrencyDataUrl(currId);
      }),
    fetcher
  );
  // if (data)
  //   return (
  //     <div className={styles.preloaderContainer}>
  //       <Preloader />
  //     </div>
  //   );
  return (
    <Card title="Watchlist" transparent>
      {!data ? (
        <div className={styles.preloaderContainer}>
          <Preloader />
        </div>
      ) : (
        <div className={styles.container}>
          {data.map((curr: any) => {
            return <MiniChart key={curr.id} currency={curr} />;
          })}
        </div>
      )}
    </Card>
  );
};

type MiniChartPropsType = {
  currency: any;
};

const MiniChart: React.FC<MiniChartPropsType> = ({ currency }) => {
  const [display, setDisplay] = React.useState(false);
  return (
    <div
      className={styles.miniChart}
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
    >
      <div>
        <div className={styles.miniChartInfo}>
          <div>
            <img
              src={currency.image.small}
              alt={`${currency.symbol} icon`}
              width={30}
              height={30}
            />
            <Typography fs="fs-18" fw="fw-500" className={styles.miniChartInfoName}>
              {currency.name}
            </Typography>
            <Typography fs="fs-18" fw="fw-500" color="gray">
              {currency.symbol.toUpperCase()}
            </Typography>
          </div>
          <Typography fs="fs-24" fw="fw-500">
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
      <VictoryChart
        animate={{ duration: 300, onLoad: { duration: 300 } }}
        width={500}
        height={150}
        padding={0}
        domainPadding={{ y: 16 }}
      >
        <VictoryLine
          style={{
            data: {
              stroke: currency.market_data.price_change_percentage_7d < 0 ? '#f84960' : '#02c076',
              strokeWidth: 2,
            },
          }}
          data={currency.market_data.sparkline_7d.price}
        />
      </VictoryChart>
      <Link href={`/market/${currency.id}`}>
        <a className={`${styles.miniChartButton} ${display && styles.display}`}>
          <Button>View currency</Button>
        </a>
      </Link>
    </div>
  );
};
