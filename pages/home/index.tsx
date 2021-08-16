import { Api } from 'api';
import { Banner } from 'components/Banner';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { EducationCard } from 'components/EducationCard';
import { Layout } from 'components/Layout';
import { Paper } from 'components/Paper';
import { PortfolioBalanceCard } from 'components/PortfolioBalanceCard';
import { Typography } from 'components/Typography';
import { Watchlist } from 'components/Watchlist';
import Image from 'next/image';
import btcIcon from 'public/static/btc.png';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from 'store';
import { selectUserAssets, selectUserPortfolio } from 'store/selectors';
import { fetchUserAssets } from 'store/slices/assetsSlice';
import { setUserWatchlist } from 'store/slices/watchlistSlice';
import { checkAuth } from 'utils/checkAuth';
import styles from './Home.module.scss';

export default function Home() {
  const portfolio = useSelector(selectUserPortfolio);
  const assets = useSelector(selectUserAssets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserAssets());
  }, []);

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
        <PortfolioBalanceCard assets={assets} balance={portfolio.balance} />

        <Card title="Invite a friend and get bonus" withPadding>
          <Typography variant="regularText" color="gray">
            Invite a friend and you will both receive $50 in USDT when they successfully verify
            email address
          </Typography>
          <div className={styles.inviteUrl}>https://trycrypto.com/invite/sdfr24csfd</div>
          <Button fullWidth>Copy link</Button>
        </Card>
      </ContentLayout>
      <Card title="Education" transparent>
        <div className={styles.educationContainer}>
          <EducationCard />
          <EducationCard />
          <EducationCard />
        </div>
      </Card>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  try {
    const isRedirect = await checkAuth(store, req.cookies.token);
    if (isRedirect) return isRedirect;

    const watchlist = await Api(req.cookies.token).getUserWatchlist();
    store.dispatch(setUserWatchlist(watchlist));
    return {
      props: {},
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
});
