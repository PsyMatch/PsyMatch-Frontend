'use client';
import React, { useEffect } from 'react';

interface PaymentData {
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

interface FlowbitePaymentsChartProps {
  data: PaymentData[];
  title: string;
}

const FlowbitePaymentsChart: React.FC<FlowbitePaymentsChartProps> = ({ data, title }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadChart = async () => {
        const ApexCharts = (await import('apexcharts')).default;

        const chartElement = document.getElementById('flowbite-payments-chart');
        if (chartElement && data.length > 0) {
          chartElement.innerHTML = '';

          const chartData = data.map(payment => ({
            x: payment.date,
            y: payment.amount,
            fillColor: payment.status === 'completed' ? '#10B981' : 
                      payment.status === 'pending' ? '#F59E0B' : '#EF4444'
          }));

          const options = {
            series: [{
              name: 'Amount',
              data: chartData,
            }],
            chart: {
              height: 320,
              type: 'bar' as const,
              fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '70%',
                borderRadiusApplication: 'end' as const,
                borderRadius: 8,
                distributed: true,
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
              style: {
                fontFamily: 'Inter, sans-serif',
              },
              y: {
                formatter: function (value: number) {
                  return '$' + value.toLocaleString();
                }
              }
            },
            states: {
              hover: {
                filter: {
                  type: 'darken',
                  value: 0.9,
                },
              },
            },
            stroke: {
              show: true,
              width: 0,
              colors: ['transparent'],
            },
            grid: {
              show: false,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -14
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            colors: chartData.map(item => item.fillColor),
            xaxis: {
              floating: false,
              labels: {
                show: true,
                style: {
                  fontFamily: 'Inter, sans-serif',
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
                  fontFamily: 'Inter, sans-serif',
                  cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: function (value: number) {
                  return '$' + value.toLocaleString();
                }
              },
            },
            fill: {
              opacity: 1,
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
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">$0</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">{title}</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400">No hay datos de pagos disponibles</p>
        </div>
      </div>
    );
  }

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            ${totalAmount.toLocaleString()}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">{title}</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div>
      </div>

      <div id="flowbite-payments-chart"></div>
    </div>
  );
};

export default FlowbitePaymentsChart;
