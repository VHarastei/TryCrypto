import { Typography } from 'components/Typography';
import { formatPercent } from 'utils/formatPercent';
import React from 'react';
import styles from './PriceChangeField.module.scss';

type PropsType = {
  value: number;
  fw?: 'fw-300' | 'fw-400' | 'fw-500' | 'fw-600' | 'fw-700' | 'fw-800';
  fs?: 'fs-12' | 'fs-14' | 'fs-16' | 'fs-18' | 'fs-20' | 'fs-22' | 'fs-24';
};

export const PriceChangeField: React.FC<PropsType> = ({ value, fw, fs }) => {
  return (
    <div className={value > 0 ? styles.green : styles.red}>
      <span></span>
      <Typography fw={fw} fs={fs}>
        {formatPercent(Math.abs(value))}
      </Typography>
    </div>
  );
};
