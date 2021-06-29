import Image from 'next/image';
import React from 'react';
import styles from './MarketSearchBar.module.scss';
import searchIcon from 'public/static/search.png';
import { Button } from 'components/Button';
import { ListCoin } from 'api/marketApi';

type PropsType = {
  coinsList: ListCoin[];
};
export const MarketSearchBar: React.FC<PropsType> = ({ coinsList }) => {
  const [coinName, setCoinName] = React.useState<string>('');

  const handleChangeCoinName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val[val.length - 1] === ' ') return;
    const searchCoins = coinsList.filter((coin) => coin.symbol === val);
    console.log(searchCoins);
    setCoinName(val);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBarField}>
        <Image src={searchIcon} alt="Search icon" width={28} height={28} />
        <input
          placeholder="Search coin name"
          value={coinName}
          onChange={handleChangeCoinName}
        ></input>
      </div>
      <Button>Search</Button>
    </div>
  );
};
