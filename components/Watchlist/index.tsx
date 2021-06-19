import { Button } from 'components/Button';
import { Card } from 'components/Card';
import React from 'react';
import styles from './Watchlist.module.scss';
import Image from 'next/image';
import placeholderIcon from 'public/static/placeholder.png';

export const Watchlist = () => {
  return (
    <Card title="Watchlist">
      <div className={styles.container}>
        <MiniChart />
        <MiniChart />
        <MiniChart discoverMore />
      </div>
    </Card>
  );
};

type MiniChartPropsType = {
  discoverMore?: boolean;
};

const MiniChart: React.FC<MiniChartPropsType> = ({ discoverMore }) => {
  if (discoverMore)
    return (
      <div className={`${styles.discoverMore} ${styles.miniChart}`}>
        <Button color="secondary">Discover more assets</Button>
      </div>
    );

  const [display, setDisplay] = React.useState(false);

  const showButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDisplay(true);
  };
  const hideButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDisplay(false);
  };

  return (
    <div
      className={styles.miniChart}
      onMouseEnter={(e) => showButton(e)}
      onMouseLeave={(e) => hideButton(e)}
    >
      <Image src={placeholderIcon} alt="Placeholder icon" width={400} height={180} />
      <div className={`${styles.miniChartButton} ${display && styles.display}`}>
        <Button>View asset</Button>
      </div>
    </div>
  );
};
