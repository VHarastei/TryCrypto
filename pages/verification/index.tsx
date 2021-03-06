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
import Link from 'next/link';
import { useState } from 'react';

export default function Verification() {
  const user = useSelector(selectUser);
  const [counter, setCounter] = useState(0);

  const handleSendEmail = () => {
    Api().sendEmail();
    setCounter(60);
  };

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <Layout>
      <div className={styles.container}>
        <Paper className={styles.content}>
          {!user?.verified ? (
            <div>
              <div className={styles.title}>Verify your email address</div>
              <Typography color="gray" fs="fs-18" className={styles.subTitle}>
                {`Receive $50 by verifying, we will send to you email: ${user?.email} verication message`}
              </Typography>
              <Button disabled={!!counter} onClick={handleSendEmail} className={styles.button}>
                {counter ? `Resend after ${counter}s` : 'Send'}
              </Button>
            </div>
          ) : (
            <div>
              <div className={styles.title}>Thank you</div>
              <Typography color="gray" fs="fs-18" className={styles.subTitle}>
                You had already verified your email address, we send to you $50 in USDT check you
                portfolio
              </Typography>
              <Link href="/portfolio">
                <a>
                  <Button className={styles.button}>Go to Portfolio page</Button>
                </a>
              </Link>
            </div>
          )}
          <div className={styles.icon}>

          <Image alt="security icon" layout="fixed" src={securityIcon} width={200} height={150} />
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
