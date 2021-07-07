import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { format, parseISO, formatISO } from 'date-fns';
import Image from 'next/image';
import boughtIcon from 'public/static/bought.svg';
import soldIcon from 'public/static/sold.png';
import React from 'react';
import styles from './RecentTransaction.module.scss';

type PropsType = {
  simplified?: boolean;
  withPadding?: boolean;
  currency?: string;
};

type Transaction = {
  date: string;
  type: 'bought' | 'sold';
  currency: string;
  symbol: string;
  source: string;
  amount: number;
  price: number;
};

export const RecentTransactions: React.FC<PropsType> = ({ simplified, withPadding, currency }) => {
  //request for transactions of actual currency

  const transactions: Transaction[] = [
    {
      date: formatISO(Date.now()),
      type: 'bought',
      currency: 'Bitcoin',
      symbol: 'BTC',
      source: 'education',
      amount: 5.10533,
      price: 1218.77,
    },
    {
      date: formatISO(Date.now()),
      type: 'sold',
      currency: 'Bitcoin',
      symbol: 'BTC',
      source: 'market',
      amount: 1.34132,
      price: 3324.12,
    },
  ];

  return (
    <Card
      title={currency ? `Balance: 6.10537 BTC` : 'Recent transactions'}
      withPadding={withPadding}
    >
      <div>
        {currency ? (
          <div>
            {transactions.map((txn) => {
              return <Transaction {...txn} />;
            })}
          </div>
        ) : (
          <Typography variant="regularText">
            You don’t own any crypto. Buy some crypto to get started.
          </Typography>
        )}
      </div>
    </Card>
  );
};

const Transaction: React.FC<Transaction> = ({
  date,
  type,
  currency,
  symbol,
  source,
  amount,
  price,
}) => {
  const parsedDate = parseISO(date);
  const month = format(parsedDate, 'MMM').toUpperCase();
  const day = format(parsedDate, 'd');

  return (
    <div className={styles.transactionContainer}>
      <div className={styles.nameContainer}>
        <div className={styles.date}>
          <Typography variant="thinText" color="gray">
            {month}
          </Typography>
          <Typography variant="regularText">{day}</Typography>
        </div>
        <Image
          layout="fixed"
          src={type === 'bought' ? boughtIcon : soldIcon}
          alt={`transaction type icon`}
          width={36}
          height={36}
        />
        <div>
          <Typography variant="regularText">{`${
            type === 'bought' ? 'Bought' : 'Sold'
          } ${currency}`}</Typography>
          <Typography variant="thinText" color="gray">
            {`${type === 'bought' ? 'From' : 'To'} ${source}`}
          </Typography>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <Typography variant="regularText">{`${
          type === 'bought' ? '+' : '-'
        }${amount} ${symbol}`}</Typography>
        <Typography variant="thinText" color="gray">
          {`${type === 'bought' ? '+' : '-'}$${price} `}
        </Typography>
      </div>
    </div>
  );
};
