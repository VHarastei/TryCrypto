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

type PropsType = {
  action: 'Buy' | 'Sell';
  currency: string;
  symbol: string;
};

export const BuySell: React.FC<PropsType> = ({ action, currency, symbol }) => {
  const { amount, setAmount, onChange } = useControlAmount(4, 2);
  const [inputCurrency, setInputCurrency] = useState<string | 'USD'>('USD');

  const switchInputCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInputCurrency(() => (inputCurrency === 'USD' ? symbol : 'USD'));
    //TODO: convert amount
    setAmount('');
  };

  //console.log(parseFloat(amount));
  return (
    <Paper>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <span className={`${styles.currency} ${amount && styles.active}`}>
            {inputCurrency === 'USD' ? '$' : symbol}
          </span>
          <input placeholder="0" value={amount} onChange={onChange} />
        </div>
        <div className={styles.switchCurrencyContainer}>
          <Button
            onClick={switchInputCurrency}
            withPadding={false}
            color="secondary"
            className={styles.switchCurrency}
          >
            <Image layout="fixed" src={swapIcon} alt={`swap icon`} width={28} height={28} />
          </Button>
          <Typography variant="thinText" color="gray">
            {inputCurrency === 'USD' ? symbol : 'USD'}
          </Typography>
        </div>
      </div>
      <div className={styles.inputTextField}>
        {amount ? (
          <Button color="secondary">Max</Button>
        ) : (
          <Typography variant="thinText" color="gray">
            You can buy up to 10,000.00
          </Typography>
        )}
      </div>
      <div className={styles.infoContainer}>
        <BuySellInfoItem action={action} currency={currency} currencyIcon={btcIcon} />
        <BuySellInfoItem
          action={action === 'Buy' ? 'Pay with' : 'Get in'}
          currency={'USD'}
          currencyIcon={usdIcon}
        />
      </div>
      <Button className={styles.button}>{action}</Button>
    </Paper>
  );
};

type BuySellInfoItemPropsType = {
  action: string;
  currency: string;
  currencyIcon: StaticImageData;
};

const BuySellInfoItem: React.FC<BuySellInfoItemPropsType> = ({
  action,
  currency,
  currencyIcon,
}) => {
  return (
    <div className={styles.infoItem}>
      <Typography className={styles.actionInfo} variant="regularText" color="gray">
        {action}
      </Typography>
      <div className={styles.currencyInfo}>
        <span>
          <Image
            layout="fixed"
            src={currencyIcon}
            alt={`${currency} icon`}
            width={30}
            height={30}
          />
          <Typography variant="regularText">{currency}</Typography>
        </span>
        <div className={styles.moreInfo}>
          <Image layout="fixed" src={moreIcon} alt={`more icon`} width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
