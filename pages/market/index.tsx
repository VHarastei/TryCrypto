import { fetcher } from 'api/marketApi';
import { ListCoin, MarketApi, TableCoin } from 'api/marketApi';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { MarketTable } from 'components/MarketTable';
import { SortableTable } from 'components/MarketTable/SortableTable';
import { Paper } from 'components/Paper';
import { Typography } from 'components/Typography';
import useDebounce from 'hooks/useDebounce';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import closeIcon from 'public/static/close.svg';
import loadingIcon from 'public/static/loading.svg';
import searchIcon from 'public/static/search.svg';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import styles from './Market.module.scss';

type PropsType = {
  data: TableCoin[];
  coinsList: ListCoin[];
  currentPage: number;
};

export default function Market({ data, coinsList, currentPage }: PropsType) {
  const [searchCoinsIds, setSearchCoinsIds] = React.useState<string[]>([]);
  const [searchCoinName, setSearchCoinName] = React.useState<string>('');
  const [foundCoins, setFoundCoins] = React.useState<TableCoin[] | undefined>(undefined);
  const [isInvalidCoinName, setIsInvalidCoinName] = React.useState(false);
  const debouncedSearch: string[] = useDebounce(searchCoinsIds, 1500);

  let { data: fndCoins } = useSWR<TableCoin[]>(
    debouncedSearch.length ? MarketApi.getTableDataUrl(1, debouncedSearch) : null,
    fetcher
  );

  useEffect(() => {
    if (fndCoins) setFoundCoins(fndCoins);
  }, [fndCoins]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val[val.length - 1] === ' ') return;
    setSearchCoinName(val);
    if (!val) {
      setIsInvalidCoinName(false);
      setFoundCoins(undefined);
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
    setFoundCoins(undefined);
    setIsInvalidCoinName(false);
  };
  return (
    <Layout>
      <Paper>
        <div className={styles.searchBar}>
          <div className={styles.searchBarField}>
            <Image layout="fixed" src={searchIcon} alt="Search icon" width={28} height={28} />
            <input placeholder="Search coin name" value={searchCoinName} onChange={handleSearch} />
            {searchCoinName && !isInvalidCoinName && !fndCoins ? (
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
        ) : foundCoins ? (
          <SortableTable data={foundCoins} isSearchResult />
        ) : (
          <MarketTable data={data} currentPage={currentPage} />
        )}
      </Paper>
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
