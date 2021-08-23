import { Navbar } from 'components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Layout.module.scss';

type PropsType = {
  children: React.ReactNode;
};

export const Layout: React.FC<PropsType> = React.memo(function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar>
        <div className={styles.children}>{children}</div>
      </Navbar>
      <div className={styles.footer}>
        <div>
          <a href="https://github.com/VHarastei" rel="noreferrer" target="_blank">
            VHarastei
          </a>
          <span> © 2021 </span>
          <span className={styles.footerName}> TryCrypto</span>
        </div>
        <div>
          <span>Data from </span>
          <a href="https://www.coingecko.com" rel="noreferrer" target="_blank">
            CoinGecko
          </a>
        </div>
      </div>
    </div>
  );
});
