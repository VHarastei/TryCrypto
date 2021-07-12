import { Typography } from 'components/Typography';
import { formatPercent } from 'helpers/formatPercent';
import Link from 'next/link';
import { Asset } from 'pages/portfolio';
import React from 'react';
import { VictoryContainer, VictoryPie } from 'victory';
import styles from './PieChart.module.scss';

type PropsType = {
  data: Asset[];
};

export const PieChart: React.FC<PropsType> = ({ data }) => {
  type ChartData = {
    x: string;
    y: number;
  };

  let otherCurrencies = 0;
  const chartData: ChartData[] = data.reduce((results: ChartData[], item, index) => {
    if (index <= 3)
      results.push({
        x: item.name,
        y: item.pricePercentage,
      });

    if (index >= 4) {
      otherCurrencies += item.pricePercentage;
      if (data.length - 1 === index)
        results.push({
          x: 'Other',
          y: otherCurrencies,
        });
    }
    return results;
  }, []);

  const chartColors = ['#f3aa4e', '#6076ff', 'tomato', '#82bb47', '#7b7f82'];

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <VictoryPie
          height={200}
          width={200}
          padAngle={5}
          innerRadius={85}
          padding={0}
          domainPadding={0}
          colorScale={chartColors}
          data={chartData}
          containerComponent={<VictoryContainer height={200} width={200} />}
        />
      </div>
      <div className={styles.chartItemsContainer}>
        {data.map((item, index) => {
          if (index <= 3)
            return (
              <Link href={`/market/${item.id === 'usd' ? '' : item.id}`} key={item.id}>
                <a className={styles.chartItem}>
                  <div className={styles.chartItemName}>
                    <div
                      className={`${styles.chartItemColor} ${
                        styles[`bg_${chartColors[index].slice(1)}`]
                      }`}
                    ></div>
                    <Typography variant="regularText">{item.symbol.toUpperCase()}</Typography>
                  </div>
                  <div>
                    <Typography variant="mediumText">
                      {formatPercent(item.pricePercentage)}
                    </Typography>
                  </div>
                </a>
              </Link>
            );
          if (data.length - 1 === index)
            return (
              <div className={styles.chartItem} key={item.id}>
                <div className={styles.chartItemName}>
                  <div className={`${styles.chartItemColor} ${styles.bg_gray}`}></div>
                  <Typography variant="regularText">Other</Typography>
                </div>
                <div></div>
              </div>
              // <div className={styles.chartItem} key={item.id}>
              //   <div className={`${styles.chartItemColor} ${styles.gray}`}></div>
              //   <Typography variant="regularText">Other</Typography>
              // </div>
            );
        })}
      </div>
    </div>
  );
};
