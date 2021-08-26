import Image from 'next/image';
import React from 'react';
import styles from './Preloader.module.scss';
import loadingIcon from 'public/static/loading.svg';

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <Image src={loadingIcon} layout="fixed" alt="Search icon" width={72} height={72} />
    </div>
  );
};
