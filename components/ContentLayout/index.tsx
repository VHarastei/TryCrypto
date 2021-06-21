import React from 'react';
import styles from './ContentLayout.module.scss';

type PropsType = {
  children: React.ReactNode;
};

export const ContentLayout: React.FC<PropsType> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
