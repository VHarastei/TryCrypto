import React from 'react';
import styles from './Typography.module.scss';

type PropsType = {
  children: string;
  variant?: 'title' | 'regularText' | 'mediumText';
  color?: 'gray' | 'white';
};

export const Typography: React.FC<PropsType> = ({
  children,
  variant = 'title',
  color = 'white',
}) => {
  return (
    <div
      className={`
      ${
        variant === 'title'
          ? styles.title
          : variant === 'regularText'
          ? styles.regularText
          : styles.mediumText
      } 
      ${color === 'white' ? styles.white : styles.gray}
      `}
    >
      {children}
    </div>
  );
};
