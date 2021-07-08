import React from 'react';
import styles from './Typography.module.scss';

type PropsType = {
  children: string | string[] | number;
  variant?: 'title' | 'regularText' | 'mediumText' | 'thinText';
  color?: 'gray' | 'white' | 'green' | 'red';
  fw?: 'fw-300' | 'fw-400' | 'fw-500' | 'fw-600' | 'fw-700' | 'fw-800';
  fs?: 'fs-12' | 'fs-14' | 'fs-16' | 'fs-18' | 'fs-20' | 'fs-22' | 'fs-24';
  className?: string;
};

export const Typography: React.FC<PropsType> = ({
  children,
  variant,
  color,
  fw,
  fs,
  className,
}) => {
  return (
    <div
      className={`
      ${variant && styles[variant]} 
      ${color && styles[color]}
      ${fw && styles[fw]}
      ${fs && styles[fs]}
      ${className}
      `}
    >
      {children}
    </div>
  );
};
