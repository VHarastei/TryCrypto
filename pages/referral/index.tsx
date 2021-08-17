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
import { Api } from 'api';
import { CopyButton } from 'components/CopyButton';

type PropsType = {
  numberOfReferrals: number;
};

export default function Referral({ numberOfReferrals }: PropsType) {
  const user = useSelector(selectUser);

  return (
    <Layout>
      <div className={styles.container}>
        <Paper className={styles.content}>
          <div className={styles.title}>Get $50 for Every Friend</div>
          <Typography color="gray" fs="fs-18" className={styles.subTitle}>
            The more the merrier! Get another $50 every time someone uses your link and verify email
            address
          </Typography>
          {user && (
            <div className={styles.link}>
              <span>{`localhost:3000/register?ref=${user.referralLink}`}</span>
              <CopyButton refCode={user.referralLink} className={styles.button} />
            </div>
          )}
        </Paper>
        <Paper className={styles.content}>
          <div className={styles.statTitle}>Statistics</div>
          <div className={styles.statContainer}>
            <div className={styles.statItem}>
              <div className={styles.statItemTitle}>{(numberOfReferrals * 50).toFixed(2)}</div>
              <Typography fs="fs-18" color="gray">
                USDT Earned
              </Typography>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statItemTitle}>{numberOfReferrals}</div>
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
    const token = req.cookies.token;
    const isRedirect = await checkAuth(store, token);
    if (isRedirect) return isRedirect;

    const numberOfReferrals = await Api(token).getNumberOfReferrals();
    return { props: { numberOfReferrals } };
  } catch (err) {
    console.log(err);
    return { props: { numberOfReferrals: 0 } };
  }
});
