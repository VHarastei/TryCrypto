import { Key, TableCoin } from 'api/marketApi';
import clsx from 'clsx';
import { PriceChangeField } from 'components/PriceChangeField';
import { Typography } from 'components/Typography';
import { WatchlistButton } from 'components/WatchlistButton';
import { useSortableData } from 'hooks/useSortableData';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { formatDollar } from 'utils/formatDollar';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';
import styles from './SortableTable.module.scss';

type PropsType = {
  data: TableCoin[];
  currentPage?: number;
  isSearchResult?: boolean;
};

export const SortableTable: React.FC<PropsType> = React.memo(
  ({ data, currentPage, isSearchResult }) => {
    data.forEach((_: TableCoin, i: number) => {
      // adding ordinal number, because api don`t have that information
      if (currentPage) {
        let ordNum = currentPage === 1 ? currentPage + i : 50 * (currentPage - 1) + i + 1;
        data[i].ordNum = ordNum;
      } else data[i].ordNum = i + 1;
    });

    const { items, setItems, requestSort, sortConfig } = useSortableData({
      data,
      config: { key: 'market_cap', direction: 'desc' },
    });

    useEffect(() => {
      if (data.length) setItems(data);
    }, [data, setItems]);

    const getClassName = (name: Key) => {
      if (!sortConfig) return '';
      return sortConfig.key === name ? sortConfig.direction : '';
    };

    return (
      <div className={styles.container}>
        <table className={styles.table}>
          <tr>
            <th className={styles.watch}></th>
            <TableHeaderItem
              name="#"
              itemKey="ordNum"
              requestSort={requestSort}
              getClassName={getClassName}
            />

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
              name="24h"
              itemKey="price_change_percentage_24h"
              requestSort={requestSort}
              getClassName={getClassName}
            />
            <TableHeaderItem
              name="7d"
              itemKey="price_change_percentage_7d_in_currency"
              requestSort={requestSort}
              getClassName={getClassName}
            />
            <TableHeaderItem
              name="Market Cap"
              itemKey="market_cap"
              requestSort={requestSort}
              getClassName={getClassName}
            />
            <th className={styles.sparkline}>
              <Typography variant="thinText" color="gray">
                Last 7 days
              </Typography>
            </th>
          </tr>

          {items.map((coin: TableCoin) => {
            return (
              <TableRow
                key={coin.id}
                coin={coin}
                //isWatchlisted={watchlist.some((i) => i.currencyId === coin.id)}
              />
            );
          })}
        </table>
        {isSearchResult && (
          <div className={styles.foundQuantity}>
            <Typography>{`Found ${items.length} currencies`}</Typography>
          </div>
        )}
      </div>
    );
  }
);

type TableHeaderItemPropsType = {
  name: string;
  itemKey: Key;
  requestSort: (key: Key) => void;
  getClassName: (name: Key) => string;
};

const TableHeaderItem: React.FC<TableHeaderItemPropsType> = React.memo(function TableRow({
  name,
  itemKey,
  requestSort,
  getClassName,
}) {
  return (
    <th className={styles[itemKey]} onClick={() => requestSort(itemKey)}>
      <div className={styles.tableHeaderItem}>
        <Typography variant="thinText" color="gray">
          {name}
        </Typography>
        <span className={clsx(styles.sort, styles[getClassName(itemKey)])}></span>
      </div>
    </th>
  );
});

type TableRowPropsType = {
  coin: TableCoin;
  //isWatchlisted: boolean;
};

export const TableRow: React.FC<TableRowPropsType> = React.memo(function TableRow({ coin }) {
  return (
    <tr className={styles.tableRowContainer}>
      <td className={styles.watch}>
        <WatchlistButton currencyId={coin.id} />
      </td>
      <td className={styles.ordNum}>{coin.ordNum}</td>
      <td>
        <Link href={`/market/${coin.id}`}>
          <a className={styles.name}>
            <Image
              layout="fixed"
              src={coin.image}
              alt={`${coin.symbol} icon`}
              width={30}
              height={30}
            />
            <p>{coin.name}</p>
            <span>{coin.symbol.toUpperCase()}</span>
          </a>
        </Link>
      </td>
      <td className={styles.price}>{formatDollar(coin.current_price, 20)}</td>
      <td className={styles.change}>
        <PriceChangeField value={coin.price_change_percentage_24h} />
      </td>
      <td className={clsx(styles.change, styles.change7d)}>
        <PriceChangeField value={coin.price_change_percentage_7d_in_currency} />
      </td>
      <td className={styles.marketCap}>{formatDollar(coin.market_cap, 12)}</td>
      <td className={styles.sparkline}>
        <VictoryChart
          //animate={{ duration: 300, onLoad: { duration: 300 } }}
          width={150}
          height={30}
          padding={0}
          //domainPadding={{ y: 16 }}
        >
          <VictoryLine
            style={{
              data: {
                stroke: coin.price_change_percentage_7d_in_currency < 0 ? '#f84960' : '#02c076',
                strokeWidth: 1,
              },
            }}
            data={coin.sparkline_in_7d.price}
          />
          <VictoryAxis style={{ axis: { stroke: 'none' } }} />
        </VictoryChart>
      </td>
    </tr>
  );
});
