import { Card } from 'components/Card';
import { CustomChart } from 'components/MarketChart/CustomChart';
import { IntervalSelector } from 'components/MarketChart/IntervalSelector';
import { Typography } from 'components/Typography';
import { parseISO, subDays } from 'date-fns';
import React, { useState } from 'react';
import { HistoricalDataItem } from 'store/slices/types';
import styles from './AssetNetWorthChart.module.scss';

type PropsType = {
  data: HistoricalDataItem[];
};

export const AssetNetWorthChart: React.FC<PropsType> = React.memo(({ data }) => {
  const [interval, setInterval] = useState(intervals[0].value);

  const formattedData = data.map((balance) => {
    return [new Date(balance.date).getTime(), balance.usdValue];
  });

  const placeholderItems: any[] = [];

  const placeholderItemsLength = interval - data.length;
  const endDate = parseISO(data[0].date);

  for (let i = 0; i < placeholderItemsLength; i++) {
    const sub = subDays(endDate, i + 1).getTime();
    placeholderItems.push([sub, 0]);
  }

  const fullData = [...placeholderItems.reverse(), ...formattedData];

  return (
    <Card title={<CardTitle interval={interval} setInterval={setInterval} />}>
      <CustomChart data={fullData} dataInterval={`${interval}`} />
    </Card>
  );
});

type CardTitlePropsType = {
  interval: number;
  setInterval: (newInt: number) => void;
};

const CardTitle: React.FC<CardTitlePropsType> = ({ interval, setInterval }) => {
  return (
    <div className={styles.cardTitle}>
      <Typography variant="title">Asset Net Worth</Typography>
      <div className={styles.cardTitleIntervals}>
        {intervals.map((int) => (
          <IntervalSelector
            key={int.value}
            name={int.name}
            isActive={int.value === interval}
            handleSelectChart={() => setInterval(int.value)}
          />
        ))}
      </div>
    </div>
  );
};

const intervals = [
  {
    name: '7D',
    value: 7,
  },
  {
    name: '30D',
    value: 30,
  },
  {
    name: '90D',
    value: 90,
  },
  {
    name: '1Y',
    value: 365,
  },
];
