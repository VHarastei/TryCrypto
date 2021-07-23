import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { useControlInput } from 'hooks/useControlInput';
import Image from 'next/image';
import { Currency } from 'pages/market/[currencyId]';
import swapIcon from 'public/static/swap.svg';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAsset } from 'store/selectors';
import { fetchCreateTransaction, Transaction } from 'store/slices/userSlice';
import { BuySellType } from '..';
import styles from './BuySell.module.scss';

type PropsType = {
  action: BuySellType;
  currency: Currency;
  currentPrice: number;
};

export const BuySell: React.FC<PropsType> = ({ action, currency, currentPrice }) => {
  const dispatch = useDispatch();
  const asset = useSelector(selectUserAsset(currency.id));
  let assetAmount = asset?.amount || 0;
  const usdtAsset = useSelector(selectUserAsset('tether'));
  if (!usdtAsset) return null;

  const precision = currentPrice > 0.01 ? { amount: 6, total: 2 } : { amount: 0, total: 8 };
  const { value: amount, onChange: onChangeAmount } = useControlInput(20, precision.amount);
  const { value: total, onChange: onChangeTotal } = useControlInput(20, precision.total);

  useEffect(() => {
    handleSetAmount('');
  }, [action]);

  const handleSetAmount = (val: string) => {
    onChangeAmount(val);
    const newTotal = +val * currentPrice;
    onChangeTotal(newTotal > 0 ? newTotal.toFixed(precision.total) : '');
  };
  const handleSetTotal = (val: string) => {
    onChangeTotal(val);
    const newAmount = +val / currentPrice;
    onChangeAmount(newAmount > 0 ? newAmount.toFixed(precision.amount) : '');
  };

  const handleCreateTransaction = () => {
    //!asset || --- isLoading
    if (!usdtAsset) return;
    const date = new Date().toISOString();
    const transaction = {
      date: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
      source: 'market' as 'market' | 'education',
      type: action.toLowerCase() as 'buy' | 'sell',
      usdValue: +(+amount * currentPrice).toFixed(2), // take price form props
      amount: +amount,
      total: +(+amount * currentPrice * usdtAsset.currencyPrice).toFixed(6),
      assetId: asset?.id || null,
    };
    console.log(transaction);
    dispatch(fetchCreateTransaction({ currencyId: currency.id, payload: transaction }));
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
      <div className={styles.inputContainer}>
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

      <div className={styles.inputContainer}>
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
        disabled={!amount}
        className={action === 'buy' ? styles.actionBuyActive : styles.actionSellActive}
        onClick={handleCreateTransaction}
      >
        {/* || !asset */}
        {action.toUpperCase()}
      </Button>
    </div>
  );
};

type PercentInputPropsType = {
  precentage: number;
  currentAmount: string;
  amount: number;
  precision: number;
  action: BuySellType;
  onClick: (val: string) => void;
};

const PercentInput: React.FC<PercentInputPropsType> = ({
  precentage,
  currentAmount,
  amount,
  precision,
  action,
  onClick,
}) => {
  const newAmount = (amount * (precentage / 100)).toFixed(precision);
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
        onClick={() => onClick(newAmount)}
      />
      <label>{`${precentage}%`}</label>
    </div>
  );
};
