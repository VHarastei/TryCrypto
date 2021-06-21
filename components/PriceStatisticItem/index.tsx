import { Typography } from 'components/Typography';
import React from 'react';
import styles from './PriceStatisticItem.module.scss';

type PropsType = {
  prop: string;
  value: string;
  last?: boolean;
};

export const PriceStatisticItem: React.FC<PropsType> = ({ prop, value, last }) => {
  return (
    <div className={`${styles.container} ${last ? styles.last : ''}`}>
      <Typography variant="mediumText" color="gray">
        {prop}
      </Typography>
      <Typography variant="mediumText">{value}</Typography>
    </div>
  );
};
