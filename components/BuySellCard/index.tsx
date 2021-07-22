import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
import { Currency } from 'pages/market/[currencyId]';
import React from 'react';
import { BuySell } from './BuySell';
import styles from './BuySellCard.module.scss';

type PropsType = {
  currency: Currency;
  currentPrice: number;
};

export type BuySellType = 'buy' | 'sell';

export const BuySellCard: React.FC<PropsType> = ({ currency, currentPrice }) => {
  const [action, setAction] = React.useState<BuySellType>('buy');
  const handleChangeAction = (newAction: BuySellType) => {
    setAction(newAction);
  };

  return (
    <Paper className={styles.container}>
      <div className={styles.actionsContainer}>
        <div
          onClick={() => handleChangeAction('buy')}
          className={`${styles.action} ${styles.actionBuy} ${
            action === 'buy' && styles.actionBuyActive
          }`}
        >
          BUY
        </div>
        <div className={styles.actionDivider}>
          <div className={styles.actionDividerOuter}>
            <div
              className={
                action === 'buy' ? styles.actionDividerInnerBuy : styles.actionDividerInnerSell
              }
            ></div>
          </div>
        </div>
        <div
          onClick={() => handleChangeAction('sell')}
          className={`${styles.action} ${styles.actionSell} ${
            action === 'sell' && styles.actionSellActive
          }`}
        >
          SELL
        </div>
      </div>

      <BuySell action={action} currency={currency} currentPrice={currentPrice} />
    </Paper>
  );
};
