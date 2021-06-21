import React from 'react';
import styles from './Divider.module.scss';

type PropsType = {
  fullWidth?: boolean;
};

export const Divider: React.FC<PropsType> = ({ fullWidth }) => {
  return <hr className={`${styles.divider} ${fullWidth ? styles.fullWidth : ''}`} />;
};
