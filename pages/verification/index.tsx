import React from 'react';
import styles from './Verification.module.scss';
import { Layout } from 'components/Layout';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import securityIcon from 'public/static/security.svg';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/selectors';
import { wrapper } from 'store';
import { checkAuth } from 'utils/checkAuth';
import { Paper } from 'components/Paper';
import { Api } from 'api';

export default function Verification() {
  const user = useSelector(selectUser);

  const handleSendEmail = () => {
    Api().sendEmail();
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Paper className={styles.content}>
          <div>
            <div className={styles.title}>Verify your email address</div>
            <Typography color="gray" fs="fs-18" className={styles.subTitle}>
              {`Receive $50 by verifying, we will send to you email: ${user?.email} verication message`}
            </Typography>
            <Button className={styles.button}>Send</Button>
          </div>
          <Image layout="fixed" src={securityIcon} width={200} height={150} />
        </Paper>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  try {
    const isRedirect = await checkAuth(store, req.cookies.token);
    if (isRedirect) return isRedirect;

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
