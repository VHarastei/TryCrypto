import { MarketApi, TableCoin } from 'api/marketApi';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { createPagination } from 'helpers/createPagination';
import Image from 'next/image';
import Link from 'next/link';
import btcIcon from 'public/static/btc.png';
import searchIcon from 'public/static/search.png';
import React, { useEffect, useState } from 'react';
import styles from './MarketTable.module.scss';
import { TableRow } from './TableRow/TableRow';
import arrowIcon from 'public/static/back.svg';
import { useDidMount } from 'hooks/useDidMount';

type PropsType = {
  data: TableCoin[];
};

export const MarketTable: React.FC<PropsType> = ({ data }) => {
  const [coins, setCoins] = useState<TableCoin[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const { pagination, showing } = createPagination({
    numberOfItems: 1000,
    itemsPerPage: 100,
    numberOfButtons: 5,
    currentPage,
  });

  const didMount = useDidMount();

  useEffect(() => {
    const handleLoadMore = async (currentPage: number) => {
      const newCoins = await MarketApi.getTableData(currentPage);
      setCoins(newCoins);
    };
    if (!didMount) {
      handleLoadMore(currentPage);
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  return (
    <Card title={SearchBar}>
      <div className={styles.table}>
        <ul className={styles.tableHeader}>
          <li className={styles.name}>
            <Typography variant="thinText" color="gray">
              Name
            </Typography>
            <span className={`${styles.sort} ${styles.desc}`}></span>
          </li>
          <li className={styles.price}>Price</li>
          <li className={styles.change}>Change</li>
          <li className={styles.marketCap}>Market Cap</li>
          <li className={styles.watch}>Watch</li>
        </ul>

        <div>
          {coins.map((coin: TableCoin) => {
            return <TableRow key={coin.id} coin={coin} />;
          })}
        </div>
        <div className={styles.paginationContainer}>
          <div className={styles.showing}>{`Showing ${showing} out of 1000`}</div>
          <div className={styles.pagination}>
            <div
              color="secondary"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`${styles.paginationArrow} ${
                pagination[0] === currentPage ? styles.disabledArrow : ''
              }`}
            >
              <Image src={arrowIcon} alt="Arrow icon" width={14} height={14} />
            </div>
            {pagination.map((page) => {
              return (
                <div
                  key={page}
                  color="secondary"
                  onClick={() => setCurrentPage(page)}
                  className={`${styles.paginationBtn} ${page === currentPage ? styles.active : ''}`}
                >
                  {page}
                </div>
              );
            })}
            <div
              color="secondary"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`${styles.paginationArrow} ${styles.rotate} ${
                pagination.reverse()[0] === currentPage ? styles.disabledArrow : ''
              }`}
            >
              <Image src={arrowIcon} alt="Arrow icon" width={14} height={14} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBarField}>
        <Image src={searchIcon} alt="Search icon" width={28} height={28} />
        <input placeholder="Search coin name"></input>
      </div>
      <Button>Search</Button>
    </div>
  );
};
