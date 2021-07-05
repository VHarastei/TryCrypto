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
import { VictoryChart, VictoryLine } from 'victory';
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
    <Card title="Watchlist">
      {!data ? (
        <div className={styles.preloaderContainer}>
          <Preloader />
        </div>
      ) : (
        <div className={styles.container}>
          {data.map((curr: any, index: number) => {
            return <MiniChart key={curr.id} currency={curr} color={colors[index]} />;
          })}

          <Link href={`/market`}>
            <a className={styles.discoverMore}>
              <Button color="secondary">Discover more assets</Button>
            </a>
          </Link>
        </div>
      )}
    </Card>
  );
};

type MiniChartPropsType = {
  currency: any;
  color: string;
};

const MiniChart: React.FC<MiniChartPropsType> = ({ currency, color }) => {
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
            <Typography fs="fs-16" fw="fw-500">
              {currency.name}
            </Typography>
          </div>
          <Typography fs="fs-16" fw="fw-500" color="gray">
            1W
          </Typography>
        </div>
        <div className={styles.miniChartInfo}>
          <Typography fs="fs-24" fw="fw-500">
            {formatDollar(currency.market_data.current_price.usd, 20)}
          </Typography>
          <PriceChangeField fw="fw-500" value={currency.market_data.price_change_percentage_24h} />
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
              stroke: color,
              strokeWidth: 2,
            },
          }}
          data={currency.market_data.sparkline_7d.price}
        />
      </VictoryChart>
      <Link href={`/market/${currency.id}`}>
        <a className={`${styles.miniChartButton} ${display && styles.display}`}>
          <Button>View asset</Button>
        </a>
      </Link>
    </div>
  );
};

const colors = ['#f3aa4e', '#8247E5', '#0C73FE', '#2CB162', '#A5A8A9'];
