import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
import { Typography } from 'components/Typography';
import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { controlAmount } from 'utils/controlAmount';
import styles from './BuySell.module.scss';

type PropsType = {};

export const BuySell: React.FC<PropsType> = ({}) => {
  const [tab, setTab] = React.useState<'buy' | 'sell'>('buy');
  const handleChangeTab = (newTab: 'buy' | 'sell') => {
    setTab(newTab);
  };

  const [amount, setAmount] = React.useState<string>('');
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val[val.length - 1] === ' ' || isNaN(+val)) return;

    const arr = val.split('.');
    if (arr[0].length < 4) {
      if (arr.length > 1) {
        if (arr[1].length < 3) {
          setAmount(val);
        }
      } else setAmount(val);
    }
    // if(typeof e.target.value !== undefined) {

    //   setAmount(controlAmount(e.target.value, 3, 2));
    // }
  };
  console.log(amount.length);
  return (
    <Paper>
      <div className={styles.tabs}>
        <div
          onClick={() => handleChangeTab('buy')}
          className={`${styles.tab} ${styles.buyTab} ${tab === 'buy' ? styles.active : ''}`}
        >
          Buy
        </div>
        <div
          onClick={() => handleChangeTab('sell')}
          className={`${styles.tab} ${styles.sellTab} ${tab === 'sell' ? styles.active : ''}`}
        >
          Sell
        </div>
      </div>
      <div className={styles.content}>
        {tab === 'buy' ? (
          <div className={styles.buy}>
            <div className={styles.inputContainer}>
              <input placeholder="0" value={amount} onChange={handleChangeAmount} />
              <div className={styles.switchCurrency}>biba</div>
            </div>
          </div>
        ) : (
          <div>sell</div>
        )}
      </div>
    </Paper>
  );
};
