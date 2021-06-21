import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketTable } from 'components/MarketTable';
import { RecentTransaction } from 'components/RecentTransaction';
import React from 'react';
import styles from './Market.module.scss';

export default function Market() {
  return (
    <Layout>
      <ContentLayout>
        <MarketTable />
        <RecentTransaction simplified />
      </ContentLayout>
    </Layout>
  );
}
