import { Api } from 'api';
import { ChartIntervalProvider } from 'components/ChartIntervalProvider';
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
import { Asset } from 'store/slices/types';
import {
  fetchHistoricalBalanceData,
  fetchHistoricalPnlData,
  setUserPortfolio,
} from 'store/slices/userSlice';
import { formatDollar } from 'utils/formatDollar';
import styles from './Portfolio.module.scss';
import { setUserAssets } from 'store/slices/assetsSlice';
import { checkAuth } from 'utils/checkAuth';
import Image from 'next/image';

export default function Portfolio() {
  const data = useSelector(selectUserPortfolio);
  const assets = useSelector(selectUserAssets);

  return (
    <Layout>
      <Paper className={styles.header}>
        <div className={styles.headerItem}>
          <Typography fs="fs-16" fw="fw-500" color="gray">
            Estimated Balance
          </Typography>
          <div className={styles.headerItemValueContainer}>
            <span className={styles.headerItemValue}>{formatDollar(data.balance, 20)}</span>
          </div>
        </div>
        <div className={styles.headerPnls}>
          <div className={styles.headerItem}>
            <Typography fs="fs-16" fw="fw-500" color="gray">
              Yesterday`s PNL
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
            <Typography fs="fs-16" fw="fw-500" color="gray">
              30 day`s PNL
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
        <ChartIntervalProvider
          title="Asset Net Worth"
          Chart={CustomChart}
          handleFetch={fetchHistoricalBalanceData}
          data={data.historicalData.balance}
          // data={[
          //   [1625961600000, 33704.53847440508],
          //   [1626048000000, 34299.938016517444],
          //   [1626134400000, 33262.6543524462],
          //   [1626220800000, 32676.38380096018],
          //   [1626307200000, 32878.50187357147],
          //   [1626393600000, 31726.038833909817],
          //   [1626480000000, 31399.653128682126],
          //   [1626566400000, 31588.6713510167],
          //   [1626652800000, 31919.393922554555],
          //   [1626739200000, 30928.211908849244],
          //   [1626825600000, 29971.903783612062],
          //   [1626912000000, 32383.78112696872],
          //   [1626998400000, 32409.499767175417],
          //   [1627084800000, 33455.55127272261],
          //   [1627171200000, 34213.59993217662],
          //   [1627257600000, 35456.124660766836],
          //   [1627344000000, 37281.91809217662],
          //   [1627430400000, 39076.59377063225],
          //   [1627516800000, 40031.19824444798],
          //   [1627603200000, 39977.75693922764],
          //   [1627689600000, 41936.261478677225],
          //   [1627776000000, 41754.16660435275],
          //   [1627862400000, 39914.82975848789],
          //   [1627948800000, 39278.766508103676],
          //   [1628035200000, 38368.35401197897],
          //   [1628121600000, 39751.58457509862],
          //   [1628208000000, 40825.381940449704],
          //   [1628294400000, 42802.13717474142],
          //   [1628380800000, 44647.57760300116],
          //   [1628467200000, 43753.217862646314],
          //   [1628518133000, 45485.442186861306],
          // ]}
        />

        <ChartIntervalProvider
          title="Daily PNL"
          Chart={BarChart}
          withAxies
          handleFetch={fetchHistoricalPnlData}
          data={data.historicalData.PNL}
        />
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
                  return <AssetsTableRow key={asset.id} asset={asset} />;
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
const AssetsTableRow: React.FC<AssetsTableRowPropsType> = React.memo(({ asset }) => {
  return (
    <Link href={`market/${asset.currency.id}`}>
      <a className={styles.tableRowContainer}>
        <div className={styles.assetsTableAsset}>
          <Image
            src={asset.currency.image}
            alt={`${asset.currency.symbol} icon`}
            width={30}
            height={30}
          />
          <div className={styles.assetsTableAssetName}>
            <Typography variant="regularText">{asset.currency.name}</Typography>
          </div>
          <Typography className={styles.assetsTableAssetSymbol} variant="regularText" color="gray">
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
});

AssetsTableRow.displayName = 'AssetsTableRow';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  try {
    const isRedirect = await checkAuth(store, req.cookies.token);
    if (isRedirect) return isRedirect;

    const data = await Api(req.cookies.token).getUserPortfolio();
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
