import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { Paper } from 'components/Paper';
import { PieChart } from 'components/PieChart';
import { PriceChangeField } from 'components/PriceChangeField';
import { Typography } from 'components/Typography';
import { formatDollar } from 'helpers/formatDollar';
import React from 'react';
import styles from './Portfolio.module.scss';

export default function Portfolio() {
  const data = {
    balance: 32.52,
    yesterdaysPNL: 2.65,
    yesterdaysPNLChange: 1.21,
    thirtydaysPNL: -8.12,
    thirtydaysPNLChange: -3.56,
  };

  return (
    <div>
      <Layout>
        <Paper className={styles.header}>
          <div className={styles.headerItem}>
            <Typography variant="mediumText" color="gray">
              Estimated Balance
            </Typography>
            <div className={styles.headerItemValueContainer}>
              <span className={styles.headerItemValue}>{formatDollar(data.balance, 20)}</span>
            </div>
          </div>
          <div className={styles.headerPnls}>
            <div className={styles.headerItem}>
              <Typography variant="mediumText" color="gray">
                Yesterday's PNL
              </Typography>
              <div className={styles.headerItemValueContainer}>
                <span className={styles.headerItemValue}>
                  {`${data.yesterdaysPNL > 0 ? '+' : ''}${formatDollar(data.yesterdaysPNL, 20)}`}
                </span>
                <PriceChangeField fs="fs-16" fw="fw-500" value={data.yesterdaysPNLChange} />
              </div>
            </div>
            <div className={styles.headerItem}>
              <Typography variant="mediumText" color="gray">
                30 day's PNL
              </Typography>
              <div className={styles.headerItemValueContainer}>
                <span className={styles.headerItemValue}>
                  {`${data.thirtydaysPNL > 0 ? '+' : ''}${formatDollar(data.thirtydaysPNL, 20)}`}
                </span>
                <PriceChangeField fs="fs-16" fw="fw-500" value={data.thirtydaysPNLChange} />
              </div>
            </div>
          </div>
        </Paper>
        <ContentLayout>
          <Paper>biba</Paper>
          <Paper>
            <PieChart />
          </Paper>
        </ContentLayout>
      </Layout>
    </div>
  );
}
