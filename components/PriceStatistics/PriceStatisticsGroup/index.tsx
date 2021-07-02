import { Typography } from 'components/Typography';
import React from 'react';
import styles from './PriceStatisticsGroup.module.scss';

type PropsType = {
  title: string;
  children: React.ReactNode;
};

export const PriceStatisticsGroup: React.FC<PropsType> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
};
