import clsx from 'clsx';
import React from 'react';
import styles from './Paper.module.scss';

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export const Paper: React.FC<PropsType> = React.memo(function Paper({ children, className }) {
  return <div className={clsx(className, styles.container)}>{children}</div>;
});
