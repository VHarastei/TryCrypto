import React from 'react';
import styles from './Paper.module.scss';

type PropsType = {
  children: React.ReactNode;
};

export const Paper: React.FC<PropsType> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
