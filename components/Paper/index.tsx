import React from 'react';
import styles from './Paper.module.scss';

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export const Paper: React.FC<PropsType> = ({ children, className }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
