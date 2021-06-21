import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
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
    <div className={`${styles.container} ${className} ${withPadding ? styles.withPadding : ''}`}>
      <div>
        <div className={`${withPadding ? '' : styles.padding}`}>
          {typeof title === 'string' ? <Typography>{title}</Typography> : <Title />}
        </div>
        <Divider fullWidth={withPadding} />
        {children}
      </div>
      {button && (
        <div>
          <Divider />
          <div className={styles.button}>
            <Button color="secondary">{button.name}</Button>
          </div>
        </div>
      )}
    </div>
  );
};
