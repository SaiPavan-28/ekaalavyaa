import React from 'react';

interface BarChartProps {
  data: { label: string; value: number; displayValue?: string; color?: string }[];
  maxValue?: number;
  height?: number;
  title?: string;
}

export const SimpleBarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  height = 160,
  title,
}) => {
  const max = maxValue || Math.max(...data.map((d) => d.value), 100);

  return (
    <div className="w-full">
      {title && <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">{title}</h4>}
      <div className="flex items-end gap-3 pt-4 pb-2 justify-between" style={{ height: `${height}px` }}>
        {data.map((item, idx) => {
          const heightPercent = Math.max(Math.min(Math.round((item.value / max) * 100), 100), 4);
          const barColor = item.color || '#B84A22';

          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <span className="text-[11px] font-semibold text-[#44403C] mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.displayValue || item.value}
              </span>
              <div className="w-full max-w-[36px] bg-[#EAE3D2] rounded-t-md overflow-hidden flex flex-col justify-end h-full">
                <div
                  className="w-full rounded-t-md transition-all duration-300 group-hover:brightness-95"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: barColor,
                  }}
                />
              </div>
              <span className="text-[11px] text-[#78716C] mt-2 font-medium truncate max-w-[58px] text-center" title={item.label}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface AreaTrendChartProps {
  data: { label: string; value: number }[];
  height?: number;
  lineColor?: string;
  fillColor?: string;
}

export const SimpleTrendLine: React.FC<AreaTrendChartProps> = ({
  data,
  height = 100,
  lineColor = '#B84A22',
  fillColor = '#F7ECE4',
}) => {
  if (!data || data.length === 0) return null;

  const width = 300;
  const values = data.map((d) => d.value);
  const min = Math.min(...values) * 0.9;
  const max = Math.max(...values) * 1.1;
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.value - min) / range) * (height - 20) - 10;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible" preserveAspectRatio="none">
        <path d={areaD} fill={fillColor} />
        <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((d.value - min) / range) * (height - 20) - 10;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="#FFFFFF"
              stroke={lineColor}
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="flex justify-between text-[11px] text-[#78716C] mt-2">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};
