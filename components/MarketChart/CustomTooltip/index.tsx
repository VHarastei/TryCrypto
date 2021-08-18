import { format } from 'date-fns';
import React from 'react';
import { formatDollar } from 'utils/formatDollar';

export const CustomTooltip = React.memo(function CustomTooltip(props: any) {
  const { x, y, datum } = props;
  return (
    <foreignObject
      style={{ pointerEvents: 'none', position: 'relative' }}
      x={x >= 950 ? x - 185 : x - 85}
      y={y - 75}
      width="300"
      height="100%"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          height: `auto`,
          width: 170,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: `auto`,
            width: '100%',
            //padding: `4px`,
            background: 'white',
            color: 'black',
            borderRadius: '4px',
            position: 'absolute',
            left: x <= 85 ? 0 : 'auto',
            marginLeft: x <= 85 ? 100 : 0,
            // right: x >= 950 ? 0 : 'auto',
            // marginRight: x >= 950 ? 100 : 0,
            zIndex: 1001,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {formatDollar(
              datum.y === 0
                ? 0
                : datum.y < 0.0000000001
                ? 0.0000000001
                : datum.y < 1
                ? datum.y
                : datum.y.toFixed(2),
              datum.y < 0.0001 ? 2 : datum.y > 1000000000 ? 10 : 7
            )}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7b7f82' }}>
            {format(datum.x, 'MMM d p')}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#f3aa4e',
            top: 67,
            left: x >= 950 ? 177 : '50',
            height: 16,
            width: 16,
            borderRadius: 100,
            border: '4px solid #212528',
          }}
        ></div>
      </div>
    </foreignObject>
  );
});
