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
};

export const Card: React.FC<PropsType> = ({ children, title, button, withPadding, className }) => {
  const Title = title;

  return (
    <div className={`${styles.container} ${className}`}>
      <div>
        <div className={`${styles.title} ${withPadding ? '' : ''}`}>
          {typeof title === 'string' ? <Typography variant="title">{title}</Typography> : <Title />}
        </div>
        <div className={`${withPadding ? styles.withPadding : ''}`}>{children}</div>
      </div>
      {button && (
        <div className={styles.button}>
          <Button color="secondary">{button.name}</Button>
        </div>
      )}
    </div>
  );
};
