import React from 'react';
import styles from './Typography.module.scss';

type PropsType = {
  children: string;
  variant?: 'title' | 'regularText' | 'mediumText' | 'thinText';
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
          : variant === 'mediumText'
          ? styles.mediumText
          : styles.thinText
      } 
      ${color === 'white' ? styles.white : styles.gray}
      `}
    >
      {children}
    </div>
  );
};
