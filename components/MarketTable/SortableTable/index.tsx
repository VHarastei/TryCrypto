import { Key, TableCoin } from 'api/marketApi';
import { PriceChangeField } from 'components/PriceChangeField';
import { Typography } from 'components/Typography';
import { formatDollar } from 'utils/formatDollar';
import { useSortableData } from 'hooks/useSortableData';
import Image from 'next/image';
import Link from 'next/link';
import starIcon from 'public/static/star.svg';
import React, { useEffect } from 'react';
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
    }, [data]);

    const getClassName = (name: Key) => {
      if (!sortConfig) return '';
      return sortConfig.key === name ? sortConfig.direction : '';
    };

    return (
      <div className={styles.table}>
        <ul className={styles.tableHeader}>
          <li className={styles.watch}></li>
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
            name="Change 24h"
            itemKey="price_change_percentage_24h"
            requestSort={requestSort}
            getClassName={getClassName}
          />
          <TableHeaderItem
            name="Change 7d"
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
          <li className={styles.sparkline}>
            <Typography variant="thinText" color="gray">
              Last 7 days
            </Typography>
          </li>
        </ul>

        <div>
          {items.map((coin: TableCoin) => {
            return <TableRow key={coin.id} coin={coin} />;
          })}
        </div>
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

export const TableRow: React.FC<TableRowPropsType> = React.memo(({ coin }) => {
  console.log('render');
  return (
    <Link href={`/market/${coin.id}`}>
      <a>
        <ul className={styles.tableRowContainer}>
          <li className={styles.watch}>
            <Image layout="fixed" src={starIcon} alt={`star icon`} width={24} height={24} />
          </li>
          <li className={styles.ordNum}>{coin.ordNum}</li>
          <li className={styles.name}>
            <img src={coin.image} alt={`${coin.symbol} icon`} width={30} height={30} />
            <p>{coin.name}</p>
            <span>{coin.symbol.toUpperCase()}</span>
          </li>
          <li className={styles.price}>{formatDollar(coin.current_price, 20)}</li>
          <li className={styles.change}>
            <PriceChangeField value={coin.price_change_percentage_24h} />
          </li>
          <li className={styles.change}>
            <PriceChangeField value={coin.price_change_percentage_7d_in_currency} />
          </li>
          <li className={styles.marketCap}>{formatDollar(coin.market_cap, 12)}</li>
          <li className={styles.sparkline}>
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
          </li>
        </ul>
      </a>
    </Link>
  );
});
