import React from 'react';
import Image from 'next/image';
import logoIcon from 'public/static/logo.png';
import homeIcon from 'public/static/home.png';
import portfolioIcon from 'public/static/portfolio.png';
import marketIcon from 'public/static/market.png';
import educationIcon from 'public/static/education.png';
import userIcon from 'public/static/user.png';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { NavItem } from './NavItem';

type PropsType = {
  active: string;
  children: React.ReactNode;
};

export const Navbar: React.FC<PropsType> = ({ active, children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={logoIcon} alt="Logo icon" width={42} height={38} />
          <span>TryCrypto</span>
        </div>
        <div className={styles.headerBar}>
          <span className={styles.activePage}>{active[0].toUpperCase() + active.slice(1)}</span>
          <div className={styles.userContainer}>
            <Image src={userIcon} alt="User icon" width={40} height={40} />
            <span>VHarastei</span>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <nav className={styles.navContainer}>
          <NavItem icon={homeIcon} href="home" active={active} />
          <NavItem icon={portfolioIcon} href="portfolio" active={active} />
          <NavItem icon={marketIcon} href="market" active={active} />
          <NavItem icon={educationIcon} href="education" active={active} />
        </nav>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
