import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
import { Typography } from 'components/Typography';
import Image from 'next/image';
import React from 'react';
import styles from './EducationCard.module.scss';
import btcIcon from 'public/static/btc.png';

type PropsTypes = {};

export const EducationCard: React.FC<PropsTypes> = React.memo(function EducationCard() {
  return (
    <Paper className={styles.education}>
      <div className={styles.educationCurrency}>
        <Image layout="fixed" src={btcIcon} alt={`btc icon`} width={48} height={48} />
        <Typography className={styles.educationCurrencyName} fs="fs-22" fw="fw-500">
          Bitcoin
        </Typography>
        <Typography fs="fs-22" fw="fw-500" color="gray">
          BTC
        </Typography>
      </div>
      <Typography variant="regularText" color="gray">
        A decentralized digital currency, without a central bank or single administrator, that can
        be sent from user to user on the peer-to-peer bitcoin network without the need for
        intermediaries
      </Typography>
      <Button fullWidth className={styles.educationBtn}>
        Learn more
      </Button>
    </Paper>
  );
});
