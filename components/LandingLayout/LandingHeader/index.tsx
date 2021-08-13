import { Button } from 'components/Button';
import Image from 'next/image';
import Link from 'next/link';
import logoIcon from 'public/static/logo.png';
import React from 'react';
import styles from './LandingHeader.module.scss';

export const LandingHeader = React.memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Link href="/">
          <a className={styles.logoContainer}>
            <Image src={logoIcon} alt="Logo icon" width={42} height={38} />
            <span>TryCrypto</span>
          </a>
        </Link>
        <Link href="/bonuses">
          <a className={styles.navItem}>Bonuses</a>
        </Link>
        <Link href="/bonuses">
          <a className={styles.navItem}>Learn&Earn</a>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <a className={styles.navItem}>Log In</a>
        </Link>
        <Link href="/register">
          <a>
            <Button>Register</Button>
          </a>
        </Link>
      </div>
    </div>
  );
});
