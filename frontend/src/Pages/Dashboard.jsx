import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLayanan } from '../auth/Layananslice';
import { fetchResponden } from '../auth/Respondenslice';

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
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);
  const [unit, setUnit] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { layanan } = useSelector((state) => state.layanan);
  const { responden } = useSelector((state) => state.responden);

  const getUnitAndLayanan = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:5000/unit");
      setUnit(usersResponse.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    dispatch(fetchLayanan());
    dispatch(fetchResponden());
    getUnitAndLayanan();
  }, [dispatch]);

  // Menghitung jumlah responden berdasarkan jenis kelamin
  const genderCounts = responden.reduce((acc, curr) => {
    acc[curr.jenisKelamin] = (acc[curr.jenisKelamin] || 0) + 1;
    return acc;
  }, {});

  // Menghitung jumlah responden berdasarkan layanan
  const layananCounts = responden.reduce((acc, curr) => {
    acc[curr.layanan] = (acc[curr.layanan] || 0) + 1;
    return acc;
  }, {});

  const genderData = {
    labels: [''],
    datasets: [
      {
        label: 'Laki-laki',
        data: [genderCounts['laki-laki'] || 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
      {
        label: 'Perempuan',
        data: [genderCounts['perempuan'] || 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FF6384',
        borderWidth: 1,
      },
    ],
  };

  const layananKeys = Object.keys(layananCounts);

// Define a color palette with distinct colors
const colorPalette = [
  'rgba(75, 192, 192, 0.2)', // Teal
  'rgba(153, 102, 255, 0.2)', // Purple
  'rgba(255, 159, 64, 0.2)', // Orange
  'rgba(255, 99, 132, 0.2)', // Red
  'rgba(54, 162, 235, 0.2)', // Blue
  // Add more colors if needed
];

const borderColorPalette = [
  'rgba(75, 192, 192, 1)', // Teal
  'rgba(153, 102, 255, 1)', // Purple
  'rgba(255, 159, 64, 1)', // Orange
  'rgba(255, 99, 132, 1)', // Red
  'rgba(54, 162, 235, 1)', // Blue
  // Add more colors if needed
];

const colors = layananKeys.map((_, index) => {
  return {
    backgroundColor: colorPalette[index % colorPalette.length],
    borderColor: borderColorPalette[index % borderColorPalette.length],
  };
});

const layananData = {
  labels: layananKeys,
  datasets: [
    {
      label: 'Jumlah Responden',
      data: Object.values(layananCounts),
      backgroundColor: colors.map(color => color.backgroundColor),
      borderColor: colors.map(color => color.borderColor),
      borderWidth: 1,
    },
  ],
};


  // Menghitung jumlah responden berdasarkan usia
  const ageCounts = responden.reduce((acc, curr) => {
    const age = curr.usia;
    if (age < 18) acc['<18']++;
    else if (age <= 25) acc['18-25']++;
    else if (age <= 35) acc['26-35']++;
    else if (age <= 45) acc['36-45']++;
    else if (age <= 60) acc['46-60']++;
    else acc['>60']++;
    return acc;
  }, { '<18': 0, '18-25': 0, '26-35': 0, '36-45': 0, '46-60': 0, '>60': 0 });

  const ageData = {
    labels: ['<18', '18-25', '26-35', '36-45', '46-60', '>60'],
    datasets: [
      {
        label: 'Jumlah Responden',
        data: Object.values(ageCounts),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Menghitung jumlah responden berdasarkan tahun
  const yearCounts = responden.reduce((acc, curr) => {
    const year = new Date(curr.createdAt).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const labelsBar = ['2024', '2025', '2026', '2027'];
  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: 'Jumlah Responden',
        data: labelsBar.map(year => yearCounts[year] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-6">
          {user && user.role === "admin" && (
            <div className="bg-white rounded-lg shadow-md p-2 text-center w-full">
              <h2 className="text-2xl font-bold mt-1">{unit.length}</h2>
              <p className="text-gray-500">Unit Kerja</p>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md p-2 text-center w-full">
            <h2 className="text-2xl font-bold mt-1">{layanan.length}</h2>
            <p className="text-gray-500">Layanan</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-2 text-center w-full">
            <h2 className="text-2xl font-bold mt-1">{responden.length}</h2>
            <p className="text-gray-500">Responden</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* admin */}
          {/* {user && user.role === "admin" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Penilaian Unit Kerja</h2>
              <div className="flex items-center justify-center w-full h-64">
                <Bar options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Penilaian Unit Kerja' } } }} data={penilaianData} />
              </div>
            </div>
          )} */}
          {/* user */}
          {user && user.role === "user" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Banyak Layanan di survey</h2>
              <div className="flex items-center justify-center w-full h-64">
                <Bar options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Banyak Layanan di survey' } } }} data={layananData} />
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden</h2>
            <Bar options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Jumlah Responden per Tahun' } } }} data={dataBar} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6 mt-6'>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden Berdasarkan Jenis Kelamin</h2>
            <Bar options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Jumlah Responden Berdasarkan Jenis Kelamin' } } }} data={genderData} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden Berdasarkan Usia</h2>
            <Bar options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Jumlah Responden Berdasarkan Usia' } } }} data={ageData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
