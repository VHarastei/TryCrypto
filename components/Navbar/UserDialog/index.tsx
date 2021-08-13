import Image from 'next/image';
import React from 'react';
import styles from './UserDialog.module.scss';
import userIcon from 'public/static/user.svg';
import verifiedIcon from 'public/static/verified.svg';
import unVerifiedIcon from 'public/static/unverified.svg';
import verificationIcon from 'public/static/verification.svg';
import referralIcon from 'public/static/referral.svg';
import logoutIcon from 'public/static/logout.svg';
import { useState } from 'react';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/selectors';
import { Typography } from 'components/Typography';
import Link from 'next/link';

export const UserDialog = React.memo(() => {
  const [display, setDisplay] = useState(false);
  const user = useSelector(selectUser);
  if (!user) return null;

  const arr = user.email.split('@');
  const email = `${arr[0].slice(0, 2)}***@${arr[1]}`;

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={() => setDisplay(true)}>
        <Image src={userIcon} alt="User icon" width={40} height={40} />
      </div>
      {display && (
        <div className={styles.dropDown} onClick={() => setDisplay(false)}>
          <RemoveScrollBar />
          <div className={styles.dropDownMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.title}>{email}</div>
            <div className={styles.subTitleContainer}>
              <div className={styles.subTitle}>
                UID: <Typography color="white">2345235</Typography>
              </div>
              <div
                className={`${styles.verification} ${
                  user.confirmed ? styles.verified : styles.unVerified
                }`}
              >
                <Image
                  src={user.confirmed ? verifiedIcon : unVerifiedIcon}
                  alt="verification icon"
                  width={22}
                  height={22}
                />
                <Typography fw={'fw-500'} fs="fs-14" color={user.confirmed ? 'green' : 'red'}>
                  {user.confirmed ? 'Verified' : 'Unverified'}
                </Typography>
              </div>
            </div>
            <Link href="/verification">
              <a className={styles.dropDownMenuItem}>
                <Image src={verificationIcon} alt="verificationIcon" width={30} height={30} />
                <span>Verification</span>
              </a>
            </Link>
            <Link href="/referral">
              <a className={styles.dropDownMenuItem}>
                <Image src={referralIcon} alt="referralIcon" width={30} height={30} />
                <span>Referral</span>
              </a>
            </Link>
            <Link href="/logout">
              <a className={`${styles.dropDownMenuItem} ${styles.dropDownMenuLogout}`}>
                <Image src={logoutIcon} alt="logoutIcon" width={30} height={30} />
                <span>Log Out</span>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
});
