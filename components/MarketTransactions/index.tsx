import { unwrapResult } from '@reduxjs/toolkit';
import { Card } from 'components/Card';
import { Preloader } from 'components/Preloader';
import { TransactionItem } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import { format, parseISO } from 'date-fns';
import { Currency } from 'pages/market/[currencyId]';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  selectUserMarketAsset,
  selectUserMarketAssetIsError,
  selectUserMarketAssetIsLoading,
  selectUserMarketAssetIsNever,
} from 'store/selectors';
import { fetchUserMarketAsset, MarketAsset, Transaction } from 'store/slices/userSlice';
import styles from './MarketTransactions.module.scss';

type PropsType = {
  currency: Currency;
};

export const MarketTransactions: React.FC<PropsType> = ({ currency }) => {
  //request for transactions of actual currency
  const dispatch = useAppDispatch();
  const asset = useSelector(selectUserMarketAsset);
  const isLoading = useSelector(selectUserMarketAssetIsLoading);
  const isNever = useSelector(selectUserMarketAssetIsNever);
  const isError = useSelector(selectUserMarketAssetIsError);
  let transactions;

  if (asset) {
    transactions = asset.transactions.map((txn) => {
      const { transactions, ...rest } = asset;
      return { ...txn, asset: rest };
    });
  }

  useEffect(() => {
    if (currency && !asset && !isError) dispatch(fetchUserMarketAsset(currency.id));
  }, []);

  // if (currency) {
  //   dispatch(fetchUserMarketAsset(currency.id))
  //     .unwrap()
  //     .then((res) => {
  //       transactions = res.transactions.map((txn) => {
  //         const { transactions, ...rest } = res;
  //         return { ...txn, asset: rest };
  //       });
  //     });
  // }
  // console.log(transactions);

  if (isNever || isLoading)
    return (
      <div>
        <Preloader />
      </div>
    );

  return (
    <Card
      title={() => <RTTitle currency={currency} amount={asset?.amount} />}
      // withPadding={withPadding}
    >
      <div>
        {transactions ? (
          <div>
            {transactions.map((txn) => {
              return <TransactionItem key={txn.id} {...txn} />;
            })}
          </div>
        ) : (
          <Typography variant="regularText" className={styles.errorContainer}>
            {`You don’t own ${currency.name}. Buy some to see recent transactions.`}
          </Typography>
        )}
      </div>
    </Card>
  );
};

type RTTitlePropsType = {
  currency: Currency;
  amount?: number;
};

const RTTitle: React.FC<RTTitlePropsType> = ({ currency, amount = 0 }) => {
  return (
    <div className={styles.rTTitle}>
      <Typography variant="title">{`Recent ${currency.name} transactions`}</Typography>
      <Typography variant="title">{`Balance: ${amount} ${currency.symbol.toLocaleUpperCase()}`}</Typography>
    </div>
  );
};
