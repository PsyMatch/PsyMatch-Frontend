import React from 'react';

interface WidgetProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
  subtitle?: string;
  color?: string;
}

const DashboardWidget: React.FC<WidgetProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  subtitle,
  color = "from-[#5046E7] to-[#4338CA]"
}) => (
  <div className="group bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-[#5046E7]/20">
    <div className="flex-1 min-w-0">
      <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider truncate">{title}</p>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 group-hover:text-[#5046E7] transition-colors duration-300">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {change && (
        <p className={`text-xs sm:text-sm mt-1 sm:mt-2 flex items-center font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-500'
        }`}>
          <span className="mr-1">
            {changeType === 'positive' ? '↗️' : '↘️'}
          </span>
          {change}
          {subtitle && <span className="text-gray-400 ml-1 sm:ml-2 hidden sm:inline">{subtitle}</span>}
        </p>
      )}
    </div>
    <div className="ml-3 sm:ml-6 flex-shrink-0">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all duration-300`}>
        <div className="text-lg sm:text-xl">
          {icon}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardWidget;
