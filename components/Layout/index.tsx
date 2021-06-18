import { Header } from 'components/Header';
import { Navbar } from 'components/Navbar';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './Layout.module.scss';

type PropsType = {
  children: React.ReactNode;
};

export const Layout: React.FC<PropsType> = ({ children }) => {
  const router = useRouter();
  const current = router.pathname.slice(1);

  return (
    <div className={styles.container}>
      <Navbar active={current} />
      <div className={styles.content}>
        <Header current={current} />
        <div>{children}</div>
      </div>
    </div>
  );
};
