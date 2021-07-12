import { format } from 'date-fns';
import { formatDollar } from 'helpers/formatDollar';
import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryVoronoiContainer } from 'victory';

export const BarChart = () => {
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
          labelComponent={<CustomTooltip />}
        />
      }
    >
      <VictoryBar
        barWidth={dailyPNL.length <= 7 ? 100 : 20}
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
            fill: (data) => (data.datum.y < 0 ? '#f84960' : '#02c076'),
            strokeWidth: 2,
          },
        }}
        data={dailyPNL.map((item) => ({
          x: item[0],
          y: item[1],
        }))}
      />
      <VictoryAxis
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
};

const CustomTooltip = ({ x, datum }: any) => {
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
          width: 30,
          zIndex: -99,
          opacity: 0.1,
          position: 'absolute',
          left: 35,
        }}
      ></div>
    </foreignObject>
  );
};

const dailyPNL = [
  [1618250777082, 5.15],
  [1618354443436, 8.15],
  [1618457645089, -6.15],
  [1618561439665, 2.15],
  [1618665395682, -56.15],
  [1618768780138, 6.15],
  [1618872165405, -1.15],
  [1618976029311, -4.15],
  [1619079460878, 3.15],
  [1619183120815, 6.15],
  [1619286744216, 12.15],
  [1619390172070, 24.15],
  [1619494443828, 36.15],
  [1619597454159, 64.15],
  [1619601003611, 75.15],
  [1619704696724, 99.15],
  [1619808716961, 101.15],
  [1619912151941, -43.15],
  [1620015302758, -33.15],
  [1620119013315, -12.15],
  [1620222867335, -4.15],
  [1620326101733, 4.15],
  [1620429924005, 12.15],
  [1620533537848, 19.15],
  [1620637315950, 28.15],
  [1620740638154, 56.15],
  [1620844291450, -85.15],
  [1620947895997, -8.15],
  [1621051640232, 5.15],
  [1621154903364, -3.15],
  [1621258689100, 75.15],
];
