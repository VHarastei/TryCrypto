import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
import { Typography } from 'components/Typography';
import Link from 'next/link';
import React from 'react';
import styles from './Banner.module.scss';

type PropsType = {
  title: string;
  text: string;
  button: string;
  href: string;
};

export const Banner: React.FC<PropsType> = ({ title, text, button, href }) => {
  return (
    <Paper>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <Typography variant="title">{title}</Typography>
          <Typography variant="regularText" color="gray">
            {text}
          </Typography>
        </div>
        <Link href={href}>
          <a>
            <Button>{button}</Button>
          </a>
        </Link>
      </div>
    </Paper>
  );
};
