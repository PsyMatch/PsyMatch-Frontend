'use client';
import React, { useEffect } from 'react';

interface FlowbitePieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  title: string;
}

const FlowbitePieChart: React.FC<FlowbitePieChartProps> = ({ data, title }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadChart = async () => {
        const ApexCharts = (await import('apexcharts')).default;

        const chartElement = document.getElementById('flowbite-pie-chart');
        if (chartElement && data.length > 0) {
          chartElement.innerHTML = '';

          const options = {
            series: data.map(item => item.value),
            colors: data.map(item => item.color),
            chart: {
              height: 320,
              width: '100%',
              type: 'pie' as const,
              fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            },
            stroke: {
              colors: ['white'],
              lineCap: 'round' as const,
            },
            plotOptions: {
              pie: {
                labels: {
                  show: true,
                },
                size: '100%',
                dataLabels: {
                  offset: -25
                }
              },
            },
            labels: data.map(item => item.name),
            dataLabels: {
              enabled: true,
              style: {
                fontFamily: 'Inter, sans-serif',
              },
            },
            legend: {
              position: 'bottom' as const,
              fontFamily: 'Inter, sans-serif',
            },
            yaxis: {
              labels: {
                formatter: function (value: number) {
                  return value.toLocaleString();
                },
              },
            },
            xaxis: {
              labels: {
                formatter: function (value: string) {
                  return value;
                },
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
          };

          const chart = new ApexCharts(chartElement, options);
          chart.render();

          return () => {
            chart.destroy();
          };
        }
      };

      loadChart();
    }
  }, [data, title]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between items-start w-full">
          <div className="flex-col items-center">
            <div className="flex items-center mb-1">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">{title}</h5>
            </div>
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
      <div className="flex justify-between items-start w-full">
        <div className="flex-col items-center">
          <div className="flex items-center mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">{title}</h5>
            <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
          </div>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Total: {total.toLocaleString()} visitas</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="py-6" id="flowbite-pie-chart"></div>

      {/* Legend */}
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 pt-5">
        <div className="pt-5">
          {/* Legend List */}
          <div className="grid grid-cols-1 gap-3">
            {data.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full me-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.name}: {item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popover para información del gráfico */}
      <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block w-72 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Información del Gráfico</h3>
          <p>Este gráfico muestra la distribución de datos en forma circular, donde cada segmento representa una categoría.</p>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full me-2"></span>
            <span>Los colores ayudan a distinguir entre categorías</span>
          </div>
        </div>
        <div data-popper-arrow></div>
      </div>
    </div>
  );
};

export default FlowbitePieChart;
