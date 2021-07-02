import { Card } from 'components/Card';
import { formatDollar } from 'helpers/formatDollar';
import { formatPercent } from 'helpers/formatPercent';
import React from 'react';
import styles from './PriceStatistics.module.scss';
import { PriceStatisticsGroup } from './PriceStatisticsGroup';
import { PriceStatisticsItem } from './PriceStatisticsItem';

type PropsType = {
  currency: string;
  data: any;
};

export const PriceStatistics: React.FC<PropsType> = ({ currency, data }) => {
  return (
    <Card title={`${currency} Statistics`} withPadding>
      <PriceStatisticsGroup title={`${currency} Price Today`}>
        <PriceStatisticsItem
          title={'Current price'}
          value={formatDollar(data.current_price.usd, 20)}
        />
        <PriceStatisticsItem
          title={'Price change 24h'}
          value={formatDollar(data.price_change_24h, 20)}
        />
        <PriceStatisticsItem title={'24h Low'} value={formatDollar(data.low_24h.usd, 20)} />
        <PriceStatisticsItem title={'24h High'} value={formatDollar(data.high_24h.usd, 20)} />
        <PriceStatisticsItem
          title={'Trading Volume 24h'}
          value={formatDollar(data.total_volume.usd, 20)}
        />
        <PriceStatisticsItem title={'Market Rank'} value={`#${data.market_cap_rank}`} />
      </PriceStatisticsGroup>
      <PriceStatisticsGroup title={`${currency} Market Cap`}>
        <PriceStatisticsItem title={'Market Cap'} value={formatDollar(data.market_cap.usd, 20)} />
        <PriceStatisticsItem
          title={'Market Cap Change 24h'}
          value={formatPercent(data.market_cap_change_percentage_24h)}
        />
      </PriceStatisticsGroup>
      <PriceStatisticsGroup title={`${currency} Price History`}>
        <PriceStatisticsItem title={'All Time High'} value={formatDollar(data.ath.usd, 20)} />
        <PriceStatisticsItem title={'All Time Low'} value={formatDollar(data.atl.usd, 20)} />
      </PriceStatisticsGroup>
    </Card>
  );
};
