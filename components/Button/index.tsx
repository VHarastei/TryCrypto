import React from 'react';
import styles from './Button.module.scss';

type PropsType = {
  children: string | React.ReactNode;
  color?: 'primary' | 'secondary';
  className?: string;
  withPadding?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};
export const Button: React.FC<PropsType> = ({
  children,
  color = 'primary',
  className,
  withPadding = true,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      ${styles.button}
      ${color === 'primary' ? styles.primary : styles.secondary}
      ${withPadding ? styles.withPadding : ''}
      ${className}
      `}
    >
      {children}
    </button>
  );
};
