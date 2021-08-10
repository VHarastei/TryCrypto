import { Typography } from 'components/Typography';
import { formatPercent } from 'utils/formatPercent';
import React from 'react';
import styles from './TextField.module.scss';

type PropsType = {
  type: 'text' | 'password';
  name: string;
  error?: string;
  register: any;
};

export const TextField: React.FC<PropsType> = React.memo(({ type, name, error, register }) => {
  return (
    <div className={styles.container}>
      <Typography fs="fs-14" fw="fw-500">
        {name}
      </Typography>
      <input type={type} className={error && styles.error} {...register} />
      {error && (
        <Typography fs="fs-14" fw="fw-500" color="red">
          {error}
        </Typography>
      )}
    </div>
  );
});
