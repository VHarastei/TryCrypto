import { format } from 'date-fns';
import { formatDollar } from 'helpers/formatDollar';

export const CustomTooltip = (props: any) => {
  const { x, y, datum } = props;

  return (
    <foreignObject
      style={{ pointerEvents: 'none' }}
      x={x - 85}
      y={y - 75}
      width="170"
      height="100%"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          height: `auto`,
          padding: `4px`,
          background: 'white',
          color: 'black',
          borderRadius: '4px',
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          {formatDollar(
            datum.y < 0.0000000001 ? 0.0000000001 : datum.y < 1 ? datum.y : datum.y.toFixed(2),
            datum.y < 0.0001 ? 2 : datum.y > 1000000000 ? 10 : 7
          )}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#7b7f82' }}>
          {format(datum.x, 'MMM d p')}
        </div>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#f3aa4e',
            bottom: -32,
            left: '50',
            height: 16,
            width: 16,
            borderRadius: 100,
            border: '4px solid #212528',
          }}
        ></div>
      </div>
    </foreignObject>
  );
};
