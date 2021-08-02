import Image from 'next/image';
import Link from 'next/link';
import arrowIcon from 'public/static/back.svg';
import React from 'react';
import { createPagination } from 'utils/createPagination';
import styles from './Pagination.module.scss';

type PropsType = {
  currentPage: number;
  numberOfItems: number;
  itemsPerPage: number;
  navHref: string;
  setCurrentPage: (newPage: number) => void;
};

export const Pagination: React.FC<PropsType> = React.memo(
  ({ currentPage, numberOfItems, itemsPerPage, navHref, setCurrentPage }) => {
    const { pagination, showing } = createPagination({
      numberOfItems,
      itemsPerPage,
      numberOfButtons: 5,
      currentPage,
    });

    const handleChangePage = (newPage: number) => () => {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    };

    return (
      <div className={styles.container}>
        <div className={styles.showing}>{`Showing ${showing.items} out of ${showing.total}`}</div>
        <div className={styles.pagination}>
          <Link
            href={`${navHref}${pagination[0] === currentPage ? '' : `?page=${currentPage - 1}`}`}
          >
            <a
              onClick={handleChangePage(currentPage - 1)}
              className={`${styles.paginationArrow} ${
                pagination[0] === currentPage ? styles.disabledArrow : ''
              }`}
            >
              <Image src={arrowIcon} alt="Arrow icon" width={14} height={14} />
            </a>
          </Link>

          {pagination.map((page) => {
            return (
              <Link key={page} href={`${navHref}${page === 1 ? '' : `?page=${page}`}`}>
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

          <Link
            href={`${navHref}${
              [...pagination].reverse()[0] === currentPage ? '' : `?page=${currentPage + 1}`
            }`}
          >
            <a
              onClick={handleChangePage(currentPage + 1)}
              className={`${styles.paginationArrow} ${styles.rotate} ${
                [...pagination].reverse()[0] === currentPage ? styles.disabledArrow : ''
              }`}
            >
              <Image src={arrowIcon} alt="Arrow icon" width={14} height={14} />
            </a>
          </Link>
        </div>
      </div>
    );
  }
);
