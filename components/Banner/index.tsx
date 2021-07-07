import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
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
    <Paper>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <Typography variant="title">{title}</Typography>
          <Typography variant="regularText" color="gray">
            {text}
          </Typography>
        </div>
        <Button>{button}</Button>
      </div>
    </Paper>
  );
};
