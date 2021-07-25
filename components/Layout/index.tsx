import { Navbar } from 'components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Layout.module.scss';

type PropsType = {
  children: React.ReactNode;
};

export const Layout: React.FC<PropsType> = React.memo(({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar>
        <div className={styles.children}>{children}</div>
      </Navbar>
    </div>
  );
});
