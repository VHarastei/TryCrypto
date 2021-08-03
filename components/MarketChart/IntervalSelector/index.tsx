import React from 'react';
import styles from './IntervalSelector.module.scss';

type PropsType = {
  name: string;
  isActive: boolean;
  handleSelectChart: () => void;
};

export const IntervalSelector: React.FC<PropsType> = React.memo(
  ({ name, isActive, handleSelectChart }) => {
    return (
      <div
        className={`${styles.container} ${isActive ? styles.active : ''}`}
        onClick={handleSelectChart}
      >
        {name}
      </div>
    );
  }
);
