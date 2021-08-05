import { Card } from 'components/Card';
import { IntervalSelector } from 'components/MarketChart/IntervalSelector';
import { Typography } from 'components/Typography';
import { parseISO, subDays } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HistoricalDataItem } from 'store/slices/types';
import styles from './ChartIntervalProvider.module.scss';

type PropsType = {
  data: any[];
  Chart: React.FC<any>;
  title: string;
  withAxies?: boolean;
  handleFetch: (interval: number) => void;
};

export const ChartIntervalProvider: React.FC<PropsType> = React.memo(
  ({ data, title, Chart, withAxies, handleFetch }) => {
    const [interval, setInterval] = useState(intervals[0].value);
    const dispatch = useDispatch();

    const handleChangeInterval = (newInt: number) => {
      setInterval(newInt);
      dispatch(handleFetch(newInt));
    };

    const formattedData = data.map((item) => {
      if (withAxies)
        return {
          x: new Date(item.date).getTime(),
          y: item.usdValue,
        };
      return [new Date(item.date).getTime(), item.usdValue];
    });

    const placeholderItems: any[] = [];

    const placeholderItemsLength = interval - data.length;
    const endDate = parseISO(data[data.length - 1].date);

    for (let i = 0; i < placeholderItemsLength; i++) {
      const sub = subDays(endDate, i + 1).getTime();
      if (withAxies) placeholderItems.push({ x: sub, y: 0 });
      else placeholderItems.push([sub, 0]);
    }

    const fullData = [...placeholderItems.reverse(), ...formattedData];

    return (
      <Card
        title={<CardTitle title={title} interval={interval} setInterval={handleChangeInterval} />}
      >
        <Chart data={fullData} dataInterval={`${interval}`} />
      </Card>
    );
  }
);

type CardTitlePropsType = {
  title: string;
  interval: number;
  setInterval: (newInt: number) => void;
};

const CardTitle: React.FC<CardTitlePropsType> = React.memo(({ title, interval, setInterval }) => {
  return (
    <div className={styles.cardTitle}>
      <Typography variant="title">{title}</Typography>
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
});

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
    name: '180D',
    value: 180,
  },
];
