import clsx from 'clsx';
import { Paper } from 'components/Paper';
import React from 'react';
import { Currency } from 'store/slices/types';
import { BuySell } from './BuySell';
import styles from './BuySellCard.module.scss';

type PropsType = {
  currency: Currency;
  currentPrice: number;
};

export type BuySellType = 'buy' | 'sell';

export const BuySellCard: React.FC<PropsType> = React.memo(function BuySellCard({
  currency,
  currentPrice,
}) {
  const [action, setAction] = React.useState<BuySellType>('buy');
  const handleChangeAction = (newAction: BuySellType) => {
    setAction(newAction);
  };

  return (
    <Paper className={styles.container}>
      <div className={styles.actionsContainer}>
        <div
          onClick={() => handleChangeAction('buy')}
          className={clsx(
            styles.action,
            styles.actionBuy,
            action === 'buy' && styles.actionBuyActive
          )}
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
          className={clsx(
            styles.action,
            styles.actionSell,
            action === 'sell' && styles.actionSellActive
          )}
        >
          SELL
        </div>
      </div>

      <BuySell action={action} currency={currency} currentPrice={currentPrice} />
    </Paper>
  );
});
