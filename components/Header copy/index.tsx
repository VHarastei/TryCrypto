import React from 'react';
import Image from 'next/image';
import userIcon from 'public/static/user.png';
import styles from './Header.module.scss';

type PropsType = {
  current: string;
};

export const Header: React.FC<PropsType> = ({ current }) => {
  return (
    <header className={styles.container}>
      <span className={styles.currentPage}>{current}</span>
      <div className={styles.userContainer}>
        <Image src={userIcon} alt="User icon" width={48} height={48} />
        <span>VHarastei</span>
      </div>
    </header>
  );
};
