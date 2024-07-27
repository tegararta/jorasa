import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Saran() {
  const [unitKerja, setUnitKerja] = useState('');
  const [layanan, setLayanan] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleFilter = () => {
    navigate('/detailSaran', {
      state: { unitKerja, layanan, startDate, endDate },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#FFFFFF] p-4 rounded-md mb-4 shadow-lg">
        <div className="bg-[#A8D1A1] p-4 rounded-md mb-4">
          <h2 className="text-xl font-bold text-[#416829]">Lihat Data Tiap Unit Kerja</h2>
        </div>
        <div className="mb-4">
          <label htmlFor="unitKerja" className="block text-gray-700 text-sm font-bold mb-2">
            Unit Kerja
          </label>
          <select
            id="unitKerja"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={unitKerja}
            onChange={(e) => setUnitKerja(e.target.value)}
          >
            <option value="">Pilih Unit Kerja</option>
            <option value="Lembaga A">Lembaga A</option>
            <option value="Lembaga B">Lembaga B</option>
            <option value="Lembaga C">Lembaga C</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="layanan" className="block text-gray-700 text-sm font-bold mb-2">
            Layanan
          </label>
          <select
            id="layanan"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={layanan}
            onChange={(e) => setLayanan(e.target.value)}
          >
            <option value="">Pilih Layanan</option>
            <option value="Layanan A">Layanan A</option>
            <option value="Layanan B">Layanan B</option>
            <option value="Layanan C">Layanan C</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="flex mb-4">
          <div className="mr-4">
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
              Tanggal Awal
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
              Tanggal Akhir
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>
        <div className="flex justify-center mt-4"></div>
          <button
            onClick={handleFilter}
            className="bg-[#5D8047] hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Filter
          </button>
        </div>  
      </div>  
  );
}

export default Saran;
