import { Button } from 'components/Button';
import { LandingLayout } from 'components/LandingLayout';
import React from 'react';
import styles from './index.module.scss';
import portfolioImg from 'public/static/portfolio.png';
import coinGeckoImg from 'public/static/coinGecko.png';
import cryptoIcon from 'public/static/cryptocurrencies.svg';
import marketIcon from 'public/static/market.svg';
import tollIcon from 'public/static/toll.svg';
import githubIcon from 'public/static/github.svg';
import linkedinIcon from 'public/static/linkedin.svg';
import lineChartIcon from 'public/static/lineChart.svg';
import portfolioIcon from 'public/static/portfolio.svg';
import Image from 'next/image';
import { MiniChart } from 'components/Watchlist';
import { EducationCard } from 'components/EducationCard';
import logoIcon from 'public/static/logo.png';
import { Typography } from 'components/Typography';
import Link from 'next/link';

export default function Landing() {
  return (
    <LandingLayout>
      <div className={styles.alignContainer}>
        <div className={styles.title}>
          <div>
            <div className={styles.titleText}>Buy & sell Crypto in minutes</div>
            <div className={styles.titleSubText}>Join and try crypto with TryCrypto exchange</div>
            <Button className={styles.titleButton}>Register Now</Button>
          </div>
          <div>
            <Image src={cryptoIcon} width={170} height={170} />
          </div>
        </div>
        <div className={styles.charts}>
          <MiniChart currencyId="bitcoin" />
          <MiniChart currencyId="ethereum" />
          <MiniChart currencyId="binancecoin" />
          <MiniChart currencyId="litecoin" />
        </div>
        <div className={styles.background}>
          <div className={styles.alignContainer}>
            <div className={styles.content}>
              <div className={styles.contentText}>Create your cryptocurrency portfolio today</div>
              <div className={styles.contentSubText}>
                TryCrypto has a variety of features that make it the best place to try crypto
              </div>
              <div className={styles.portfolioContent}>
                <div className={styles.portfolioImgContainer}>
                  <Image
                    src={portfolioImg}
                    className={styles.portfolioImg}
                    width={766}
                    height={448}
                  />
                </div>
                <div className={styles.portfolioFeatures}>
                  <PortfolioFeature
                    icon={portfolioIcon}
                    title="Manage your portfolio"
                    subTitle="Buy and sell popular digital currencies, keep track of them in the one place."
                  />
                  <PortfolioFeature
                    icon={marketIcon}
                    title="Profit and loss analysis"
                    subTitle="Daily report of your profit and loss in a convenient form."
                  />
                  <PortfolioFeature
                    icon={tollIcon}
                    title="Large number of cryptocurrencies"
                    subTitle="More than 10,000 modern cryptocurrencies are available"
                  />
                  <PortfolioFeature
                    icon={lineChartIcon}
                    title="Market overview"
                    subTitle="Track price, volume, market capitalization and explore the charts of cryptocurrency prices"
                  />
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentText}>Earn up to $300 worth of crypto</div>
              <div className={styles.contentSubText}>
                Discover how specific cryptocurrencies work — and get a bit of each crypto to try
                out for yourself.
              </div>
              <div className={styles.contentEducation}>
                <EducationCard />
                <EducationCard />
                <EducationCard />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.startNow}>
          <div className={styles.startNowTitle}>Start trading now</div>
          <Button>Register Now</Button>
        </div>
        <div className={styles.background}>
          <div className={styles.alignContainer}>
            <div className={styles.footer}>
              <div className={styles.footerContact}>
                <div className={styles.footerContactImg}>
                  <Link href="https://github.com/VHarastei">
                    <a target="_blank">
                      <Image layout="fixed" src={githubIcon} width={42} height={42} />
                    </a>
                  </Link>
                  <Link href="https://www.linkedin.com/in/%D0%B2%D0%B0%D1%81%D1%8F-%D0%B3%D0%B0%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%B9-869769186/">
                    <a target="_blank">
                      <Image layout="fixed" src={linkedinIcon} width={42} height={42} />
                    </a>
                  </Link>
                </div>
                <div className={styles.footerContactText}>
                  <Typography variant="mediumText" color="gray">
                    Contact us
                  </Typography>
                  <Typography variant="regularText" color="gray">
                    garastey.vas@gmail.com
                  </Typography>
                </div>
              </div>
              <div className={styles.logoContainer}>
                <Image src={logoIcon} alt="Logo icon" width={42} height={38} />
                <span>TryCrypto</span>
              </div>
              <div className={styles.gecko}>
                <Link href="https://www.coingecko.com/">
                  <a target="_blank">
                    <Image src={coinGeckoImg} alt="Logo icon" width={160} height={50} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

type PropsType = {
  title: string;
  subTitle: string;
  icon: StaticImageData;
};

const PortfolioFeature: React.FC<PropsType> = ({ title, subTitle, icon }) => {
  return (
    <div className={styles.feature}>
      <div className={styles.featureImg}>
        <Image layout="fixed" src={icon} width={36} height={36} />
      </div>
      <div className={styles.featureContent}>
        <div className={styles.featureTitle}>{title}</div>
        <div className={styles.featureSubTitle}>{subTitle}</div>
      </div>
    </div>
  );
};
