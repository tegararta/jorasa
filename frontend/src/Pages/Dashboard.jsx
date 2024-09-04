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

const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { layanan } = useSelector((state) => state.layanan);
  const { responden } = useSelector((state) => state.responden);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);

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

  useEffect(() => {
    if (responden.length > 0) {
      const respondenYears = responden.map((responden) => {
        const date = new Date(responden.createdAt);
        return date.getFullYear();
      });
      setYears([...new Set(respondenYears)]);
    }
  }, [responden]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredRespondents = selectedYear
    ? responden.filter((resp) => new Date(resp.createdAt).getFullYear() === parseInt(selectedYear))
    : responden;

  const genderCounts = filteredRespondents.reduce((acc, curr) => {
    acc[curr.jenisKelamin] = (acc[curr.jenisKelamin] || 0) + 1;
    return acc;
  }, {});

  const layananCounts = filteredRespondents.reduce((acc, curr) => {
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

  const colorPalette = [
    'rgba(75, 192, 192, 0.2)', 
    'rgba(153, 102, 255, 0.2)', 
    'rgba(255, 159, 64, 0.2)', 
    'rgba(255, 99, 132, 0.2)', 
    'rgba(54, 162, 235, 0.2)', 
  ];

  const borderColorPalette = [
    'rgba(75, 192, 192, 1)', 
    'rgba(153, 102, 255, 1)', 
    'rgba(255, 159, 64, 1)', 
    'rgba(255, 99, 132, 1)', 
    'rgba(54, 162, 235, 1)', 
  ];

  const colors = layananKeys.map((_, index) => ({
    backgroundColor: colorPalette[index % colorPalette.length],
    borderColor: borderColorPalette[index % borderColorPalette.length],
  }));

  const layananData = {
    labels: layananKeys,
    datasets: [
      {
        label: 'Jumlah Responden',
        data: Object.values(layananCounts),
        backgroundColor: colors.map((color) => color.backgroundColor),
        borderColor: colors.map((color) => color.borderColor),
        borderWidth: 1,
      },
    ],
  };

  const monthCounts = filteredRespondents.reduce((acc, curr) => {
    const date = new Date(curr.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const labelsBar = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: 'Jumlah Responden',
        data: labelsBar.map((month) => monthCounts[month] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const ageCounts = filteredRespondents.reduce((acc, curr) => {
    const age = curr.usia;
    if (age <= 17) acc['0-17'] = (acc['0-17'] || 0) + 1;
    else if (age <= 25) acc['18-25'] = (acc['18-25'] || 0) + 1;
    else if (age <= 35) acc['26-35'] = (acc['26-35'] || 0) + 1;
    else if (age <= 45) acc['36-45'] = (acc['36-45'] || 0) + 1;
    else if (age <= 55) acc['46-55'] = (acc['46-55'] || 0) + 1;
    else acc['56+'] = (acc['56+'] || 0) + 1;
    return acc;
  }, {});

  const ageData = {
    labels: ['0-17', '18-25', '26-35', '36-45', '46-55', '56+'],
    datasets: [
      {
        label: 'Jumlah Responden',
        data: [
          ageCounts['0-17'] || 0,
          ageCounts['18-25'] || 0,
          ageCounts['26-35'] || 0,
          ageCounts['36-45'] || 0,
          ageCounts['46-55'] || 0,
          ageCounts['56+'] || 0,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-6">
          {user && user.role === "admin" && (
            <div className="rounded-lg shadow-md p-2 text-center w-full bg-[#A8D1A1]">
              <h2 className="text-2xl font-bold mt-1">{unit.length}</h2>
              <p className="text-gray-500">Unit Kerja</p>
            </div>
          )}
          <div className="bg-[#A8D1A1] rounded-lg shadow-md p-2 text-center w-full">
            <h2 className="text-2xl font-bold mt-1">{layanan.length}</h2>
            <p className="text-gray-500">Layanan</p>
          </div>
          <div className="bg-[#A8D1A1] rounded-lg shadow-md p-2 text-center w-full">
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
              <Bar options={{ ...optionsBar, plugins: { ...optionsBar.plugins, title: { display: true, text: 'Jumlah Responden Berdasarkan Jenis Kelamin' } } }} data={layananData} />
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden</h2>
            <input type="" name="" id="" />
            <Bar options={{ ...optionsBar, plugins: { ...optionsBar.plugins, title: { display: true, text: 'Jumlah Responden perbulan' } } }} data={dataBar} />
            <select  className=' text-xl font-mono text-center' value={selectedYear} onChange={handleYearChange}>
              <option value="">Pilih Tahun</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6 mt-6'>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center">Jumlah Responden Berdasarkan Jenis Kelamin</h2>
            <Bar options={{ ...optionsBar, plugins: { ...optionsBar.plugins, title: { display: true, text: 'Jumlah Responden Berdasarkan Jenis Kelamin' } } }} data={genderData} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center mb-4">Jumlah Responden Berdasarkan Usia</h2>
            <Bar options={{ ...optionsBar, plugins: { ...optionsBar.plugins, title: { display: true, text: 'Jumlah Responden Berdasarkan Usia' } } }} data={ageData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
