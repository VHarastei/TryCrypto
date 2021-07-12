import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
import { useControlAmount } from 'hooks/useControlAmount';
import React, { useState } from 'react';
import styles from './BuySell.module.scss';
import Image from 'next/image';
import swapIcon from 'public/static/swap.svg';
import { Typography } from 'components/Typography';
import btcIcon from 'public/static/btc.png';
import usdIcon from 'public/static/usd.svg';
import moreIcon from 'public/static/back.svg';
import { Currency } from 'pages/market/[currencyId]';

type PropsType = {
  action: 'Buy' | 'Sell';
  currency: Currency;
};

export const BuySell: React.FC<PropsType> = ({ action, currency }) => {
  const { amount, setAmount, onChange } = useControlAmount(12, 2);
  const [inputCurrency, setInputCurrency] = useState<string | 'USD'>('USD');

  const switchInputCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInputCurrency(() => (inputCurrency === 'USD' ? currency.symbol : 'USD'));
    //TODO: convert amount
    setAmount('');
  };
  //console.log(parseFloat(amount));
  return (
    <div>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <span className={`${styles.currency} ${amount && styles.active}`}>
            {inputCurrency === 'USD' ? '$' : currency.symbol.toUpperCase()}
          </span>
          <input placeholder="0" value={amount} onChange={onChange} />
        </div>
        <div className={styles.switchCurrencyContainer}>
          <Button onClick={switchInputCurrency} color="secondary" className={styles.switchCurrency}>
            <Image layout="fixed" src={swapIcon} alt={`swap icon`} width={28} height={28} />
          </Button>
          <Typography variant="thinText" color="gray">
            {inputCurrency === 'USD' ? currency.symbol.toUpperCase() : 'USD'}
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
              <Image src={usdIcon} width={30} height={30} alt={`usd icon`} />
              <Typography variant="regularText">USD</Typography>
            </span>
          </div>
        </div>
      </div>
      <Button className={styles.button}>{action}</Button>
    </div>
  );
};
