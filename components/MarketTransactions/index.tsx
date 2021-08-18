import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { TransactionItem, TransactionItemPreloader } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { selectAssetsTransactionIsLoading, selectUserAsset } from 'store/selectors';
import { fetchAssetTransactions, fetchUserAsset } from 'store/slices/assetsSlice';
import { Currency } from 'store/slices/types';
import { formatDollar } from 'utils/formatDollar';
import styles from './MarketTransactions.module.scss';

type PropsType = {
  currency: Currency;
};

export const MarketTransactions: React.FC<PropsType> = React.memo(function MarketTransactions({
  currency,
}) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const asset = useSelector(selectUserAsset(currency.id));
  const creatingTransaction = useSelector(selectAssetsTransactionIsLoading);

  let transactions;
  if (asset?.transactions.items) {
    transactions = asset.transactions.items.map((txn) => {
      const { transactions, ...rest } = asset;
      return { ...txn, asset: rest };
    });
  }
  useEffect(() => {
    if (asset) dispatch(fetchUserAsset(currency.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (asset) {
      setPage((prev) => prev + 1);
      dispatch(
        fetchAssetTransactions({ currencyId: currency.id, page, size: 7, assetId: `${asset.id}` })
      ); // TODO: make assetId UUID!!!
    }
  };

  return (
    <Card title={<RTTitle currency={currency} amount={asset?.amount} usdValue={asset?.usdValue} />}>
      <div>
        {transactions ? (
          transactions.length ? (
            <div>
              {creatingTransaction && <TransactionItemPreloader />}
              {transactions.map((txn, index) => {
                if (creatingTransaction) {
                  if (index < 6) return <TransactionItem key={txn.id} {...txn} />;
                } else return <TransactionItem key={txn.id} {...txn} />;
              })}
              {asset?.transactions.totalPages && asset.transactions.totalPages > page ? (
                <div className={styles.btnContainer}>
                  <Button color="secondary" onClick={handleLoadMore}>
                    Load more
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <TransactionItemPreloader />
              <TransactionItemPreloader />
              <TransactionItemPreloader />
            </div>
          )
        ) : (
          <Typography variant="regularText" className={styles.errorContainer}>
            {`You don’t own ${currency.name}. Buy some to see recent transactions.`}
          </Typography>
        )}
      </div>
    </Card>
  );
});

type RTTitlePropsType = {
  currency: Currency;
  amount?: number;
  usdValue?: number;
};

const RTTitle: React.FC<RTTitlePropsType> = React.memo(function RTTitle({
  currency,
  amount = 0,
  usdValue = 0.0,
}) {
  return (
    <div className={styles.rTTitle}>
      <Typography variant="title">{`${currency.name} transactions`}</Typography>
      <Typography variant="title">{`Balance: ${amount} ${currency.symbol.toLocaleUpperCase()} (${formatDollar(
        usdValue,
        20
      )})`}</Typography>
    </div>
  );
});
