import { fetcher } from 'api';
import { MarketApi } from 'api/marketApi';
import { Paper } from 'components/Paper';
import { format } from 'date-fns';
import React, { useState } from 'react';
import useSWR from 'swr';
import styles from './MarketChart.module.scss';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';
import { formatDollar } from 'helpers/formatDollar';
import { formatPercent } from 'helpers/formatPercent';

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
  const [dataInterval, setDataInterval] = useState(intervals[0].value);
  const [chartType, setChartType] = useState<ChartType>('prices');

  const { data } = useSWR<ChartDataType>(
    MarketApi.getMarketChartUrl(currencyId, dataInterval),
    fetcher
  );
  //console.log(data?.[chartType]);

  if (!data) return <div>loading...</div>;

  return (
    <Paper>
      <div className={styles.header}>
        <div>
          <div className={styles.chartSelectorContainer}>
            {chartTypes.map((chartTps) => {
              return (
                <ChartSelector
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
            <span>{'+' + formatPercent(marketData.price_change_percentage_24h)}</span>
          </div>
        </div>
        <div>
          <div className={styles.chartSelectorContainer}>
            {intervals.map((interval) => {
              return (
                <ChartSelector
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
        width={1000}
        height={400}
        padding={{ left: 0, top: 36, bottom: 32, right: 0 }}
        domainPadding={{ y: 5 }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${formatDollar(datum.y, 5)}`} // Format the price
            //title={`${currencyId} price data chart`} // For screen readers
            labelComponent={
              <VictoryTooltip
                style={{
                  fill: '#333',
                  fontSize: 18,
                }}
                flyoutStyle={{
                  fill: '#fff',
                  stroke: '#fff',
                  strokeWidth: 1,
                  padding: 10,
                  margin: 10,
                }}
              />
            }
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
          data={data.prices.map((item) => ({
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
            if (dataInterval <= 1) {
              return format(x, 'p');
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
  value: number;
};
const intervals: IntervalsType[] = [
  {
    name: '1H',
    value: 0.0416,
  },
  {
    name: '1D',
    value: 1,
  },
  {
    name: '1W',
    value: 7,
  },
  {
    name: '1M',
    value: 30,
  },
  {
    name: '3M',
    value: 90,
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
