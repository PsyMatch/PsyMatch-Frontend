import React from 'react';

interface BarData {
  month: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarData[];
  title: string;
  color?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  title, 
  color = '#6366F1' 
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 0);

  // Helper para convertir fecha YYYY-MM-DD a nombre de día en español (local)
  const getDayName = (dateStr: string) => {
    const dias = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    // Forzar formato local y evitar problemas de zona horaria
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    return dias[date.getDay()];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        {title}
      </h3>
      
      <div className="relative h-48">
        <div className="flex items-end justify-between h-full space-x-2">
          {data.map((item, index) => {
            // Si maxValue es 0, todas las barras deben tener altura 0
            const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            // Mostrar nombre de día si el campo es fecha YYYY-MM-DD
            let label = item.month;
            if (/^\d{4}-\d{2}-\d{2}$/.test(item.month)) {
              const dayName = getDayName(item.month);
              label = dayName || item.month;
            }
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
                  style={{ 
                    height: `${height}%`, 
                    backgroundColor: color,
                    minHeight: '8px'
                  }}
                  title={`${item.month}: ${item.value}`}
                />
                <span className="text-xs text-gray-500 mt-2">{label}</span>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
          <span>{maxValue > 0 ? maxValue : 0}</span>
          <span>{maxValue > 0 ? Math.round(maxValue * 0.75) : 0}</span>
          <span>{maxValue > 0 ? Math.round(maxValue * 0.5) : 0}</span>
          <span>{maxValue > 0 ? Math.round(maxValue * 0.25) : 0}</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleBarChart;
