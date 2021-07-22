import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { useControlAmount } from 'hooks/useControlAmount';
import Image from 'next/image';
import { Currency } from 'pages/market/[currencyId]';
import swapIcon from 'public/static/swap.svg';
import React, { useState } from 'react';
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
  const { amount, setAmount, onChange } = useControlAmount(12, 2);
  const [inputCurrency, setInputCurrency] = useState<string | 'USDT'>('USDT');
  const dispatch = useDispatch();
  const switchInputCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInputCurrency(() => (inputCurrency === 'USDT' ? currency.symbol : 'USDT'));
    //TODO: convert amount
    setAmount('');
  };

  const asset = useSelector(selectUserAsset(currency.id));
  const usdtAsset = useSelector(selectUserAsset('tether'));
  //console.log(asset);
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

  if (!usdtAsset) return null;

  return (
    <div>
      <div>
        <div className={styles.assetInfo}>
          <Typography color="gray" fw="fw-500">
            Available
          </Typography>
          <Typography fw="fw-500">{`${
            usdtAsset.amount
          } ${usdtAsset.currency.symbol.toUpperCase()}`}</Typography>
        </div>
        <div className={styles.assetInfo}>
          <Typography color="gray" fw="fw-500">
            Price
          </Typography>
          <Typography fw="fw-500">{`${(currentPrice * usdtAsset.currencyPrice).toFixed(
            2
          )} ${usdtAsset.currency.symbol.toUpperCase()}`}</Typography>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <Typography color="gray" fw="fw-500">
          Amount
        </Typography>
        <input className={styles.input} />
        <Typography fw="fw-500">{usdtAsset.currency.symbol.toUpperCase()}</Typography>
      </div>
      {/* <div className={styles.inputContainer}>
        <div className={styles.input}>
          <span className={`${styles.currency} ${amount && styles.active}`}>
            {inputCurrency === 'USDT' ? 'USDT' : currency.symbol.toUpperCase()}
          </span>
          <input placeholder="0" value={amount} onChange={onChange} />
        </div>
        <div className={styles.switchCurrencyContainer}>
          <Button onClick={switchInputCurrency} color="secondary" className={styles.switchCurrency}>
            <Image layout="fixed" src={swapIcon} alt={`swap icon`} width={28} height={28} />
          </Button>
          <Typography variant="thinText" color="gray">
            {inputCurrency === 'USDT' ? currency.symbol.toUpperCase() : 'USDT'}
          </Typography>
        </div>
      </div>
      <div className={styles.inputTextField}>
        {amount ? (
          <Button color="secondary">Max</Button>
        ) : (
          <Typography variant="thinText" color="gray">
            Amount is a required
          </Typography>
        )}
      </div> */}
      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <Typography className={styles.actionInfo} variant="regularText" color="gray">
            {action}
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
      <Button fullWidth disabled={!amount} onClick={handleCreateTransaction}>
        {/* || !asset */}
        {action}
      </Button>
    </div>
  );
};
