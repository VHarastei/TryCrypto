import { Direction, Key, TableCoin, TableConfig } from 'api/marketApi';
import React from 'react';

type useSortableDataType = {
  data: TableCoin[];
  config: TableConfig;
};

export const useSortableData = ({ data, config }: useSortableDataType) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const [items, setItems] = React.useState(data);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    sortableItems.sort((a: TableCoin, b: TableCoin) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: Key) => {
    let direction: Direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, setItems, requestSort, sortConfig };
};
