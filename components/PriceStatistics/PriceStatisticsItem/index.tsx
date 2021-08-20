import clsx from 'clsx';
import { Typography } from 'components/Typography';
import React from 'react';
import styles from './PriceStatisticsItem.module.scss';

type PropsType = {
  title: string;
  value?: string;
  subTitle?: string;
  subValue?: string;
};

export const PriceStatisticsItem: React.FC<PropsType> = React.memo(function PriceStatisticsItem({
  title,
  value,
  subTitle,
  subValue,
}) {
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
            {value === '∞' || value.includes('#')
              ? value
              : !!!parseFloat(value.slice(value.includes('-') ? 2 : value.includes('$') ? 1 : 0))
              ? '--'
              : value}
          </Typography>
        )}
        {subValue && (
          <div
            className={clsx(
              styles.subValue,
              subValue && !!!parseFloat(subValue)
                ? ''
                : parseFloat(subValue) > 0
                ? styles.green
                : styles.red
            )}
          >
            <span></span>
            {!!!parseFloat(subValue) ? '--' : subValue}
          </div>
        )}
      </div>
    </div>
  );
});
