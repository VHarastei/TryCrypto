import { Paper } from 'components/Paper';
import React from 'react';
import { BuySell } from './BuySell';
import styles from './BuySellCard.module.scss';

type PropsType = {
  currency: string;
  symbol: string;
};

export const BuySellCard: React.FC<PropsType> = ({ currency, symbol }) => {
  const [tab, setTab] = React.useState<'buy' | 'sell'>('buy');
  const handleChangeTab = (newTab: 'buy' | 'sell') => {
    setTab(newTab);
  };

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
          <BuySell action="Buy" currency={currency} symbol={symbol} />
        ) : (
          <BuySell action="Sell" currency={currency} symbol={symbol} />
        )}
      </div>
    </Paper>
  );
};
