import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './NavItem.module.scss';

type PropsType = {
  icon: StaticImageData;
  href: string;
  active: string;
};

export const NavItem: React.FC<PropsType> = ({ icon, href, active }) => {
  return (
    <Link href={`/${href}`}>
      <a className={styles.navItem}>
        <Image src={icon} alt={`${icon} icon`} width={24} height={24} />
        <span className={active === href ? styles.navItemActive : ''}>
          {href[0].toUpperCase() + href.slice(1)}
        </span>
      </a>
    </Link>
  );
};
