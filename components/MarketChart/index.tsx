import { fetcher, MarketApi } from 'api/marketApi';
import { Paper } from 'components/Paper';
import { Preloader } from 'components/Preloader';
import { PriceChangeField } from 'components/PriceChangeField';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { formatDollar } from 'utils/formatDollar';
import { CustomChart } from './CustomChart';
import { IntervalSelector } from './IntervalSelector';
import styles from './MarketChart.module.scss';

type PropsType = {
  currencyId: string;
  marketData: any;
};
export type ChartData = {
  prices: ChartArray[];
  market_caps: ChartArray[];
  total_volumes: ChartArray[];
};
export type ChartArray = [number, number];

export const MarketChart: React.FC<PropsType> = React.memo(({ currencyId, marketData }) => {
  const [dataInterval, setDataInterval] = useState(intervals[1].value);
  const [chartType, setChartType] = useState<ChartType>('prices');
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);

  const { data } = useSWR<ChartData>(
    MarketApi.getMarketChartUrl(currencyId, dataInterval),
    fetcher,
    { refreshInterval: 30000 }
  );
  // const { data: brushChartData } = useSWR<ChartData>(
  //   MarketApi.getMarketChartUrl(currencyId, 'max'),
  //   fetcher,
  //   { revalidateOnFocus: false, revalidateOnMount: false, revalidateOnReconnect: false }
  // );

  useEffect(() => {
    if (data) setChartData(data);
  }, [data]);

  if (!chartData)
    return (
      <div className={styles.preloaderContainer}>
        <Preloader />
      </div>
    );

  return (
    <Paper>
      <div className={styles.header}>
        <div>
          <div className={styles.chartSelectorContainer}>
            {chartTypes.map((chartTps) => {
              return (
                <IntervalSelector
                  key={chartTps.value}
                  name={chartTps.name}
                  isActive={chartTps.value === chartType}
                  handleSelectChart={() => setChartType(chartTps.value)}
                />
              );
            })}
          </div>
          <div className={styles.chartPriceContainer}>
            <div className={styles.chartPrice}>
              {formatDollar(marketData.current_price.usd, 20)}
            </div>
            <div className={styles.chartPricePercent}>
              <PriceChangeField value={marketData.price_change_percentage_24h} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.chartSelectorContainer}>
            {intervals.map((interval) => {
              return (
                <IntervalSelector
                  key={interval.value}
                  name={interval.name}
                  isActive={interval.value === dataInterval}
                  handleSelectChart={() => setDataInterval(interval.value)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <CustomChart data={chartData[chartType]} dataInterval={dataInterval} />
      {/* <CustomBrushChart data={brushChartData?.prices} /> */}
    </Paper>
  );
});

type Intervals = {
  name: string;
  value: string;
};
const intervals: Intervals[] = [
  {
    name: '1H',
    value: '0.0416',
  },
  {
    name: '1D',
    value: '1',
  },
  {
    name: '1W',
    value: '7',
  },
  {
    name: '1M',
    value: '30',
  },
  {
    name: '3M',
    value: '90',
  },
  {
    name: '1Y',
    value: '365',
  },
  {
    name: 'MAX',
    value: 'max',
  },
];

type ChartType = 'prices' | 'market_caps' | 'total_volumes';
type ChartTypes = {
  name: string;
  value: ChartType;
};

const chartTypes: ChartTypes[] = [
  {
    name: 'Price',
    value: 'prices',
  },
  {
    name: 'Market Cap',
    value: 'market_caps',
  },
  {
    name: 'Total Volumes',
    value: 'total_volumes',
  },
];
