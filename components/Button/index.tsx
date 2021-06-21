import React from 'react';
import styles from './Button.module.scss';

type PropsType = {
  children: string | React.ReactNode;
  color?: 'primary' | 'secondary';
  className?: string;
};
export const Button: React.FC<PropsType> = ({ children, color = 'primary', className }) => {
  return (
    <button
      className={`
      ${styles.button}
      ${color === 'primary' ? styles.primary : styles.secondary}
      ${className}
      `}
    >
      {children}
    </button>
  );
};
