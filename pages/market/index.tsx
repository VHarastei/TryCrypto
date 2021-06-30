import { fetcher } from 'api';
import { ListCoin, MarketApi, TableCoin } from 'api/marketApi';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketTable } from 'components/MarketTable';
import { Paper } from 'components/Paper';
import { RecentTransactions } from 'components/RecentTransactions';
import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import styles from './Market.module.scss';
import Image from 'next/image';
import searchIcon from 'public/static/search.png';
import closeIcon from 'public/static/close.svg';
import loadingIcon from 'public/static/loading.svg';
import { Button } from 'components/Button';
import { SortableTable } from 'components/MarketTable/SortableTable';

type PropsType = {
  data: TableCoin[];
  coinsList: ListCoin[];
  currentPage: number;
};

export default function Market({ data, coinsList, currentPage }: PropsType) {
  const [coinName, setCoinName] = React.useState<string>('');
  const [searchCoinIds, setSearchCoinIds] = React.useState<string[]>([]);
  const [foundedCoins, setFoundedCoins] = React.useState<TableCoin[] | undefined>();

  let { data: fnddCoins } = useSWR<TableCoin[]>(
    searchCoinIds.length ? MarketApi.getTableDataUrl(1, searchCoinIds) : null,
    fetcher
  );

  useEffect(() => {
    setFoundedCoins(fnddCoins);
  }, [fnddCoins]);

  const handleChangeCoinName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val[val.length - 1] === ' ') return;
    if (!val) setFoundedCoins(undefined);
    setCoinName(val);
  };

  const handleSearchCoins = () => {
    let srchCoinIds: string[] = [];
    coinsList.forEach((coin) => {
      if (
        (coin.name.toLowerCase().includes(coinName.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(coinName.toLowerCase())) &&
        coinName &&
        srchCoinIds.length <= 400
      )
        srchCoinIds.push(coin.id);
    });

    if (srchCoinIds.length) setSearchCoinIds(srchCoinIds);
  };

  const handleRemoveCoinName = () => {
    setCoinName('');
    setFoundedCoins(undefined);
  };
  console.log(foundedCoins);
  return (
    <Layout>
      <ContentLayout>
        <Paper>
          <div className={styles.searchBar}>
            <div className={styles.searchBarField}>
              <Image layout="fixed" src={searchIcon} alt="Search icon" width={28} height={28} />
              <input
                placeholder="Search coin name"
                value={coinName}
                onChange={handleChangeCoinName}
              />
              {coinName && !fnddCoins ? (
                <Image
                  className={styles.searchBarFieldRemove}
                  src={loadingIcon}
                  alt="Search icon"
                  width={24}
                  height={24}
                />
              ) : (
                coinName && (
                  <Image
                    onClick={handleRemoveCoinName}
                    className={styles.searchBarFieldRemove}
                    src={closeIcon}
                    alt="Search icon"
                    width={24}
                    height={24}
                  />
                )
              )}
            </div>
            <Button onClick={handleSearchCoins}>Search</Button>
          </div>
          {foundedCoins ? (
            <SortableTable data={foundedCoins} />
          ) : (
            <MarketTable data={data} currentPage={currentPage} />
          )}
        </Paper>
        <div>
          <RecentTransactions simplified withPadding />
        </div>
      </ContentLayout>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let currentPage = 1;
  const { page } = ctx.query;
  if (page) currentPage = +page;

  try {
    const [data, coinsList] = await Promise.all([
      fetcher(MarketApi.getTableDataUrl(currentPage)()),
      fetcher(MarketApi.getCoinsListUrl()),
    ]);

    return {
      props: { data, coinsList, currentPage },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { data: [], coinsList: [], currentPage },
    };
  }
}
