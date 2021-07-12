import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { format, parseISO, formatISO } from 'date-fns';
import Image from 'next/image';
import { Currency } from 'pages/market/[currencyId]';
import boughtIcon from 'public/static/bought.svg';
import soldIcon from 'public/static/sold.png';
import React from 'react';
import styles from './RecentTransaction.module.scss';

type PropsType = {
  withPadding?: boolean;
  currency?: Currency;
};

type Transaction = {
  date: string;
  type: 'buy' | 'sell' | 'receive';
  currencyName: string;
  currencySymbol: string;
  source: string;
  amount: number;
  price: number;
};

export const RecentTransactions: React.FC<PropsType> = ({ withPadding, currency }) => {
  //request for transactions of actual currency

  const transactions: Transaction[] = [
    {
      date: formatISO(Date.now()),
      type: 'receive',
      currencyName: 'Bitcoin',
      currencySymbol: 'BTC',
      source: 'education',
      amount: 5.105334,
      price: 1218.77,
    },
    {
      date: formatISO(Date.now()),
      type: 'buy',
      currencyName: 'Bitcoin',
      currencySymbol: 'BTC',
      source: 'market',
      amount: 0.123414,
      price: 248.41,
    },
    {
      date: formatISO(Date.now()),
      type: 'sell',
      currencyName: 'Bitcoin',
      currencySymbol: 'BTC',
      source: 'market',
      amount: 1.341321,
      price: 3324.12,
    },
  ];

  return (
    <Card
      title={currency ? () => <RTTitle currency={currency} /> : 'Recent transactions'}
      withPadding={withPadding}
    >
      <div>
        {transactions ? (
          <div>
            {transactions.map((txn, index) => {
              return <Transaction key={txn.date + index} {...txn} />;
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

type RTTitlePropsType = {
  currency: Currency;
};

const RTTitle: React.FC<RTTitlePropsType> = ({ currency }) => {
  return (
    <div className={styles.rTTitle}>
      <Typography variant="title">{`Recent ${currency.name} transactions`}</Typography>
      <Typography variant="title">{`Balance: ${'6.452131'} ${currency.symbol.toLocaleUpperCase()}`}</Typography>
    </div>
  );
};

const Transaction: React.FC<Transaction> = ({
  date,
  type,
  currencyName,
  currencySymbol,
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
          } ${currencyName}`}</Typography>
          <Typography variant="thinText" color="gray">
            {`${type === 'buy' || type === 'receive' ? 'From' : 'To'} ${source}`}
          </Typography>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <Typography variant="regularText">{`${
          type === 'buy' ? '+' : '-'
        }${amount} ${currencySymbol}`}</Typography>
        <Typography variant="thinText" color="gray">
          {`${type === 'buy' ? '+' : '-'}$${price} `}
        </Typography>
      </div>
    </div>
  );
};
