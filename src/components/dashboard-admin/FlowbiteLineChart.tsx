'use client';
import React, { useEffect } from 'react';

interface FlowbiteLineChartProps {
  data: Array<{ label: string; value: number }>;
  title: string;
  color?: string;
}

const FlowbiteLineChart: React.FC<FlowbiteLineChartProps> = ({ 
  data, 
  title, 
  color = '#5046E7' 
}) => {
  useEffect(() => {
    // Asegurar que ApexCharts esté disponible
    if (typeof window !== 'undefined') {
      const loadChart = async () => {
        const ApexCharts = (await import('apexcharts')).default;

        const chartElement = document.getElementById('flowbite-line-chart');
        if (chartElement && data.length > 0) {
          // Limpiar gráfico existente
          chartElement.innerHTML = '';

          const options = {
            chart: {
              height: 320,
              type: 'line' as const,
              fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 6,
              curve: 'smooth' as const,
            },
            grid: {
              show: true,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -26
              },
            },
            series: [
              {
                name: title,
                data: data.map(item => item.value),
                color: color,
              },
            ],
            legend: {
              show: false
            },
            xaxis: {
              categories: data.map(item => item.label),
              labels: {
                show: true,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: true,
              labels: {
                show: true,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: function (value: number) {
                  return value.toString();
                }
              },
            },
          };

          const chart = new ApexCharts(chartElement, options);
          chart.render();

          // Cleanup function
          return () => {
            chart.destroy();
          };
        }
      };

      loadChart();
    }
  }, [data, title, color]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between mb-5">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              0
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {title}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-5">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {total.toLocaleString()}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {title}
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div>
      </div>
      <div id="flowbite-line-chart"></div>
    </div>
  );
};

export default FlowbiteLineChart;
