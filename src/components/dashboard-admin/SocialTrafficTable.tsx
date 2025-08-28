import React from 'react';

interface SocialTrafficData {
    referral: string;
    visitors: number;
    percentage: number;
    color: string;
}

interface SocialTrafficProps {
    title: string;
    data: SocialTrafficData[];
}

const SocialTrafficTable: React.FC<SocialTrafficProps> = ({ title, data }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="pb-3">Fuente</th>
                        <th className="pb-3">Visitantes</th>
                        <th className="pb-3">Porcentaje</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium text-gray-900">{row.referral}</td>
                            <td className="py-3 text-sm text-gray-900">{row.visitors}</td>
                            <td className="py-3 text-sm text-gray-900">
                                <div className="flex items-center">
                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                                        <div
                                            className="h-2 rounded-full"
                                            style={{
                                                width: `${row.percentage}%`,
                                                backgroundColor: row.color,
                                            }}
                                        />
                                    </div>
                                    <span>{row.percentage}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default SocialTrafficTable;
