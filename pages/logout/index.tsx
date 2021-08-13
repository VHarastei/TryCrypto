import { LandingLayout } from 'components/LandingLayout';
import { Typography } from 'components/Typography';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { wrapper } from 'store';
import { setUserData } from 'store/slices/userSlice';
import styles from './Logout.module.scss';

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    Cookies.remove('token');
    router.push('/');
  }, []);

  return (
    <LandingLayout>
      <div className={styles.container}>
        <div className={styles.title}>Logout...</div>
        <Typography fs="fs-18" color="gray">
          Please wait a few seconds
        </Typography>
      </div>
    </LandingLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  store.dispatch(setUserData(null));
  return {
    props: {},
  };
});
