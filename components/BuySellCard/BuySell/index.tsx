import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { useControlAmount } from 'hooks/useControlAmount';
import Image from 'next/image';
import { Currency } from 'pages/market/[currencyId]';
import swapIcon from 'public/static/swap.svg';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserAsset } from 'store/selectors';
import { Transaction } from 'store/slices/userSlice';
import styles from './BuySell.module.scss';

type PropsType = {
  action: 'Buy' | 'Sell';
  currency: Currency;
};

export const BuySell: React.FC<PropsType> = ({ action, currency }) => {
  const { amount, setAmount, onChange } = useControlAmount(12, 2);
  const [inputCurrency, setInputCurrency] = useState<string | 'USDT'>('USDT');

  const switchInputCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInputCurrency(() => (inputCurrency === 'USDT' ? currency.symbol : 'USDT'));
    //TODO: convert amount
    setAmount('');
  };

  const asset = useSelector(selectUserAsset(currency.id));
  const usdtAsset = useSelector(selectUserAsset('tether'));
  //console.log(asset);
  const handleCreateTransaction = () => {
    if (!asset || !usdtAsset) return;
    const date = new Date().toISOString();
    const transaction = {
      date: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
      source: 'market',
      type: action.toLowerCase(),
      usdValue: +amount * asset.currencyPrice, // take price form props
      amount: +amount,
      total: +amount * asset.currencyPrice * usdtAsset.currencyPrice,
      assetId: asset.id,
    };
    console.log(transaction);
  };
  return (
    <div>
      <div className={styles.inputContainer}>
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
      </div>
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
            {action === 'Buy' ? 'Pay with' : 'Get in'}
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
      <Button fullWidth disabled={!!!amount || !asset} onClick={handleCreateTransaction}>
        {action}
      </Button>
    </div>
  );
};
