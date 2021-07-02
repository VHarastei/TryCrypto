import { Key, TableCoin } from 'api/marketApi';
import { Typography } from 'components/Typography';
import { useSortableData } from 'hooks/useSortableData';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from './SortableTable.module.scss';
import Image from 'next/image';
import starIcon from 'public/static/star.png';
import { formatDollar } from 'helpers/formatDollar';
import { formatPercent } from 'helpers/formatPercent';

type PropsType = {
  data: TableCoin[];
};

export const SortableTable: React.FC<PropsType> = React.memo(({ data }) => {
  const { items, setItems, requestSort, sortConfig } = useSortableData({
    data,
    config: { key: 'market_cap', direction: 'desc' },
  });
  //console.log('render SortableTable');

  useEffect(() => {
    if (data.length) setItems(data);
  }, [data]);

  const getClassName = (name: Key) => {
    if (!sortConfig) return '';
    return sortConfig.key === name ? sortConfig.direction : '';
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
    </div>
  );
});

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

type TableRowPropsType = {
  coin: TableCoin;
};

export const TableRow: React.FC<TableRowPropsType> = ({ coin }) => {
  return (
    <Link href={`/market/${coin.id}`}>
      <a>
        <ul className={styles.tableRowContainer}>
          <li className={styles.name}>
            <img src={coin.image} alt={`${coin.symbol} icon`} width={30} height={30} />
            <p>{coin.name}</p>
            <span>{coin.symbol.toUpperCase()}</span>
          </li>
          <li className={styles.price}>{formatDollar(coin.current_price, 20)}</li>
          <li
            className={`${styles.change} ${
              coin.price_change_percentage_24h > 0 ? styles.changeSuccess : styles.changeDanger
            }`}
          >
            {formatPercent(coin.price_change_percentage_24h)}
          </li>
          <li className={styles.marketCap}>{formatDollar(coin.market_cap, 12)}</li>
          <li className={styles.watch}>
            <Image layout="fixed" src={starIcon} alt={`star icon`} width={24} height={24} />
          </li>
        </ul>
      </a>
    </Link>
  );
};
