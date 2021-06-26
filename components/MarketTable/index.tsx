import { MarketApi, TableCoin } from 'api/marketApi';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import Image from 'next/image';
import Link from 'next/link';
import btcIcon from 'public/static/btc.png';
import searchIcon from 'public/static/search.png';
import React, { useEffect, useState } from 'react';
import styles from './MarketTable.module.scss';
import { TableRow } from './TableRow/TableRow';

type PropsType = {
  data: TableCoin[];
};

export const MarketTable: React.FC<PropsType> = ({ data }) => {
  const [coins, setCoins] = useState<TableCoin[]>(data);
  const [page, setPage] = useState(1);
  const formatPercent = (number: number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number: number, maximumSignificantDigits: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits,
    }).format(number);
  };
  const handleLoadMore = async (page: number) => {
    const newCoins = await MarketApi.getTableData(page);
    setCoins([...coins, ...newCoins]);
  };

  useEffect(() => {
    if (page !== 1) handleLoadMore(page);
  }, [page]);

  return (
    <Card title={SearchBar}>
      <div className={styles.table}>
        <ul className={styles.tableHeader}>
          <li className={styles.name}>Name</li>
          <li className={styles.price}>Price</li>
          <li className={styles.change}>Change</li>
          <li className={styles.marketCap}>Market Cap</li>
          <li className={styles.watch}>Watch</li>
        </ul>

        <div>
          {coins.map((coin: TableCoin) => {
            return <TableRow coin={coin} />;
          })}
        </div>
        <Button
          color="secondary"
          onClick={() => setPage((prev) => prev + 1)}
          className={styles.loadMoreBtn}
        >
          Load more
        </Button>
      </div>
    </Card>
  );
};

// const TableRow = () => {
//   return (
//     <Link href="/market/bitcoin">
//       <a>
//         <ul className={styles.tableRow}>
//           <li className={styles.name}>
//             <Image layout="fixed" src={btcIcon} alt={`btc icon`} width={30} height={30} />
//             <p>Bitcoin</p>
//             <span>BTC</span>
//           </li>
//           <li className={styles.price}>$40.324.40 </li>
//           <li className={styles.change}>+0.35%</li>
//           <li className={styles.marketCap}>749.4B</li>
//           <li className={styles.watch}>
//             <Image layout="fixed" src={starIcon} alt={`star icon`} width={24} height={24} />
//           </li>
//         </ul>
//       </a>
//     </Link>
//   );
// };

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
