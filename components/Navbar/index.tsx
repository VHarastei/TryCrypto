import React from 'react';
import Image from 'next/image';
import logoIcon from 'public/static/logo.png';
import homeIcon from 'public/static/home.png';
import portfolioIcon from 'public/static/portfolio.png';
import marketIcon from 'public/static/market.png';
import educationIcon from 'public/static/education.png';
import styles from './Navbar.module.scss';

type PropsType = {
  active: string;
};

export const Navbar: React.FC<PropsType> = ({ active }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logoIcon} alt="Logo icon" width={46} height={42} />
        <span>TryCrypto</span>
      </div>
      <nav className={styles.navContainer}>
        <NavItem icon={homeIcon} text="Home" isActive={true} />
        <NavItem icon={portfolioIcon} text="Portfolio" isActive={false} />
        <NavItem icon={marketIcon} text="Market" isActive={false} />
        <NavItem icon={educationIcon} text="Education" isActive={false} />
      </nav>
    </div>
  );
};

type NavItemPropsType = {
  icon: StaticImageData;
  text: string;
  isActive: boolean;
};

const NavItem: React.FC<NavItemPropsType> = ({ icon, text, isActive }) => {
  return (
    <div className={styles.navItem}>
      <Image src={icon} alt={`${icon} icon`} width={24} height={24} />
      <span className={isActive ? styles.navItemActive : ''}>{text}</span>
    </div>
  );
};
