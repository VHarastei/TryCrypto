import { TableCoin } from 'api/marketApi';
import Link from 'next/link';
import React from 'react';
import styles from './TableRow.module.scss';
import Image from 'next/image';
import starIcon from 'public/static/star.png';

type PropsType = {
  coin: TableCoin;
};

export const TableRow: React.FC<PropsType> = ({ coin }) => {
  const formatPercent = (number: number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number: number, maximumSignificantDigits: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits,
    }).format(number);
  };

  return (
    <Link href={`/market/${coin.id}`}>
      <a>
        <ul className={styles.container}>
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
