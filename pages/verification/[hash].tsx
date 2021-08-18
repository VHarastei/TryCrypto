import { Button } from 'components/Button';
import { LandingLayout } from 'components/LandingLayout';
import { Paper } from 'components/Paper';
import { Typography } from 'components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import checkIcon from 'public/static/check.svg';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVerify } from 'store/slices/userSlice';
import styles from './Verification.module.scss';

export default function HashVerification() {
  const router = useRouter();
  const { hash } = router.query as { hash: string };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVerify(hash));
  }, [dispatch, router, hash]);

  return (
    <LandingLayout>
      <div className={styles.container}>
        <Paper className={styles.hashContent}>
          <Image alt="check icon" layout="fixed" src={checkIcon} width={100} height={100} />
          <div className={styles.title}>Thank you</div>
          <Typography color="gray" fs="fs-18" className={styles.subTitle}>
            You have verified your email
          </Typography>
          <Link href="/">
            <a>
              <Button className={styles.button}>Go to the Home page</Button>
            </a>
          </Link>
        </Paper>
      </div>
    </LandingLayout>
  );
}
