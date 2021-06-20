import { Card } from 'components/Card';
import React from 'react';
import styles from './MarketTable.module.scss';
import searchIcon from 'public/static/search.png';
import Image from 'next/image';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import btcIcon from 'public/static/btc.png';
import starIcon from 'public/static/star.png';

export const MarketTable = () => {
  return (
    <Card title={SearchBar}>
      <table className={styles.table}>
        <div className={styles.tableHeader}>
          <th className={styles.name}>Name</th>
          <th className={styles.price}>Price</th>
          <th className={styles.change}>Change</th>
          <th className={styles.marketCap}>Market Cap</th>
          <th className={styles.watch}>Watch</th>
        </div>
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
      </table>
    </Card>
  );
};

const TableRow = () => {
  return (
    <div className={styles.tableRow}>
      <td className={styles.name}>
        <Image layout="fixed" src={btcIcon} alt={`btc icon`} width={24} height={24} />
        <p>Bitcoin</p>
        <span>BTC</span>
      </td>
      <td className={styles.price}>$40.324.40 </td>
      <td className={styles.change}>+0.35%</td>
      <td className={styles.marketCap}>749.4B</td>
      <td className={styles.watch}>
        <Image layout="fixed" src={starIcon} alt={`btc icon`} width={24} height={24} />
      </td>
    </div>
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
