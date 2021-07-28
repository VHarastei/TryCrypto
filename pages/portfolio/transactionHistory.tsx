import { Api } from 'api';
import { Card } from 'components/Card';
import { Layout } from 'components/Layout';
import { TransactionHistoryTable } from 'components/TransactionHistoryTable';
import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from 'store';
import { selectUserTransactionHistory } from 'store/selectors';
import { setUserTransactionHistory } from 'store/slices/userSlice';

export default function TransactionHistory() {
  const data = useSelector(selectUserTransactionHistory);

  //if (!data) return <div>nema</div>;
  //console.log(data.items[0]);

  return (
    <Layout>
      <Card title="Transaction History">
        <TransactionHistoryTable data={data.items} />
      </Card>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      try {
        let currentPage = 0;
        let currentSize = 20;
        const { size, page } = query;
        if (size) currentSize = +size;
        if (page) currentPage = +page;

        const data = await Api().getUserTransactionHistory({
          size: currentSize,
          page: currentPage,
        });
        store.dispatch(setUserTransactionHistory(data));

        return {
          props: {},
        };
      } catch (err) {
        console.log(err);
        return {
          props: {},
        };
      }
    }
);
