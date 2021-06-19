import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import React from 'react';
import styles from './Banner.module.scss';

type PropsType = {
  title: string;
  text: string;
  button: string;
};

export const Banner: React.FC<PropsType> = ({ title, text, button }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Typography>{title}</Typography>
        <Typography variant="text" color="gray">
          {text}
        </Typography>
      </div>
      <Button>{button}</Button>
    </div>
  );
};
