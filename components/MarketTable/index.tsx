import { fetcher } from 'api';
import { Key, MarketApi, TableCoin, TableConfig } from 'api/marketApi';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Paper } from 'components/Paper';
import { Typography } from 'components/Typography';
import { createPagination } from 'helpers/createPagination';
import { useDidMount } from 'hooks/useDidMount';
import { useSortableData } from 'hooks/useSortableData';
import Image from 'next/image';
import Link from 'next/link';
import arrowIcon from 'public/static/back.svg';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './MarketTable.module.scss';
import { TableRow } from './TableRow/TableRow';

type PropsType = {
  data: TableCoin[];
  currentPage: number;
};

export const MarketTable: React.FC<PropsType> = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const { data } = useSWR(MarketApi.getTableDataUrl(currentPage), fetcher, {
    initialData: currentPage === props.currentPage ? props.data : [],
    refreshInterval: 30000,
  });

  const { items, setItems, requestSort, sortConfig } = useSortableData({
    data,
    config: { key: 'market_cap', direction: 'desc' },
  });

  useEffect(() => {
    if (data.length) setItems(data);
  }, [data]);

  const { pagination, showing } = createPagination({
    numberOfItems: 6120,
    itemsPerPage: 100,
    numberOfButtons: 5,
    currentPage,
  });

  const getClassName = (name: Key) => {
    if (!sortConfig) return '';
    return sortConfig.key === name ? sortConfig.direction : '';
  };

  const handleChangePage = (newPage: number) => () => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.table}>
      <ul className={styles.tableHeader}>
        <TableHeaderItem
          name="Name"
          itemKey="name"
          requestSort={requestSort}
          getClassName={getClassName}
        />
        <TableHeaderItem
          name="Price"
          itemKey="current_price"
          requestSort={requestSort}
          getClassName={getClassName}
        />
        <TableHeaderItem
          name="Change 24h"
          itemKey="price_change_percentage_24h"
          requestSort={requestSort}
          getClassName={getClassName}
        />
        <TableHeaderItem
          name="Market Cap"
          itemKey="market_cap"
          requestSort={requestSort}
          getClassName={getClassName}
        />
        <li className={styles.watch}>Watch</li>
      </ul>

      <div>
        {items.map((coin: TableCoin) => {
          return <TableRow key={coin.id} coin={coin} />;
        })}
      </div>
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
};

type TableHeaderItemPropsType = {
  name: string;
  itemKey: Key;
  requestSort: (key: Key) => void;
  getClassName: (name: Key) => string;
};

const TableHeaderItem: React.FC<TableHeaderItemPropsType> = ({
  name,
  itemKey,
  requestSort,
  getClassName,
}) => {
  return (
    <li className={styles[itemKey]} onClick={() => requestSort(itemKey)}>
      <Typography variant="thinText" color="gray">
        {name}
      </Typography>
      <span className={`${styles.sort} ${styles[getClassName(itemKey)]}`}></span>
    </li>
  );
};
