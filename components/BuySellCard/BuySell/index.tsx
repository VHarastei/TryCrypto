import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { useControlBuySell } from 'hooks/useControlBuySell';
import Image from 'next/image';
import loadingIcon from 'public/static/loadingMini.svg';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  selectAssetsTransactionIsLoading,
  selectUserAsset,
  selectUserAssetsIsLoading,
} from 'store/selectors';
import { fetchCreateTransaction } from 'store/slices/assetsSlice';
import { Currency } from 'store/slices/types';
import { roundDec } from 'utils/roundDec';
import { BuySellType } from '..';
import styles from './BuySell.module.scss';

type PropsType = {
  action: BuySellType;
  currency: Currency;
  currentPrice: number;
};

export type BuySellPrecision = {
  amount: number;
  total: number;
};

export const BuySell: React.FC<PropsType> = React.memo(({ action, currency, currentPrice }) => {
  const dispatch = useAppDispatch();
  const asset = useSelector(selectUserAsset(currency.id));
  const isLoading = useSelector(selectUserAssetsIsLoading);
  const isCreatingTransaction = useSelector(selectAssetsTransactionIsLoading);

  let assetAmount = asset?.amount || 0;

  const usdtAsset = useSelector(selectUserAsset('tether'));
  if (!usdtAsset) return null;

  const { amount, total, handleSetAmount, handleSetTotal, handleClear, precision } =
    useControlBuySell(action, currentPrice);

  const [error, setError] = useState(false);
  useEffect(() => {
    if (action === 'buy') {
      +total > +usdtAsset.amount.toFixed(precision.total) ? setError(true) : setError(false);
    } else {
      +amount > +assetAmount.toFixed(precision.amount) || assetAmount === 0
        ? setError(true)
        : setError(false);
    }
  }, [amount, total]);

  const handleCreateTransaction = () => {
    //!asset || --- isLoading
    if (!usdtAsset || error) return;
    const date = new Date().toISOString();
    const transaction = {
      date: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
      source: 'market' as 'market' | 'education',
      type: action.toLowerCase() as 'buy' | 'sell',
      usdValue: +(+amount * currentPrice).toFixed(2),
      amount: +amount,
      total: +(+amount * currentPrice * usdtAsset.currencyPrice).toFixed(6),
      assetId: asset?.id || null,
    };
    dispatch(fetchCreateTransaction({ currencyId: currency.id, payload: transaction }))
      //.unwrap()
      .then(() => {
        handleClear();
      });
  };

  return (
    <div>
      <div>
        <div className={styles.assetInfo}>
          <Typography color="gray" fw="fw-500">
            Available
          </Typography>
          <Typography fw="fw-500">
            {action === 'buy'
              ? `${usdtAsset.amount} ${usdtAsset.currency.symbol.toUpperCase()}`
              : `${assetAmount.toFixed(precision.amount)} ${currency.symbol.toUpperCase()}`}
          </Typography>
        </div>
        <div className={styles.assetInfo}>
          <Typography color="gray" fw="fw-500">
            Price
          </Typography>
          <Typography fw="fw-500">{`${(currentPrice * usdtAsset.currencyPrice).toFixed(
            precision.total
          )} ${usdtAsset.currency.symbol.toUpperCase()}`}</Typography>
        </div>
      </div>
      <div
        title={`Max Amount ${assetAmount}`}
        className={`${styles.inputContainer} ${
          action === 'sell' && error && styles.inputContainerError
        }`}
      >
        <Typography color="gray" fw="fw-500">
          Amount
        </Typography>
        <input
          className={styles.input}
          value={amount}
          onChange={(e) => handleSetAmount(e.target.value)}
        />
        <Typography fw="fw-500">{currency.symbol.toUpperCase()}</Typography>
      </div>

      <div className={styles.percentInputsContainer}>
        {[25, 50, 75, 100].map((item) => {
          if (action === 'buy')
            return (
              <PercentInput
                key={item}
                precentage={item}
                action={action}
                currentAmount={total}
                amount={usdtAsset.amount}
                precision={precision.total}
                onClick={handleSetTotal}
              />
            );
          else
            return (
              <PercentInput
                key={item}
                precentage={item}
                action={action}
                currentAmount={amount}
                amount={assetAmount}
                precision={precision.amount}
                onClick={handleSetAmount}
              />
            );
        })}
      </div>

      <div
        title="Your balance is not enough"
        className={`${styles.inputContainer} ${
          action === 'buy' && error && styles.inputContainerError
        }`}
      >
        <Typography color="gray" fw="fw-500">
          Total
        </Typography>
        <input
          className={styles.input}
          value={total}
          onChange={(e) => handleSetTotal(e.target.value)}
        />
        <Typography fw="fw-500">{usdtAsset.currency.symbol.toUpperCase()}</Typography>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <Typography className={styles.actionInfo} variant="regularText" color="gray">
            {action === 'buy' ? 'Buy' : 'Sell'}
          </Typography>
          <div className={styles.currencyInfo}>
            <span>
              <img src={currency.image} width={30} height={30} alt={`${currency.name} icon`} />
              <Typography variant="regularText">{currency.name}</Typography>
            </span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <Typography className={styles.actionInfo} variant="regularText" color="gray">
            {action === 'buy' ? 'Pay with' : 'Get in'}
          </Typography>
          <div className={styles.currencyInfo}>
            <span>
              <img
                src="https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707"
                width={30}
                height={30}
                alt={`Tether icon`}
              />
              <Typography variant="regularText">USDT</Typography>
            </span>
          </div>
        </div>
      </div>
      <Button
        fullWidth
        disabled={!amount || error || isLoading || isCreatingTransaction}
        isLoading={isLoading || isCreatingTransaction}
        className={action === 'buy' ? styles.actionBuyActive : styles.actionSellActive}
        onClick={handleCreateTransaction}
      >
        {action[0].toUpperCase() + action.slice(1)}
      </Button>
    </div>
  );
});
type PercentInputPropsType = {
  precentage: number;
  currentAmount: string;
  amount: number;
  precision: number;
  action: BuySellType;
  onClick: (val: string) => void;
};

const PercentInput: React.FC<PercentInputPropsType> = React.memo(
  ({ precentage, currentAmount, amount, precision, action, onClick }) => {
    const newAmount = roundDec(amount * (precentage / 100), precision);
    return (
      <div className={styles.percentInput}>
        <input
          className={`${action === 'buy' ? styles.percentInputBuy : styles.percentInputSell} ${
            +newAmount <= +currentAmount
              ? action === 'buy'
                ? styles.percentInputBuyActive
                : styles.percentInputSellActive
              : ''
          }`}
          type="button"
          onClick={() => onClick(`${newAmount}`)}
        />
        <label>{`${precentage}%`}</label>
      </div>
    );
  }
);
