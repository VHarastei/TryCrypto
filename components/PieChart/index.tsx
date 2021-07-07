import { Typography } from 'components/Typography';
import React from 'react';
import { VictoryContainer, VictoryPie } from 'victory';
import styles from './PieChart.module.scss';

type PropsType = {
  className?: string;
};

export const PieChart: React.FC<PropsType> = ({ className }) => {
  const data = [
    {
      id: 'usd',
      name: 'USD',
      amount: 132.11,
      percentageAmount: 34,
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      amount: 0.002345,
      percentageAmount: 25,
    },
    {
      id: 'matic-network',
      name: 'Matic',
      amount: 5.212464,
      percentageAmount: 16,
    },
    {
      id: 'ripple',
      name: 'Xrp',
      amount: 12.768444,
      percentageAmount: 15,
    },
    {
      id: 'cardano',
      name: 'Cardano',
      amount: 1.456784,
      percentageAmount: 5,
    },
    {
      id: 'solana',
      name: 'Solana',
      amount: 0.123545,
      percentageAmount: 4,
    },
    {
      id: 'dia',
      name: 'DIA',
      amount: 0.124556,
      percentageAmount: 3,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      amount: 0.000341,
      percentageAmount: 3,
    },
  ];

  type ChartData = {
    x: string;
    y: number;
  };

  let otherCurrencies = 0;
  const chartData: ChartData[] = data.reduce((results: ChartData[], item, index) => {
    if (index <= 3)
      results.push({
        x: item.name,
        y: item.percentageAmount,
      });

    if (index >= 4) {
      otherCurrencies += item.percentageAmount;
      if (data.length - 1 === index)
        results.push({
          x: 'Other',
          y: otherCurrencies,
        });
    }
    return results;
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Typography variant="regularText" color="gray">
          Account balance:
        </Typography>
        <Typography fw="fw-500" fs="fs-24">
          $53.21
        </Typography>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <VictoryPie
            height={200}
            width={200}
            padAngle={5}
            innerRadius={85}
            padding={0}
            domainPadding={0}
            colorScale={['#f3aa4e', '#6076FF', 'tomato', '#82BB47', '#7b7f82']}
            data={chartData}
            containerComponent={<VictoryContainer height={200} width={200} />}
          />
        </div>
        <div>
          {data.map((item, index) => {
            if (index <= 3) return <div>{item.name}</div>;
            if (data.length - 1 === index) return <div>Other</div>;
          })}
        </div>
      </div>
    </div>
  );
};
