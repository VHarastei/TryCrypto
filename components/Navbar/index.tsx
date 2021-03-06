import Image from 'next/image';
import { useRouter } from 'next/router';
import educationIcon from 'public/static/education.svg';
import homeIcon from 'public/static/home.svg';
import logoIcon from 'public/static/logo.png';
import marketIcon from 'public/static/market.svg';
import portfolioIcon from 'public/static/portfolio.svg';
import menuIcon from 'public/static/menu.svg';
import backIcon from 'public/static/back.svg';
import closeIcon from 'public/static/close.svg';
import React from 'react';
import styles from './Navbar.module.scss';
import { NavItem } from './NavItem';
import Link from 'next/link';
import { UserDialog } from './UserDialog';
import { useState } from 'react';
import clsx from 'clsx';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

type PropsType = {
  children: React.ReactNode;
};

export const Navbar: React.FC<PropsType> = React.memo(function Navbar({ children }) {
  const [displayNav, setDisplayNav] = useState(false);

  const router = useRouter();
  const path = router.pathname.split('/');
  const active = path[1];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/home">
          <a className={styles.logoContainer}>
            <Image src={logoIcon} layout="fixed" alt="Logo icon" width={42} height={38} />
            <span>TryCrypto</span>
          </a>
        </Link>
        <div className={styles.headerBar}>
          <Link href={`/${active}`}>
            <a className={styles.activePage}>
              {path[2] && <Image src={backIcon} alt="Back icon" width={24} height={24} />}
              <span>{active[0].toUpperCase() + active.slice(1)}</span>
            </a>
          </Link>
          <div className={styles.dialogs}>
            <UserDialog />
            <div className={styles.menuIcon} onClick={() => setDisplayNav(true)}>
              <Image src={menuIcon} layout="fixed" alt="menu icon" width={28} height={28} />
            </div>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <nav className={clsx(styles.navContainer, displayNav && styles.navMobile)}>
          {displayNav && (
            <div className={styles.closeIcon} onClick={() => setDisplayNav(false)}>
              <RemoveScrollBar />
              <Image src={closeIcon} layout="fixed" alt="Logo icon" width={28} height={28} />
            </div>
          )}
          <NavItem icon={homeIcon} href="home" active={active} />
          <NavItem icon={educationIcon} href="education" active={active} />
          <NavItem icon={portfolioIcon} href="portfolio" active={active} />
          <NavItem icon={marketIcon} href="market" active={active} />
        </nav>
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </div>
  );
});
