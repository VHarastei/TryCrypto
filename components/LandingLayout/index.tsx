import { Navbar } from 'components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';
import { LandingHeader } from './LandingHeader';
import styles from './LandingLayout.module.scss';

type PropsType = {
  children: React.ReactNode;
};

export const LandingLayout: React.FC<PropsType> = React.memo(({ children }) => {
  return (
    <div className={styles.container}>
      <LandingHeader />
      <div className={styles.content}>{children}</div>
    </div>
  );
});
