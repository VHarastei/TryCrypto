import React from 'react';
import styles from './Button.module.scss';

type PropsType = {
  children: string | React.ReactNode;
  color?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};
export const Button: React.FC<PropsType> = React.memo(
  ({ children, color = 'primary', className, fullWidth, disabled, onClick }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
      ${styles.button}
      ${color === 'primary' ? styles.primary : styles.secondary}
      ${fullWidth && styles.fullWidth}
      ${disabled && styles.disabled}
      ${className}
      `}
      >
        {children}
      </button>
    );
  }
);
