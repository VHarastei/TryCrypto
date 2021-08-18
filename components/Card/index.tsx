import clsx from 'clsx';
import { Typography } from 'components/Typography';
import React from 'react';
import styles from './Card.module.scss';

type PropsType = {
  children: React.ReactNode;
  title: any; //string | Element;
  button?: {
    name: string;
    href: string;
  };
  className?: string;
  withPadding?: boolean;
  transparent?: boolean;
};

export const Card: React.FC<PropsType> = React.memo(function Card({
  children,
  title,
  withPadding,
  transparent,
  className,
}) {
  //const Title = title;
  // <Title />

  return (
    <div className={clsx(className, styles.container, transparent && styles.transparent)}>
      <div>
        <div className={clsx(styles.title, transparent && styles.transparentTitle)}>
          {typeof title === 'string' ? <Typography variant="title">{title}</Typography> : title}
        </div>
        <div className={clsx(withPadding && styles.withPadding)}>{children}</div>
      </div>
    </div>
  );
});
