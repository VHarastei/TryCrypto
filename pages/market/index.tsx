import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketTable } from 'components/MarketTable';
import { RecentTransactions } from 'components/RecentTransactions';
import React from 'react';
import styles from './Market.module.scss';

export default function Market() {
  return (
    <Layout>
      <ContentLayout>
        <MarketTable />
        <div>
          <RecentTransactions simplified withPadding />
        </div>
      </ContentLayout>
    </Layout>
  );
}
