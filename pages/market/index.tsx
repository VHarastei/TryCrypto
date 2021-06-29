import { fetcher } from 'api';
import { ListCoin, MarketApi, TableCoin } from 'api/marketApi';
import axios from 'axios';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketSearchBar } from 'components/MarketSearchBar';
import { MarketTable } from 'components/MarketTable';
import { Paper } from 'components/Paper';
import { RecentTransactions } from 'components/RecentTransactions';
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styles from './Market.module.scss';

type PropsType = {
  data: TableCoin[];
  coinsList: ListCoin[];
  currentPage: number;
};

export default function Market({ data, coinsList, currentPage }: PropsType) {
  return (
    <Layout>
      <ContentLayout>
        <Paper>
          <MarketSearchBar coinsList={coinsList} />
          <MarketTable data={data} currentPage={currentPage} />
        </Paper>
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

  try {
    //const data: TableCoin[] = await fetcher(MarketApi.getTableDataUrl(currentPage)());
    const [data, coinsList] = await Promise.all([
      fetcher(MarketApi.getTableDataUrl(currentPage)()),
      fetcher(MarketApi.getCoinsListUrl()),
    ]);

    return {
      props: { data, coinsList, currentPage },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { data: [], coinsList: [], currentPage },
    };
  }
}
