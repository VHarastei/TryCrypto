import { fetcher } from 'api';
import { MarketApi, TableCoin } from 'api/marketApi';
import { createPagination } from 'helpers/createPagination';
import Image from 'next/image';
import Link from 'next/link';
import arrowIcon from 'public/static/back.svg';
import React, { useState } from 'react';
import useSWR from 'swr';
import styles from './MarketTable.module.scss';
import { SortableTable } from './SortableTable';

type PropsType = {
  data: TableCoin[];
  currentPage: number;
};

export const MarketTable: React.FC<PropsType> = React.memo((props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const { data } = useSWR(MarketApi.getTableDataUrl(currentPage), fetcher, {
    initialData: currentPage === props.currentPage ? props.data : [],
    refreshInterval: 30000,
  });
  //console.log('render MarketTable');

  const { pagination, showing } = createPagination({
    numberOfItems: 6120,
    itemsPerPage: 100,
    numberOfButtons: 5,
    currentPage,
  });

  const handleChangePage = (newPage: number) => () => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <SortableTable data={data} />
      {data.length && (
        <div className={styles.paginationContainer}>
          <div className={styles.showing}>{`Showing ${showing} out of 6120`}</div>
          <div className={styles.pagination}>
            <div
              color="secondary"
              onClick={handleChangePage(currentPage - 1)}
              className={`${styles.paginationArrow} ${
                pagination[0] === currentPage ? styles.disabledArrow : ''
              }`}
            >
              <Image src={arrowIcon} alt="Arrow icon" width={14} height={14} />
            </div>
            {pagination.map((page) => {
              return (
                <Link key={page} href={`/market${page === 1 ? '' : `?page=${page}`}`}>
                  <a>
                    <div
                      color="secondary"
                      onClick={handleChangePage(page)}
                      className={`${styles.paginationBtn} ${
                        page === currentPage ? styles.active : ''
                      }`}
                    >
                      {page}
                    </div>
                  </a>
                </Link>
              );
            })}
            <div
              color="secondary"
              onClick={handleChangePage(currentPage + 1)}
              className={`${styles.paginationArrow} ${styles.rotate} ${
                pagination.reverse()[0] === currentPage ? styles.disabledArrow : ''
              }`}
            >
              <Image src={arrowIcon} alt="Arrow icon" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
