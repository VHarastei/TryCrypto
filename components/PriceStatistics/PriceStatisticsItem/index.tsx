import { Typography } from 'components/Typography';
import fi from 'date-fns/esm/locale/fi/index.js';
import React from 'react';
import styles from './PriceStatisticsItem.module.scss';

type PropsType = {
  title: string;
  value?: string;
  subTitle?: string;
  subValue?: string;
};

export const PriceStatisticsItem: React.FC<PropsType> = ({ title, value, subTitle, subValue }) => {
  return (
    <div className={styles.container}>
      <div className={styles.col}>
        <Typography variant="regularText" color="gray">
          {title}
        </Typography>
        {subTitle && (
          <div className={styles.subTitle}>
            <span></span>
            {subTitle}
          </div>
        )}
      </div>
      <div className={styles.col}>
        {value && (
          <Typography variant="mediumText">
            {value === '∞'
              ? '∞'
              : !!!parseFloat(value.slice(value.includes('-') ? 2 : 1))
              ? '--'
              : value}
          </Typography>
        )}
        {subValue && (
          <div
            className={`${styles.subValue} ${
              subValue && !!!parseFloat(subValue)
                ? ''
                : parseFloat(subValue) > 0
                ? styles.green
                : styles.red
            } `}
          >
            <span></span>
            {!!!parseFloat(subValue) ? '--' : subValue}
          </div>
        )}
      </div>
    </div>
  );
};
