"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ProjectsChart() {
  const data = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [42, 8, 3],
        backgroundColor: [
          '#10B981', // Green
          '#3B82F6', // Blue  
          '#F59E0B', // Yellow
        ],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="h-64 flex items-center justify-center">
      <div className="relative w-48 h-48">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">53</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
}

