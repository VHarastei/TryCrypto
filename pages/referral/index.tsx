import { Button } from 'components/Button';
import { Layout } from 'components/Layout';
import { Paper } from 'components/Paper';
import { Typography } from 'components/Typography';
import React from 'react';
import styles from './Referral.module.scss';
import securityIcon from 'public/static/security.svg';
import Image from 'next/image';
import { useState } from 'react';
import { selectUser } from 'store/selectors';
import { useSelector } from 'react-redux';
import { wrapper } from 'store';
import { checkAuth } from 'utils/checkAuth';

export default function Referral() {
  const user = useSelector(selectUser);

  const [copied, setCopied] = useState(false);
  const referralLink = `http://localhost:3000/invite/${user?.referralLink}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Paper className={styles.content}>
          <div className={styles.title}>Get $50 for Every Friend</div>
          <Typography color="gray" fs="fs-18" className={styles.subTitle}>
            The more the merrier! Get another $50 every time someone uses your link and verify email
            address
          </Typography>
          <div className={styles.link}>
            <span>{referralLink}</span>
            <Button onClick={handleCopy} className={styles.button}>
              {!copied ? 'Copy' : 'Copied'}
            </Button>
          </div>
        </Paper>
        <Paper className={styles.content}>
          <div className={styles.statTitle}>Statistics</div>
          <div className={styles.statContainer}>
            <div className={styles.statItem}>
              <div className={styles.statItemTitle}>200.00</div>
              <Typography fs="fs-18" color="gray">
                USDT Earned
              </Typography>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statItemTitle}>2</div>
              <Typography fs="fs-18" color="gray">
                Friends Referred
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  try {
    const isRedirect = await checkAuth(store, req.cookies.token);
    if (isRedirect) return isRedirect;

    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
});
