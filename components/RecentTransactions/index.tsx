import clsx from 'clsx';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Transaction } from 'store/slices/types';
import styles from './RecentTransaction.module.scss';

type PropsType = {
  withPadding?: boolean;
  transactions?: Transaction[];
};

export const RecentTransactions: React.FC<PropsType> = React.memo(function RecentTransactions({
  transactions,
  withPadding,
}) {
  return (
    <Card title={'Recent transactions'} withPadding={withPadding}>
      <div>
        {transactions && transactions.length ? (
          <div>
            {transactions.map((txn) => {
              return <TransactionItem key={txn.id} {...txn} />;
            })}
            <Link href="/portfolio/transactionHistory">
              <a className={styles.btnContainer}>
                <Button color="secondary">See transaction history</Button>
              </a>
            </Link>
          </div>
        ) : (
          <div className={styles.withPadding}>
            <Typography variant="regularText">
              You don`t have any transactions. Buy some crypto to see your recent transactions.
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
});

export const TransactionItem: React.FC<Transaction> = React.memo(function TransactionItem({
  date,
  type,
  source,
  amount,
  usdValue,
  asset,
}) {
  const parsedDate = parseISO(date);
  const month = format(parsedDate, 'MMM').toUpperCase();
  const day = format(parsedDate, 'd');

  return (
    <div className={styles.transactionContainer}>
      <div className={styles.nameContainer}>
        <div className={styles.actionType}>
          {type === 'buy' ? 'Buy' : type === 'sell' ? 'Sell' : 'Rec'}
        </div>
        <div className={styles.date}>
          <Typography variant="thinText">{month}</Typography>
          <Typography variant="regularText" color="gray">
            {day}
          </Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="regularText">{`${
            type === 'buy' ? 'Bought' : type === 'receive' ? 'Received' : 'Sold'
          } ${asset.currency.name}`}</Typography>
          <Typography variant="thinText" color="gray">
            {`${type === 'buy' || type === 'receive' ? 'From' : 'To'} ${source}`}
          </Typography>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <Typography variant="regularText">{`${
          type === 'sell' ? '-' : '+'
        }${amount} ${asset.currency.symbol.toUpperCase()}`}</Typography>
        <Typography variant="thinText" color="gray">
          {`${type === 'buy' ? '-' : '+'}$${usdValue} `}
        </Typography>
      </div>
    </div>
  );
});

export const TransactionItemPreloader = React.memo(function TransactionItemPreloader() {
  return (
    <div className={styles.transactionContainer}>
      <div className={clsx(styles.actionTypeShimmer, styles.shimmer)}></div>
      <div className={clsx(styles.contentShimmer, styles.shimmer)}></div>
    </div>
  );
});
