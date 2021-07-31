import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsWatclistedCurrency } from 'store/selectors';
import {
  fetchCreateWatchlistCurrency,
  fetchDeleteWatchlistCurrency,
} from 'store/slices/watchlistSlice';
import styles from './WatchlistButton.module.scss';

type PropsTypes = {
  currencyId: string;
  outlined?: boolean;
  //isWatchlisted?: boolean;
};

export const WatchlistButton: React.FC<PropsTypes> = React.memo(({ currencyId, outlined }) => {
  const isWatchlisted = useSelector(selectIsWatclistedCurrency(currencyId));
  console.log(isWatchlisted);
  const dispatch = useDispatch();

  const handleIsWatchlisted = () => {
    if (!isWatchlisted) {
      dispatch(fetchCreateWatchlistCurrency(currencyId));
    } else dispatch(fetchDeleteWatchlistCurrency(currencyId));
  };

  return (
    <div
      onClick={handleIsWatchlisted}
      className={`${styles.container} ${outlined && styles.outlined} ${
        isWatchlisted ? styles.isWatchlisted : ''
      }`}
    ></div>
  );
});
