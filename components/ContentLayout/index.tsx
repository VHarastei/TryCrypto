import clsx from 'clsx';
import React from 'react';
import styles from './ContentLayout.module.scss';

type PropsType = {
  children: React.ReactNode;
  type?: 'default' | 'halfs';
};

export const ContentLayout: React.FC<PropsType> = React.memo(function ContentLayout({
  children,
  type = 'default',
}) {
  return <div className={clsx(styles.container, type === 'halfs' && styles.halfs)}>{children}</div>;
});
