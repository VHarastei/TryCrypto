import { fetcher, MarketApi } from 'api/marketApi';
import clsx from 'clsx';
import { Paper } from 'components/Paper';
import { Preloader } from 'components/Preloader';
import { PriceChangeField } from 'components/PriceChangeField';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { formatDollar } from 'utils/formatDollar';
import { CustomChart } from './CustomChart';
import { IntervalSelector } from './IntervalSelector';
import styles from './MarketChart.module.scss';
import fullscreenIcon from 'public/static/fullscreen.svg';
import fullscreenExitIcon from 'public/static/fullscreenExit.svg';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { useFullscreenStatus } from 'hooks/useFullscreenStatus';

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
  const [isResized, setIsResized] = useState(false);

  const maximizableElement = React.useRef(null);
  const { isFullscreen, setIsFullscreen } = useFullscreenStatus(maximizableElement);

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

  const handleResize = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      setIsFullscreen();
    }

    if (!isResized) {
      screen.orientation.lock('landscape-primary').catch((error) => {
        console.log(error);
      });
    } else {
      screen.orientation.unlock();
    }

    setIsResized(!isResized);
  };

  return (
    <div ref={maximizableElement}>
      <Paper className={clsx(isResized && styles.fullscreenChart)}>
        {isResized && <RemoveScrollBar />}
        <div className={styles.header}>
          <div className={styles.chartSelectors}>
            {!isResized && (
              <div className={clsx(styles.chartSelectorContainer, styles.chartSelectorTypes)}>
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
            )}
            <div className={clsx(styles.resizeContainer, isResized && styles.justify)}>
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
              <div
                className={clsx(styles.resizeBtn, isResized && styles.display)}
                onClick={handleResize}
              >
                <Image
                  src={isResized ? fullscreenExitIcon : fullscreenIcon}
                  layout="fixed"
                  alt="resize icon"
                  width={28}
                  height={28}
                />
              </div>
            </div>
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

        {/* {isResized && (
        <div>
          <RemoveScrollBar />
          <div className={styles.fullscreenChart}>
            <div>
              <CustomChart data={chartData[chartType]} dataInterval={dataInterval} />
            </div>
          </div>
        </div>
      )} */}
        <div className={styles.fullscreenData}>
          <CustomChart data={chartData[chartType]} dataInterval={dataInterval} />
        </div>
        {/* <CustomBrushChart data={brushChartData?.prices} /> */}
      </Paper>
    </div>
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
