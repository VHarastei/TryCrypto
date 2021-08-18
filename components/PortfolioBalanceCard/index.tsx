import { Typography } from 'components/Typography';
import { formatPercent } from 'utils/formatPercent';
import Link from 'next/link';
import React from 'react';
import { VictoryContainer, VictoryPie } from 'victory';
import styles from './PortfolioBalanceCard.module.scss';
import { formatDollar } from 'utils/formatDollar';
import { Card } from 'components/Card';
import { PieChart, PieChartPreloader } from 'components/PieChart';
import { Asset } from 'store/slices/types';
import clsx from 'clsx';

type PropsType = {
  balance: number;
  assets: Asset[];
};

export const PortfolioBalanceCard: React.FC<PropsType> = React.memo(({ balance, assets }) => {
  console.log(assets.length);
  return (
    <Card title="Portfolio balance" withPadding>
      <div className={styles.portfolioBalanceContainer}>
        <div className={styles.portfolioBalance}>
          <Typography variant="regularText" color="gray">
            Account balance:
          </Typography>
          {balance === 0 ? (
            <div className={clsx(styles.portfolioBalanceShimmer, styles.shimmer)}></div>
          ) : (
            <Typography fw="fw-500" fs="fs-24">
              {formatDollar(balance, 20)}
            </Typography>
          )}
        </div>
        {!!assets.length ? <PieChart data={assets} /> : <PieChartPreloader />}
      </div>
    </Card>
  );
});
