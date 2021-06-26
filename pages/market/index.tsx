import { MarketApi, TableCoin } from 'api/marketApi';
import axios from 'axios';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketTable } from 'components/MarketTable';
import { RecentTransactions } from 'components/RecentTransactions';
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styles from './Market.module.scss';

type PropsType = {
  data: TableCoin[];
};

export default function Market({ data }: PropsType) {
  return (
    <Layout>
      <ContentLayout>
        <MarketTable data={data} />
        <div>
          <RecentTransactions simplified withPadding />
        </div>
      </ContentLayout>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data: TableCoin[] = await MarketApi.getTableData();

  return {
    props: {
      data,
    },
  };
}
