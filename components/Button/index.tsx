import Image from 'next/image';
import React from 'react';
import styles from './Button.module.scss';
import loadingIcon from 'public/static/loadingMini.svg';
import clsx from 'clsx';

type PropsType = {
  children: string | React.ReactNode;
  color?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};
export const Button: React.FC<PropsType> = React.memo(function Button({
  children,
  color = 'primary',
  className,
  fullWidth,
  disabled,
  isLoading,
  type,
  onClick,
}) {
  if (isLoading) disabled = true;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        className,
        styles.button,
        color === 'primary' ? styles.primary : styles.secondary,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled
      )}
    >
      {isLoading ? (
        <div className={styles.isLoading}>
          <Image src={loadingIcon} height={32} width={32} alt="loading icon" />
        </div>
      ) : (
        children
      )}
    </button>
  );
});
