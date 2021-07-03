import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { format, parseISO } from 'date-fns';
import { formatDollar } from 'helpers/formatDollar';
import { formatPercent } from 'helpers/formatPercent';
import React from 'react';
import styles from './PriceStatistics.module.scss';
import { PriceStatisticsGroup } from './PriceStatisticsGroup';
import { PriceStatisticsItem } from './PriceStatisticsItem';

type PropsType = {
  currency: string;
  symbol: string;
  data: any;
};

export const PriceStatistics: React.FC<PropsType> = ({ currency, symbol, data }) => {
  const [show, setShow] = React.useState(false);

  const handleChangeShow = () => {
    setShow((prev) => !prev);
  };

  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 10,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Card title={`${currency} Statistics`} withPadding>
      <PriceStatisticsGroup title={`${currency} Price Today`}>
        <PriceStatisticsItem
          title={'Current price'}
          value={formatDollar(data.current_price.usd, 20)}
        />
        <PriceStatisticsItem
          title={'Price change 24h'}
          value={formatDollar(data.price_change_24h.toFixed(6), 20)}
          subValue={formatPercent(data.price_change_percentage_24h)}
        />
        <PriceStatisticsItem title={'24h Low'} value={formatDollar(data.low_24h.usd, 20)} />
        <PriceStatisticsItem title={'24h High'} value={formatDollar(data.high_24h.usd, 20)} />
        <PriceStatisticsItem
          title={'Trading Volume 24h'}
          value={formatDollar(data.total_volume.usd, 20)}
        />
      </PriceStatisticsGroup>
      <PriceStatisticsGroup title={`${currency} Market Cap`}>
        <PriceStatisticsItem
          title={'Market Cap'}
          value={formatDollar(data.market_cap.usd, 20)}
          subValue={formatPercent(data.market_cap_change_percentage_24h)}
        />
        <PriceStatisticsItem
          title={'Market Cap Rank'}
          value={`#${data.market_cap_rank ? data.market_cap_rank : 0}`}
        />
      </PriceStatisticsGroup>
      {show && (
        <div>
          <PriceStatisticsGroup title={`${currency} Price History`}>
            <PriceStatisticsItem
              title={'All Time High'}
              value={formatDollar(data.ath.usd, 20)}
              subValue={formatPercent(data.ath_change_percentage.usd)}
              subTitle={format(parseISO(data.ath_date.usd), 'MMM dd, yyyy')}
            />
            <PriceStatisticsItem
              title={'All Time Low'}
              value={formatDollar(data.atl.usd, 20)}
              subValue={formatPercent(data.atl_change_percentage.usd)}
              subTitle={format(parseISO(data.atl_date.usd), 'MMM dd, yyyy')}
            />
            {data.price_change_percentage_1h_in_currency.usd && (
              <PriceStatisticsItem
                title={'Price change 1h'}
                subValue={formatPercent(data.price_change_percentage_1h_in_currency.usd)}
              />
            )}
            <PriceStatisticsItem
              title={'Price change 24h'}
              subValue={formatPercent(data.price_change_percentage_24h_in_currency.usd)}
            />
            <PriceStatisticsItem
              title={'Price change 7d'}
              subValue={formatPercent(data.price_change_percentage_7d_in_currency.usd)}
            />
            <PriceStatisticsItem
              title={'Price change 14d'}
              subValue={formatPercent(data.price_change_percentage_14d_in_currency.usd)}
            />
            <PriceStatisticsItem
              title={'Price change 30d'}
              subValue={formatPercent(data.price_change_percentage_30d_in_currency.usd)}
            />
            <PriceStatisticsItem
              title={'Price change 60d'}
              subValue={formatPercent(data.price_change_percentage_60d_in_currency.usd)}
            />
            <PriceStatisticsItem
              title={'Price change 200d'}
              subValue={formatPercent(data.price_change_percentage_200d_in_currency.usd)}
            />
          </PriceStatisticsGroup>
          <PriceStatisticsGroup title={`${currency} Supply`}>
            <PriceStatisticsItem
              title={'Circulating Supply'}
              value={`${formatCurrency(data.circulating_supply)} ${symbol.toUpperCase()}`}
            />
            <PriceStatisticsItem
              title={'Max Supply'}
              value={
                data.max_supply ? `${formatCurrency(data.max_supply)} ${symbol.toUpperCase()}` : '∞'
              }
            />
          </PriceStatisticsGroup>
        </div>
      )}

      <Button className={styles.showBtn} onClick={handleChangeShow}>
        {`Show ${show ? 'Less' : 'More'}`}
      </Button>
    </Card>
  );
};
