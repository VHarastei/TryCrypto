import { fetcher, MarketApi, TableCoin } from 'api/marketApi';
import { Pagination } from 'components/Pagination';
import React, { useState } from 'react';
import useSWR from 'swr';
import { SortableTable } from './SortableTable';

type PropsType = {
  data: TableCoin[];
  currentPage: number;
};

export const MarketTable: React.FC<PropsType> = React.memo((props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const { data } = useSWR(MarketApi.getTableDataUrl(currentPage), fetcher, {
    initialData: currentPage === props.currentPage ? props.data : [],
    refreshInterval: 30000,
  });
  return (
    <div>
      <SortableTable data={data} currentPage={currentPage} />
      {data.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={50}
          numberOfItems={6120}
          setCurrentPage={setCurrentPage}
          navHref="/market"
        />
      )}
    </div>
  );
});
