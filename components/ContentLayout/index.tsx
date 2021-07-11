import React from 'react';
import styles from './ContentLayout.module.scss';

type PropsType = {
  children: React.ReactNode;
  type?: 'default' | 'halfs';
};

export const ContentLayout: React.FC<PropsType> = ({ children, type = 'default' }) => {
  return (
    <div className={`${styles.container} ${type === 'halfs' && styles.halfs} `}>{children}</div>
  );
};
