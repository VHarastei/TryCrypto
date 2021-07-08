import { Banner } from 'components/Banner';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { RecentTransactions } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import { Watchlist } from 'components/Watchlist';
import React from 'react';
import styles from './Home.module.scss';
import btcIcon from 'public/static/btc.png';
import Image from 'next/image';
import { Button } from 'components/Button';
import { Paper } from 'components/Paper';
import { VictoryPie } from 'victory';
import { PieChart } from 'components/PieChart';

export default function Home() {
  return (
    <Layout>
      <Banner
        title="Learn and earn crypto with TryCrypto Education"
        text="Learn about cryptocurrencies like Bitcoin, Ethereum, Binance Coin and earn them for free!"
        button="Earn crypto"
      />
      <Watchlist />
      <Banner
        title="Get $50 free"
        text="Confirm your email address and get bonus"
        button="Confirm email"
      />
      <ContentLayout>
        <Card title="Portfolio balance" withPadding>
          <PieChart />
        </Card>

        <Card title="Invite a friend and get bonus" withPadding>
          <Typography variant="regularText" color="gray">
            Invite a friend and you will both receive $20 when they confirm email and buy crypto for
            $50 or more
          </Typography>
          <div className={styles.inviteUrl}>https://trycrypto.com/invite/sdfr24csfd</div>
          <Button fullWidth>Copy link</Button>
        </Card>
      </ContentLayout>
      <Card title="Education" transparent>
        <div className={styles.educationContainer}>
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
              A decentralized digital currency, without a central bank or single administrator, that
              can be sent from user to user on the peer-to-peer bitcoin network without the need for
              intermediaries
            </Typography>
            <Button fullWidth className={styles.educationBtn}>
              Learn more
            </Button>
          </Paper>
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
              A decentralized digital currency, without a central bank or single administrator, that
              can be sent from user to user on the peer-to-peer bitcoin network without the need for
              intermediaries
            </Typography>
            <Button fullWidth className={styles.educationBtn}>
              Learn more
            </Button>
          </Paper>
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
              A decentralized digital currency, without a central bank or single administrator, that
              can be sent from user to user on the peer-to-peer bitcoin network without the need for
              intermediaries
            </Typography>
            <Button fullWidth className={styles.educationBtn}>
              Learn more
            </Button>
          </Paper>
        </div>
      </Card>
    </Layout>
  );
}
