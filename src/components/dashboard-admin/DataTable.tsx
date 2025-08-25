import React from 'react';

interface TableData {
  pageName: string;
  visitors: number;
  uniqueUsers: number;
  bounceRate: number;
  trend: 'up' | 'down';
}

interface DataTableProps {
  title: string;
  data: TableData[];
}

const DataTable: React.FC<DataTableProps> = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-gray-800">
        {title}
      </h3>
      <button className="bg-[#5046E7] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#4338CA] transition-colors duration-300">
        Ver todo
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="pb-3">Página</th>
            <th className="pb-3">Visitantes</th>
            <th className="pb-3">Usuarios Únicos</th>
            <th className="pb-3">Tasa de Rebote</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 text-sm font-medium text-gray-900">
                {row.pageName}
              </td>
              <td className="py-3 text-sm text-gray-900">
                {row.visitors.toLocaleString('es-AR')}
              </td>
              <td className="py-3 text-sm text-gray-900">
                {row.uniqueUsers.toLocaleString('es-AR')}
              </td>
              <td className="py-3 text-sm text-gray-900 flex items-center">
                <span className={`mr-2 ${
                  row.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {row.trend === 'up' ? '↗' : '↘'}
                </span>
                {row.bounceRate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
