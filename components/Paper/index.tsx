import React from 'react';
import styles from './Paper.module.scss';

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export const Paper: React.FC<PropsType> = React.memo(({ children, className }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
});
