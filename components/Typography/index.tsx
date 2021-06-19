import React from 'react';
import styles from './Typography.module.scss';

type PropsType = {
  children: string;
  variant?: 'title' | 'text';
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
      ${variant === 'title' ? styles.title : styles.text} 
      ${color === 'white' ? styles.white : styles.gray}
      `}
    >
      {children}
    </div>
  );
};
