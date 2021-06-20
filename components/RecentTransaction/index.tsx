import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import React from 'react';
import styles from './RecentTransaction.module.scss';

type PropsType = {
  simplified?: boolean;
};

export const RecentTransaction: React.FC<PropsType> = ({ simplified }) => {
  return (
    <Card
      title="Recent transactions"
      button={simplified ? undefined : { name: 'View portfolio', href: '/' }}
      className={simplified ? styles.simplified : ''}
    >
      <div className={styles.recentTransactions}>
        <Typography variant="text">
          You don’t own any crypto. Buy some crypto to get started.
        </Typography>
      </div>
    </Card>
  );
};
