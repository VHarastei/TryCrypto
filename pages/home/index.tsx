import { Banner } from 'components/Banner';
import { Card } from 'components/Card';
import { Layout } from 'components/Layout';
import { Watchlist } from 'components/Watchlist';
import React from 'react';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
        <Banner
          title="Get $50 free"
          text="Confirm your email address and get bonus"
          button="Confirm email"
        />
        {/* <Card title="Watchlist">content</Card> */}
        <Watchlist />
        <Banner
          title="Earn free crypto with TryCrypto education"
          text="Learn about different cryptocurrencies and earn them for free!"
          button="Earn crypto"
        />
      </Layout>
    </div>
  );
}
