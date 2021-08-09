import { Navbar } from 'components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './LandingHeader.module.scss';
import Image from 'next/image';
import logoIcon from 'public/static/logo.png';
import Link from 'next/link';
import { Button } from 'components/Button';

export const LandingHeader = React.memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.logoContainer}>
          <Image src={logoIcon} alt="Logo icon" width={42} height={38} />
          <span>TryCrypto</span>
        </div>
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
