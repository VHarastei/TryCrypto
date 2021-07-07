import React from 'react';
import styles from './Button.module.scss';

type PropsType = {
  children: string | React.ReactNode;
  color?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};
export const Button: React.FC<PropsType> = ({
  children,
  color = 'primary',
  className,
  fullWidth,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      ${styles.button}
      ${color === 'primary' ? styles.primary : styles.secondary}
      ${fullWidth ? styles.fullWidth : ''}
      ${className}
      `}
    >
      {children}
    </button>
  );
};
