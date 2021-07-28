import { Typography } from 'components/Typography';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Transaction } from 'store/slices/userSlice';
import { formatDollar } from 'utils/formatDollar';
import styles from './TransactionHistoryTable.module.scss';

type PropsType = {
  data: Transaction[];
};

export const TransactionHistoryTable: React.FC<PropsType> = React.memo(({ data }) => {
  return (
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
        <TableHeaderItem name="Source" />
      </ul>

      <div>
        {data.map((trx) => {
          return <TableRow key={trx.id} trx={trx} />;
        })}
      </div>
    </div>
  );
});

const TableHeaderItem = React.memo(({ name }: { name: string }) => {
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

export const TableRow: React.FC<TableRowPropsType> = React.memo(({ trx }) => {
  return (
    <ul className={styles.tableRowContainer}>
      <li className={styles.tableDate}>{format(parseISO(trx.date), 'yyyy-MM-dd hh:mm:ss')}</li>
      <li>
        <Typography color={trx.type === 'buy' ? 'green' : 'red'}>
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
      <li>{trx.source[0].toUpperCase() + trx.source.slice(1)}</li>
    </ul>
  );
});
