import { Banner } from 'components/Banner';
import { Card } from 'components/Card';
import { Layout } from 'components/Layout';
import { RecentTransactions } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import { Watchlist } from 'components/Watchlist';
import React from 'react';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <Layout>
      <Banner
        title="Get $50 free"
        text="Confirm your email address and get bonus"
        button="Confirm email"
      />
      <Watchlist />
      <Banner
        title="Earn free crypto with TryCrypto education"
        text="Learn about different cryptocurrencies and earn them for free!"
        button="Earn crypto"
      />
      <div className={styles.miniPortfolio}>
        <Card title="Your portfolio" button={{ name: 'Total Balance ≈ $0.00', href: '/' }}>
          <h2>Pie chart</h2>
          <h2>Pie chart</h2>
          <h2>Pie chart</h2>
          <h2>Pie chart</h2>
          <h2>Pie chart</h2>
        </Card>
        <RecentTransactions withPadding />
      </div>
    </Layout>
  );
}
