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
import useDebounce from 'hooks/useDebounce';
import { Typography } from 'components/Typography';

type PropsType = {
  data: TableCoin[];
  coinsList: ListCoin[];
  currentPage: number;
};

export default function Market({ data, coinsList, currentPage }: PropsType) {
  const [searchCoinsIds, setSearchCoinsIds] = React.useState<string[]>([]);
  const [searchCoinName, setSearchCoinName] = React.useState<string>('');
  const [foundedCoins, setFoundedCoins] = React.useState<TableCoin[] | undefined>(undefined);
  const [isInvalidCoinName, setIsInvalidCoinName] = React.useState(false);
  const debouncedSearch: string[] = useDebounce(searchCoinsIds, 1500);

  let { data: fnddCoins } = useSWR<TableCoin[]>(
    debouncedSearch.length ? MarketApi.getTableDataUrl(1, debouncedSearch) : null,
    fetcher
  );

  useEffect(() => {
    if (fnddCoins) setFoundedCoins(fnddCoins);
  }, [fnddCoins]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val[val.length - 1] === ' ') return;
    setSearchCoinName(val);
    if (!val) {
      setIsInvalidCoinName(false);
      setFoundedCoins(undefined);
    }
    let srchCoinIds: string[] = [];
    coinsList.forEach((coin) => {
      if (
        (coin.name.toLowerCase().includes(val.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(val.toLowerCase())) &&
        val &&
        srchCoinIds.length <= 400
      )
        srchCoinIds.push(coin.id);
    });
    if (val) setIsInvalidCoinName(!!!srchCoinIds.length);
    setSearchCoinsIds(srchCoinIds);
  };

  const handleRemoveCoinName = () => {
    setSearchCoinName('');
    setFoundedCoins(undefined);
    setIsInvalidCoinName(false);
  };
  return (
    <Layout>
      <ContentLayout>
        <Paper>
          <div className={styles.searchBar}>
            <div className={styles.searchBarField}>
              <Image layout="fixed" src={searchIcon} alt="Search icon" width={28} height={28} />
              <input
                placeholder="Search coin name"
                value={searchCoinName}
                onChange={handleSearch}
              />
              {searchCoinName && !isInvalidCoinName && !fnddCoins ? (
                <Image
                  className={styles.searchBarFieldRemove}
                  src={loadingIcon}
                  alt="Search icon"
                  width={24}
                  height={24}
                />
              ) : (
                searchCoinName && (
                  <Image
                    onClick={handleRemoveCoinName}
                    className={styles.searchBarFieldRemove}
                    src={closeIcon}
                    alt="Remove icon"
                    width={24}
                    height={24}
                  />
                )
              )}
            </div>
          </div>
          {isInvalidCoinName ? (
            <div className={styles.notFound}>
              <Typography variant="regularText">We couldn't find that asset</Typography>
              <Typography variant="thinText" color="gray">
                Try again with a different term.
              </Typography>
            </div>
          ) : foundedCoins ? (
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
