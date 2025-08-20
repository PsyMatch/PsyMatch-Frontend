
interface ChartData {
  label: string;
  value: number;
}

interface SimpleLineChartProps {
  data: ChartData[];
  dataWeek?: ChartData[];
  title: string;
  color?: string;
}

interface SimpleLineChartProps {
  data: ChartData[];
  title: string;
  color?: string;
}


const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  title,
  color = '#5046E7',
}) => {
  // Solo vista semanal
  const chartData = data;
  const maxValue = Math.max(...chartData.map((d) => d.value));
  const minValue = Math.min(...chartData.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return 150 - ((value - minValue) / range) * 120;
  };

  const pathData = chartData.map((point, index) => {
    const x = (index / (chartData.length - 1)) * 350;
    const y = getY(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x + 25} ${y + 15}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
  {/* Solo vista semanal, sin botones */}
      </div>
      <div className="relative">
        <svg width="400" height="180" className="w-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="25"
              y1={15 + i * 30}
              x2="375"
              y2={15 + i * 30}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {chartData.map((point, index) => {
            const x = (index / (chartData.length - 1)) * 350 + 25;
            const y = getY(point.value) + 15;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="flex justify-between mt-2 px-6">
          {chartData.map((point, index) => (
            <span key={index} className="text-xs text-gray-500">
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleLineChart;
