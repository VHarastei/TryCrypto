import { Typography } from 'components/Typography';
import React from 'react';
import styles from './Card.module.scss';

type PropsType = {
  children: React.ReactNode;
  title: string;
};

export const Card: React.FC<PropsType> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.padding}>
        <Typography>{title}</Typography>
      </div>
      <hr className={styles.divider} />
      {children}
    </div>
  );
};
