import { fetcher } from 'api/marketApi';
import { MarketApi, TableCoin } from 'api/marketApi';
import { createPagination } from 'utils/createPagination';
import Image from 'next/image';
import Link from 'next/link';
import arrowIcon from 'public/static/back.svg';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './Pagination.module.scss';

type PropsType = {
  currentPage: number;
  pagination: number[];
  showing: {
    items: string;
    total: number;
  };
  setCurrentPage: (newPage: number) => void;
};

export const Pagination: React.FC<PropsType> = React.memo(
  ({ currentPage, pagination, showing, setCurrentPage }) => {
    const handleChangePage = (newPage: number) => () => {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    };

    return (
      <div className={styles.container}>
        {pagination.map((p) => (
          <div>{p}</div>
        ))}
        <div className={styles.showing}>{`Showing ${showing.items} out of ${showing.total}`}</div>
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
          {pagination.map((page, index) => {
            console.log(page);
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
    );
  }
);
