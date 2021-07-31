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

export const RecentTransactions: React.FC<PropsType> = React.memo(
  ({ transactions, withPadding }) => {
    return (
      <Card title={'Recent transactions'} withPadding={withPadding}>
        <div>
          {transactions ? (
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
            <Typography variant="regularText">
              You don’t own any crypto. Buy some crypto to get started.
            </Typography>
          )}
        </div>
      </Card>
    );
  }
);

export const TransactionItem: React.FC<Transaction> = React.memo(
  ({ date, type, source, amount, usdValue, asset }) => {
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
          <div>
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
            type === 'buy' ? '+' : '-'
          }${amount} ${asset.currency.symbol.toUpperCase()}`}</Typography>
          <Typography variant="thinText" color="gray">
            {`${type === 'buy' ? '-' : '+'}$${usdValue} `}
          </Typography>
        </div>
      </div>
    );
  }
);
