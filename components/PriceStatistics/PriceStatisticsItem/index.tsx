import { Typography } from 'components/Typography';
import React from 'react';
import styles from './PriceStatisticsItem.module.scss';

type PropsType = {
  title: string;
  value: string;
  subTitle?: string;
  subValue?: string;
};

export const PriceStatisticsItem: React.FC<PropsType> = ({ title, value, subTitle, subValue }) => {
  // ${last ? styles.last : ''}
  return (
    <div className={styles.container}>
      <div>
        <Typography variant="regularText" color="gray">
          {title}
        </Typography>
        {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
      </div>
      <div>
        <Typography variant="mediumText">{value}</Typography>
        {subValue && <span className={styles.subValue}>{subValue}</span>}
      </div>
    </div>
  );
};
