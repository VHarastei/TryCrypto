import { Api } from 'api';
import { Card } from 'components/Card';
import { Layout } from 'components/Layout';
import { Pagination } from 'components/Pagination';
import { Preloader } from 'components/Preloader';
import { TransactionHistory } from 'components/TransactionHistory';
import { useMediaQuery } from 'hooks/useMediaQuery';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from 'store';
import { selectUserTransactionHistory } from 'store/selectors';
import { setUserTransactionHistory } from 'store/slices/userSlice';
import { checkAuth } from 'utils/checkAuth';
import styles from './Portfolio.module.scss';

export default function TransactionHistoryPage() {
  const data = useSelector(selectUserTransactionHistory);
  const [currentPage, setCurrentPage] = useState(data.currentPage + 1);
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Layout>
      <Card title="Transaction History">
        {isMobile === null ? (
          <div className={styles.preloader}>
            <Preloader />
          </div>
        ) : (
          <div>
            <TransactionHistory isMobile={isMobile} data={data.items} />
            {data.totalItems > 15 && (
              <Pagination
                currentPage={currentPage}
                itemsPerPage={15}
                numberOfItems={data.totalItems}
                setCurrentPage={setCurrentPage}
                navHref="/portfolio/transactionHistory"
              />
            )}
          </div>
        )}
      </Card>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      try {
        const isRedirect = await checkAuth(store, req.cookies.token);
        if (isRedirect) return isRedirect;

        let currentPage = 0;
        let currentSize = 15;
        const { size, page } = query;
        if (size) currentSize = +size;
        if (page) currentPage = +page - 1;

        const data = await Api(req.cookies.token).getUserTransactionHistory({
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
