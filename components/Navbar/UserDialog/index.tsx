import clsx from 'clsx';
import { Typography } from 'components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import logoutIcon from 'public/static/logout.svg';
import referralIcon from 'public/static/referral.svg';
import unVerifiedIcon from 'public/static/unverified.svg';
import userIcon from 'public/static/user.svg';
import verificationIcon from 'public/static/verification.svg';
import verifiedIcon from 'public/static/verified.svg';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { selectUser } from 'store/selectors';
import styles from './UserDialog.module.scss';

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
                UID: <Typography color="white">{user.id}</Typography>
              </div>
              <div
                className={clsx(
                  styles.verification,
                  user.verified ? styles.verified : styles.unVerified
                )}
              >
                <Image
                  src={user.verified ? verifiedIcon : unVerifiedIcon}
                  alt="verification icon"
                  width={22}
                  height={22}
                />
                <Typography fw={'fw-500'} fs="fs-14" color={user.verified ? 'green' : 'red'}>
                  {user.verified ? 'Verified' : 'Unverified'}
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
              <a className={clsx(styles.dropDownMenuItem, styles.dropDownMenuLogout)}>
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
