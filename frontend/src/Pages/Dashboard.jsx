import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Jumlah Responden per Tahun',
    },
  },
};

const labelsBar = ['2022', '2023', '2024'];

const dataBar = {
  labels: labelsBar,
  datasets: [
    {
      label: 'Jumlah Responden',
      data: [200, 128, 100], // Data dummy untuk tahun 2022, 2023, dan 2024
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Penilaian Unit Kerja',
    },
  },
};

const pieData = {
  labels: ['Unit Kerja 1', 'Unit Kerja 2', 'Unit Kerja 3', 'Unit Kerja 4'],
  datasets: [
    {
      label: 'Penilaian',
      data: [27.7, 34.7, 9.2, 28.4],
      backgroundColor: ['#4299e1', '#f4b400', '#4dc3ff', '#ff6384'],
      borderColor: ['#4299e1', '#f4b400', '#4dc3ff', '#ff6384'],
      borderWidth: 1,
    },
  ],
};

const genderData = {
  labels: ['Laki-laki', 'Perempuan'],
  datasets: [
    {
      label: 'Jumlah Responden',
      data: [120, 80], // Data dummy untuk jumlah responden berdasarkan jenis kelamin
      backgroundColor: ['#36A2EB', '#FF6384'],
      borderColor: ['#36A2EB', '#FF6384'],
      borderWidth: 1,
    },
  ],
};

const ageData = {
  labels: ['<18', '18-25', '26-35', '36-45', '46-60', '>60'],
  datasets: [
    {
      label: 'Jumlah Responden',
      data: [20, 50, 60, 40, 25, 5], // Data dummy untuk jumlah responden berdasarkan usia
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-2 text-center w-full">
            <h2 className="text-2xl font-bold mt-1">714k</h2>
            <p className="text-gray-500">Unit Kerja</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-2 text-center w-full">
            <h2 className="text-2xl font-bold mt-1">1.35m</h2>
            <p className="text-gray-500">Layanan</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-2 text-center w-full">
            <h2 className="text-2xl font-bold mt-1">234</h2>
            <p className="text-gray-500">Responden</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Penilaian Unit Kerja</h2>
            <div className="flex items-center justify-center w-full h-64">
              <Pie data={pieData} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden</h2>
            <Bar options={optionsBar} data={dataBar} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6 mt-6'>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden Berdasarkan Jenis Kelamin</h2>
            <Bar options={optionsBar} data={genderData} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden Berdasarkan Usia</h2>
            <Bar options={optionsBar} data={ageData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
