import { Typography } from 'components/Typography';
import { format, parseISO } from 'date-fns';
import { useMediaQuery } from 'hooks/useMediaQuery';
import Link from 'next/link';
import React from 'react';
import { Transaction } from 'store/slices/types';
import { formatDollar } from 'utils/formatDollar';
import styles from './TransactionHistory.module.scss';

type PropsType = {
  data: Transaction[];
  isMobile: boolean;
};

export const TransactionHistory: React.FC<PropsType> = React.memo(function TransactionHistoryTable({
  data,
  isMobile,
}) {
  return (
    <div>
      {isMobile ? (
        <ul className={styles.list}>
          {data.map((trx) => {
            return <ListItem key={trx.id} trx={trx} />;
          })}
        </ul>
      ) : (
        <div className={styles.table}>
          <ul className={styles.tableHeader}>
            <li className={styles.tableDate}>
              <Typography variant="thinText" color="gray">
                Date
              </Typography>
            </li>
            <TableHeaderItem name="Type" />
            <TableHeaderItem name="Asset" />
            <TableHeaderItem name="Amount" />
            <TableHeaderItem name="USD Value" />
            <TableHeaderItem name="Total" />
            <li className={styles.tableSource}>
              <Typography variant="thinText" color="gray">
                Source
              </Typography>
            </li>
          </ul>

          <div>
            {data.map((trx) => {
              return <TableRow key={trx.id} trx={trx} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
});

const TableHeaderItem = React.memo(function TableHeaderItem({ name }: { name: string }) {
  return (
    <li>
      <Typography variant="thinText" color="gray">
        {name}
      </Typography>
    </li>
  );
});
type TableRowPropsType = {
  trx: Transaction;
};

export const TableRow: React.FC<TableRowPropsType> = React.memo(function TableRow({ trx }) {
  return (
    <ul className={styles.tableRowContainer}>
      <li className={styles.tableDate}>{format(parseISO(trx.date), 'yyyy-MM-dd hh:mm:ss')}</li>
      <li>
        <Typography color={trx.type === 'sell' ? 'red' : 'green'}>
          {trx.type[0].toUpperCase() + trx.type.slice(1)}
        </Typography>
      </li>

      <li className={styles.tableAsset}>
        <Link href={`/market/${trx.asset.currency.id}`}>
          <a>{trx.asset.currency.symbol.toUpperCase()}</a>
        </Link>
      </li>
      <li>{trx.amount}</li>
      <li>{formatDollar(trx.usdValue, 20)}</li>
      <li>{`${trx.total} USDT`}</li>
      <li className={styles.tableSource}>{trx.source[0].toUpperCase() + trx.source.slice(1)}</li>
    </ul>
  );
});
type ListItemPropsType = {
  trx: Transaction;
};
export const ListItem: React.FC<ListItemPropsType> = React.memo(function ListItem({ trx }) {
  return (
    <li className={styles.li}>
      <div className={styles.liRow}>
        <Link href={`/market/${trx.asset.currency.id}`}>
          <a>
            <Typography variant="mediumText">{trx.asset.currency.symbol.toUpperCase()}</Typography>
          </a>
        </Link>
        <Typography color="gray" fs="fs-14" fw="fw-500">
          {format(parseISO(trx.date), 'yyyy-MM-dd hh:mm:ss')}
        </Typography>
      </div>
      <div className={styles.liRow}>
        <Typography fw="fw-500">{trx.source[0].toUpperCase() + trx.source.slice(1)}</Typography>
        <Typography fw="fw-500" color={trx.type === 'sell' ? 'red' : 'green'}>
          {trx.type[0].toUpperCase() + trx.type.slice(1)}
        </Typography>
      </div>
      <div className={styles.liRowDivider}></div>
      <div className={styles.liRow}>
        <Typography fw="fw-500" color="gray">
          Amount
        </Typography>
        <Typography fw="fw-500">{trx.amount}</Typography>
      </div>
      <div className={styles.liRow}>
        <Typography fw="fw-500" color="gray">
          Price
        </Typography>
        <Typography fw="fw-500">{formatDollar(trx.usdValue, 20)}</Typography>
      </div>
    </li>
  );
});
