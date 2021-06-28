import { fetcher } from 'api';
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
  currentPage: number;
};

export default function Market({ data, currentPage }: PropsType) {
  return (
    <Layout>
      <ContentLayout>
        <MarketTable data={data} currentPage={currentPage} />
        <div>
          <RecentTransactions simplified withPadding />
        </div>
      </ContentLayout>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let currentPage = 1;
  const { page } = ctx.query;
  if (page) currentPage = +page;

  const data: TableCoin[] = await fetcher(MarketApi.getTableDataUrl(currentPage)());
  return {
    props: { data, currentPage },
  };
}
