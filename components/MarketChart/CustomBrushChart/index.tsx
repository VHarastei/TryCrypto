import { format } from 'date-fns';
import React from 'react';
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory';
import { ChartArray } from '..';
import { CustomTooltip } from '../CustomTooltip';

type PropsType = {
  data: ChartArray[] | undefined;
};

export const CustomBrushChart: React.FC<PropsType> = ({ data }) => {
  const [domain, setDomain] = React.useState();

  if (!data) return <div>nema</div>;
  return (
    <VictoryChart
      width={1000}
      height={100}
      //padding={{ left: 0, top: 0, bottom: 0, right: 0 }}
      domainPadding={{ y: 5 }}
      containerComponent={
        <VictoryBrushContainer
          allowDraw
          allowResize

          //style={{ cursor: 'crosshair' }}
        />
      }
    >
      <VictoryLine
        style={{
          data: {
            stroke: '#f3aa4e',
            strokeWidth: 2,
            // margin: 0,
            // padding: 0,
          },
        }}
        data={data.map((item) => ({
          x: item[0],
          y: item[1],
        }))}
      />
      {/* <VictoryAxis
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
        tickFormat={(x) => format(x, 'y')}
      /> */}
    </VictoryChart>
  );
};
