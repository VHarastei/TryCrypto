import { fetcher } from 'api';
import { MarketApi } from 'api/marketApi';
import { Paper } from 'components/Paper';
import { Preloader } from 'components/Preloader';
import { PriceChangeField } from 'components/PriceChangeField';
import { format } from 'date-fns';
import { formatDollar } from 'helpers/formatDollar';
import { formatPercent } from 'helpers/formatPercent';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryVoronoiContainer } from 'victory';
import { CustomTooltip } from './CustomTooltip';
import styles from './MarketChart.module.scss';

type PropsType = {
  currencyId: string;
  marketData: any;
};
type ChartDataType = {
  prices: ChartArrayType[];
  market_caps: ChartArrayType[];
  total_volumes: ChartArrayType[];
};
type ChartArrayType = {
  0: number;
  1: number;
};

export const MarketChart: React.FC<PropsType> = ({ currencyId, marketData }) => {
  const [dataInterval, setDataInterval] = useState(intervals[1].value);
  const [chartType, setChartType] = useState<ChartType>('prices');
  const [chartData, setChartData] = useState<ChartDataType | undefined>(undefined);

  const { data } = useSWR<ChartDataType>(
    MarketApi.getMarketChartUrl(currencyId, dataInterval),
    fetcher,
    { refreshInterval: 30000 }
  );
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
                <ChartSelector
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
                <ChartSelector
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
      <VictoryChart
        style={{
          parent: {
            zIndex: 99,
          },
        }}
        animate={{ duration: 300, onLoad: { duration: 300 } }}
        width={1000}
        height={400}
        padding={{ left: 0, top: 76, bottom: 32, right: 0 }}
        domainPadding={{ y: 5 }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={() => ` `}
            style={{ cursor: 'crosshair', zIndex: 99 }}
            portalZIndex={99}
            labelComponent={<CustomTooltip />}
          />
        }
      >
        <VictoryLine
          style={{
            data: {
              stroke: '#f3aa4e',
              strokeWidth: 2,
              margin: 0,
              padding: 0,
            },
          }}
          data={chartData[chartType].map((item) => ({
            x: item[0],
            y: item[1],
          }))}
        />
        <VictoryAxis
          orientation="bottom"
          style={{
            axis: {
              stroke: '#7b7f82',
              strokeWidth: 1,
            },
            tickLabels: {
              fontSize: 16,
              fill: '#7b7f82',
            },
          }}
          tickFormat={(x) => {
            if (+dataInterval <= 1) {
              return format(x, 'p');
            }
            if (dataInterval === 'max') {
              return format(x, 'MMM y');
            }
            return format(x, 'MMM d');
          }}
        />
      </VictoryChart>
    </Paper>
  );
};

type ChartSelectorPropsType = {
  name: string;
  isActive: boolean;
  handleSelectChart: () => void;
};

const ChartSelector: React.FC<ChartSelectorPropsType> = ({ name, isActive, handleSelectChart }) => {
  return (
    <div
      className={`${styles.chartSelector} ${isActive ? styles.chartSelectorActive : ''}`}
      onClick={handleSelectChart}
    >
      {name}
    </div>
  );
};

type IntervalsType = {
  name: string;
  value: string;
};
const intervals: IntervalsType[] = [
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
type ChartTypesType = {
  name: string;
  value: ChartType;
};

const chartTypes: ChartTypesType[] = [
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
