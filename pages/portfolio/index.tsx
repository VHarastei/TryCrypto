import { Api } from 'api';
import { BarChart } from 'components/BarChart';
import { Card } from 'components/Card';
import { ContentLayout } from 'components/ContentLayout';
import { Layout } from 'components/Layout';
import { CustomChart } from 'components/MarketChart/CustomChart';
import { Paper } from 'components/Paper';
import { PieChart } from 'components/PieChart';
import { PriceChangeField } from 'components/PriceChangeField';
import { RecentTransactions } from 'components/RecentTransactions';
import { Typography } from 'components/Typography';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from 'store';
import { selectUserAssets, selectUserPortfolio } from 'store/selectors';
import { Asset, setUserAssets, setUserPortfolio } from 'store/slices/userSlice';
import { formatDollar } from 'utils/formatDollar';
import styles from './Portfolio.module.scss';

export default function Portfolio() {
  const data = useSelector(selectUserPortfolio);
  const assets = useSelector(selectUserAssets);

  //if (!data) return <div>nema</div>;
  //console.log(new Date(data?.historicalData.balance[0].date).getTime());

  return (
    <Layout>
      <Paper className={styles.header}>
        <div className={styles.headerItem}>
          <Typography variant="mediumText" color="gray">
            Estimated Balance
          </Typography>
          <div className={styles.headerItemValueContainer}>
            <span className={styles.headerItemValue}>{formatDollar(data.balance, 20)}</span>
          </div>
        </div>
        <div className={styles.headerPnls}>
          <div className={styles.headerItem}>
            <Typography variant="mediumText" color="gray">
              Yesterday's PNL
            </Typography>
            <div className={styles.headerItemValueContainer}>
              <span className={styles.headerItemValue}>
                {`${data.yesterdaysPNL.usdValue > 0 ? '+' : ''}${formatDollar(
                  data.yesterdaysPNL.usdValue,
                  20
                )}`}
              </span>
              <PriceChangeField
                fs="fs-16"
                fw="fw-500"
                value={data.yesterdaysPNL.usdValueChangePercetage}
              />
            </div>
          </div>
          <div className={styles.headerItem}>
            <Typography variant="mediumText" color="gray">
              30 day's PNL
            </Typography>
            <div className={styles.headerItemValueContainer}>
              <span className={styles.headerItemValue}>
                {`${data.thirtydaysPNL.usdValue > 0 ? '+' : ''}${formatDollar(
                  data.thirtydaysPNL.usdValue,
                  20
                )}`}
              </span>
              <PriceChangeField
                fs="fs-16"
                fw="fw-500"
                value={data.thirtydaysPNL.usdValueChangePercetage}
              />
            </div>
          </div>
        </div>
      </Paper>
      <ContentLayout type="halfs">
        <Card title="Asset Net Worth">
          <CustomChart
            data={data.historicalData.balance.map((balance) => {
              return [new Date(balance.date).getTime(), balance.usdValue];
            })}
            dataInterval={'30'}
          />
        </Card>
        <Card title="Daily PNL">
          <BarChart />
        </Card>
      </ContentLayout>
      <ContentLayout type="halfs">
        <div>
          <Card title="Your Assets">
            <div className={styles.assetsTable}>
              <div className={styles.assetsTableHeader}>
                <Typography className={styles.assetsTableAsset} color="gray">
                  Asset
                </Typography>
                <Typography className={styles.assetsTableAmount} color="gray">
                  Amount
                </Typography>
                <Typography className={styles.assetsTablePrice} color="gray">
                  Price
                </Typography>
              </div>
              <div>
                {assets.map((asset) => {
                  return <AssetsTableRow asset={asset} />;
                })}
              </div>
            </div>
          </Card>
        </div>
        <div className={styles.allocationContainer}>
          <div>
            <Card title="Asset Allocation" withPadding>
              <PieChart data={assets} />
            </Card>
          </div>
          <div>
            <RecentTransactions transactions={data.recentTransactions} />
          </div>
        </div>
      </ContentLayout>
    </Layout>
  );
}

type AssetsTableRowPropsType = {
  asset: Asset;
};
const AssetsTableRow: React.FC<AssetsTableRowPropsType> = ({ asset }) => {
  return (
    <Link href={`market/${asset.currency.id}`}>
      <a className={styles.tableRowContainer}>
        <div className={styles.assetsTableAsset}>
          <img
            src={asset.currency.image}
            alt={`${asset.currency.symbol} icon`}
            width={30}
            height={30}
          />
          <div className={styles.assetsTableAssetName}>
            <Typography variant="regularText">{asset.currency.name}</Typography>
          </div>
          <Typography variant="regularText" color="gray">
            {asset.currency.symbol.toUpperCase()}
          </Typography>
        </div>

        <Typography className={styles.assetsTableAmount}>{asset.amount}</Typography>
        <Typography className={styles.assetsTablePrice}>
          {formatDollar(asset.usdValue, 20)}
        </Typography>
      </a>
    </Link>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  try {
    const data = await Api().getUserPortfolio();
    const { assets, ...portfolio } = data;
    store.dispatch(setUserPortfolio(portfolio));
    store.dispatch(setUserAssets(assets));
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
