import { format } from 'date-fns';
import { formatDollar } from 'utils/formatDollar';
import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryVoronoiContainer } from 'victory';

type PropsType = {
  data: { x: number; y: number }[];
};

export const BarChart: React.FC<PropsType> = React.memo(function BarChart({ data }) {
  // data = dailyPNL.map((i) => {
  //   return { x: i[0], y: i[1] };
  // });
  return (
    <VictoryChart
      animate={{ duration: 300, onLoad: { duration: 300 } }}
      width={1000}
      height={400}
      padding={{ left: 0, top: 32, bottom: 32, right: 0 }}
      domainPadding={{ x: 50, y: 20 }}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={() => ` `}
          portalZIndex={99}
          labelComponent={<CustomTooltip length={data.length} />}
        />
      }
    >
      <VictoryBar
        barWidth={data.length === 7 ? 100 : data.length === 30 ? 20 : 7}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onMouseEnter: () => [
                {
                  target: 'data',
                  mutation: () => ({
                    style: {
                      stroke: '#ffffff',
                      fill: (data: any) => (data.datum.y < 0 ? '#f84960' : '#02c076'),
                      transition: '0.3s',
                    },
                  }),
                },
              ],
              onMouseLeave: () => [
                {
                  target: 'data',
                  mutation: () => ({
                    style: {
                      fill: (data: any) => (data.datum.y < 0 ? '#f84960' : '#02c076'),
                      transition: '0.3s',
                    },
                  }),
                },
              ],
            },
          },
        ]}
        style={{
          data: {
            fill: (data) =>
              data.datum.y === 0 ? '#7b7f82' : data.datum.y < 0 ? '#f84960' : '#02c076',
            strokeWidth: 1,
          },
        }}
        data={data}
      />
      <VictoryAxis
        crossAxis={false}
        fixLabelOverlap
        domainPadding={{ x: 10 }}
        offsetY={32}
        orientation="bottom"
        style={{
          axis: {
            stroke: '#7b7f82',
            strokeWidth: 1,
          },
          tickLabels: {
            fontSize: 16,
            fill: '#7b7f82',
          },
        }}
        tickFormat={(x) => format(x, 'MMM d')}
      />
    </VictoryChart>
  );
});

const CustomTooltip = React.memo(({ x, datum, length }: any) => {
  return (
    <foreignObject style={{ pointerEvents: 'none' }} x={x - 50} width="100" height="100%">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          height: `100%`,
          padding: `4px`,
          background: 'white',
          color: 'black',
          borderRadius: '4px',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700 }}>{`${datum.y > 0 ? '+' : ''}${formatDollar(
          datum.y > 999 ? datum.y.toFixed(0) : datum.y,
          20
        )}`}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#7b7f82' }}>
          {format(datum.x, 'MMM d')}
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          height: 310,
          width: length === 30 ? 30 : length === 90 ? 10 : 150,
          zIndex: -99,
          opacity: 0.1,
          position: 'absolute',
          left: length === 30 ? 35 : length === 90 ? 45 : 0,
        }}
      ></div>
    </foreignObject>
  );
});

CustomTooltip.displayName = 'CustomTooltip';

const dailyPNL = [
  [1625961600000, 5.15],
  [1626048000000, 8.15],
  [1626134400000, -6.15],
  [1626220800000, -1.15],
  [1626307200000, 2.15],
  [1626393600000, -56.15],
  [1626480000000, 6.15],
  [1626566400000, -1.15],
  [1626652800000, -4.15],
  [1626739200000, 3.15],
  [1626825600000, 6.15],
  [1626912000000, 12.15],
  [1626998400000, 24.15],
  [1627084800000, 36.15],
  [1627171200000, 64.15],
  [1627257600000, 75.15],
  [1627344000000, 99.15],
  [1627430400000, 101.15],
  [1627516800000, -43.15],
  [1627603200000, -33.15],
  [1627689600000, -12.15],
  [1627776000000, -4.15],
  [1627862400000, 4.15],
  [1627948800000, 12.15],
  [1628035200000, 19.15],
  [1628121600000, 28.15],
  [1628208000000, 56.15],
  [1628294400000, -85.15],
  [1628380800000, -8.15],
  [1628467200000, 5.15],
];
