import { Layout } from 'components/Layout';
import { MarketTable } from 'components/MarketTable';
import { RecentTransaction } from 'components/RecentTransaction';
import React from 'react';
import styles from './Market.module.scss';

export default function Market() {
  return (
    <Layout>
      <div className={styles.container}>
        <MarketTable />
        <RecentTransaction simplified />
      </div>
    </Layout>
  );
}
