import { format } from 'date-fns';
import React from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryVoronoiContainer } from 'victory';
import { ChartArray } from '..';
import { CustomTooltip } from '../CustomTooltip';

type PropsType = {
  data: ChartArray[];
  dataInterval: string;
};

export const CustomChart: React.FC<PropsType> = ({ data, dataInterval }) => {
  return (
    <VictoryChart
      animate={{ duration: 300, onLoad: { duration: 300 } }}
      width={1000}
      height={400}
      padding={{ left: 0, top: 76, bottom: 32, right: 0 }}
      domainPadding={{ y: 5 }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={() => ` `}
          style={{
            cursor: 'crosshair',
            zIndex: 99,
            //borderBottom: '1.5px solid #7b7f8297'
          }}
          portalZIndex={99}
          labelComponent={<CustomTooltip />}
        />
      }
    >
      <VictoryLine
        style={{
          data: {
            stroke: '#f3aa4e',
            strokeWidth: 2,
            margin: 0,
            padding: 0,
          },
        }}
        data={data.map((item) => ({
          x: item[0],
          y: item[1],
        }))}
      />
      <VictoryAxis
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
        tickFormat={(x) => {
          if (+dataInterval <= 1) {
            return format(x, 'p');
          }
          if (dataInterval === 'max') {
            return format(x, 'MMM y');
          }
          return format(x, 'MMM d');
        }}
      />
    </VictoryChart>
  );
};
