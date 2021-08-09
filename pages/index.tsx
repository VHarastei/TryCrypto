import { Button } from 'components/Button';
import { LandingLayout } from 'components/LandingLayout';
import React from 'react';
import styles from './index.module.scss';
import portfolioImg from 'public/static/portfolio.png';
import cryptoIcon from 'public/static/cryptocurrencies.svg';
import marketIcon from 'public/static/market.svg';
import tollIcon from 'public/static/toll.svg';
import lineChartIcon from 'public/static/lineChart.svg';
import portfolioIcon from 'public/static/portfolio.svg';
import Image from 'next/image';
import { MiniChart } from 'components/Watchlist';

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
            <div className={styles.portfolio}>
              <div className={styles.portfolioText}>Create your cryptocurrency portfolio today</div>
              <div className={styles.portfolioSubText}>
                TryCrypto has a variety of features that make it the best place to try crypto
              </div>
              <div className={styles.portfolioContent}>
                <Image src={portfolioImg} width={766} height={448} />
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
