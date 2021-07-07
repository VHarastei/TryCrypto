import Image from 'next/image';
import { useRouter } from 'next/router';
import educationIcon from 'public/static/education.png';
import homeIcon from 'public/static/home.png';
import logoIcon from 'public/static/logo.png';
import marketIcon from 'public/static/market.png';
import portfolioIcon from 'public/static/portfolio.png';
import userIcon from 'public/static/user.png';
import backIcon from 'public/static/back.svg';
import React from 'react';
import styles from './Navbar.module.scss';
import { NavItem } from './NavItem';
import Link from 'next/link';

type PropsType = {
  children: React.ReactNode;
};

export const Navbar: React.FC<PropsType> = ({ children }) => {
  const router = useRouter();
  const path = router.pathname.split('/');
  const active = path[1];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={logoIcon} alt="Logo icon" width={42} height={38} />
          <span>TryCrypto</span>
        </div>
        <div className={styles.headerBar}>
          <Link href={`/${active}`}>
            <div className={styles.activePage}>
              {path[2] && <Image src={backIcon} alt="Back icon" width={24} height={24} />}
              <span>{active[0].toUpperCase() + active.slice(1)}</span>
            </div>
          </Link>
          <div className={styles.userContainer}>
            <Image src={userIcon} alt="User icon" width={40} height={40} />
            <span>VHarastei</span>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <nav className={styles.navContainer}>
          <NavItem icon={homeIcon} href="home" active={active} />
          <NavItem icon={educationIcon} href="education" active={active} />
          <NavItem icon={portfolioIcon} href="portfolio" active={active} />
          <NavItem icon={marketIcon} href="market" active={active} />
        </nav>
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </div>
  );
};
