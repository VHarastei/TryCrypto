import React from 'react';
import styles from './Typography.module.scss';

type PropsType = {
  children: string | string[];
  variant?: 'title' | 'regularText' | 'mediumText' | 'thinText';
  color?: 'gray' | 'white';
  className?: string;
};

export const Typography: React.FC<PropsType> = ({
  children,
  variant = 'title',
  color = 'white',
  className,
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
      ${className}
      `}
    >
      {children}
    </div>
  );
};
