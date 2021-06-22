import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import React from 'react';
import styles from './RecentTransaction.module.scss';
import Image from 'next/image';
import boughtIcon from 'public/static/bought.svg';
import { formatISO } from 'date-fns/esm';
import { add, format, parseISO, toDate } from 'date-fns';

type PropsType = {
  simplified?: boolean;
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

export const RecentTransactions: React.FC<PropsType> = ({ simplified, currency }) => {
  //request for transactions of actual currency

  const transactions: Transaction[] = [
    {
      date: formatISO(Date.now()),
      type: 'bought',
      currency: 'Stellar Lumens',
      symbol: 'XLM',
      source: 'market',
      amount: 56.10533,
      price: 18.77,
    },
    {
      date: formatISO(add(Date.now(), { days: 4 })),
      type: 'sold',
      currency: 'Stellar Lumens',
      symbol: 'XLM',
      source: 'market',
      amount: 21.34132,
      price: 9.12,
    },
  ];

  return (
    <Card
      title={currency ? `Balance: 56.10537 XLM` : 'Recent transactions'}
      button={simplified ? undefined : { name: 'View portfolio', href: '/' }}
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

const Transaction: React.FC<Transaction> = ({ date, type, currency, symbol, source, amount }) => {
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
        {/* check transaction type and display correct photo*/}
        <Image layout="fixed" src={boughtIcon} alt={`btc icon`} width={36} height={36} />
        <div>
          <Typography variant="regularText">Bought Stellar Lumens</Typography>
          <Typography variant="thinText" color="gray">
            From market
          </Typography>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <Typography variant="regularText">+56.1053 XLM</Typography>
        <Typography variant="thinText" color="gray">
          +$18.77
        </Typography>
      </div>
    </div>
  );
};
