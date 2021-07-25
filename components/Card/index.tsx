import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import React from 'react';
import styles from './Card.module.scss';

type PropsType = {
  children: React.ReactNode;
  title: string | React.FC;
  button?: {
    name: string;
    href: string;
  };
  className?: string;
  withPadding?: boolean;
  transparent?: boolean;
};

export const Card: React.FC<PropsType> = React.memo(
  ({ children, title, withPadding, transparent, className }) => {
    const Title = title;

    return (
      <div className={`${transparent ? styles.transparent : ''} ${styles.container} ${className}`}>
        <div>
          <div className={`${styles.title} ${transparent ? styles.transparentTitle : ''}`}>
            {typeof title === 'string' ? (
              <Typography variant="title">{title}</Typography>
            ) : (
              <Title />
            )}
          </div>
          <div className={`${withPadding ? styles.withPadding : ''}`}>{children}</div>
        </div>
      </div>
    );
  }
);
