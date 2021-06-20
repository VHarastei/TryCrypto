import { Navbar } from 'components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Layout.module.scss';

type PropsType = {
  children: React.ReactNode;
};

export const Layout: React.FC<PropsType> = ({ children }) => {
  const router = useRouter();
  const current = router.pathname.slice(1);

  return (
    <div className={styles.container}>
      <Navbar active={current}>
        <div className={styles.children}>{children}</div>
      </Navbar>
    </div>
  );
};
