import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchLayanan } from '../auth/Layananslice';
import axios from 'axios';

function Saran() {
  const [unitKerja, setUnitKerja] = useState('');
  const [layanan1, setLayanan1] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedUnitLayanan, setSelectedUnitLayanan] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { layanan } = useSelector((state) => state.layanan);

  useEffect(() => {
    dispatch(fetchLayanan());
  }, [dispatch]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/unit');
        setUnits(response.data);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchUnits();
  }, []);

  const handleUnitKerjaChange = (e) => {
    const selectedUnit = e.target.value;
    setUnitKerja(selectedUnit);
    const unitData = units.find(unit => unit.nama_unit === selectedUnit);
    setSelectedUnitLayanan(unitData ? unitData.layanans : []);
  };

  const handleFilter = () => {
    navigate('/detailSaran', {
      state: { unitKerja, layanan: layanan1, startDate, endDate },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#FFFFFF] p-4 rounded-md mb-4 shadow-lg">
        <div className="bg-[#A8D1A1] p-4 rounded-md mb-4">
          <h2 className="text-xl font-bold text-[#416829]">Lihat Data Tiap Unit Kerja</h2>
        </div>
        {user && user.role === "admin" && (
          <div className="mb-4">
            <label htmlFor="unitKerja" className="block text-gray-700 text-sm font-bold mb-2">
              Unit Kerja
            </label>
            <select
              id="unitKerja"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={unitKerja}
              onChange={handleUnitKerjaChange}
            >
              <option value="">Pilih Unit Kerja</option>
              {units.map(unit => (
                <option key={unit.uuid} value={unit.nama_unit}>
                  {unit.nama_unit}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="layanan" className="block text-gray-700 text-sm font-bold mb-2">
            Layanan
          </label>
          { user && user.role === "admin" && (
            <select
            id="layanan"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={layanan1}
            onChange={(e) => setLayanan1(e.target.value)}
          >
            <option value="">Pilih Layanan</option>
            {selectedUnitLayanan.map((item, index) => (
              <option key={index} value={item.nama_layanan}>
                {item.nama_layanan}
              </option>
            ))}
          </select>
          
          )}
          { user && user.role === "user" && (
          <select
            id="layanan"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={layanan1}
            onChange={(e) => setLayanan1(e.target.value)}
          >
            <option value="">Pilih Layanan</option>
            {selectedUnitLayanan.length > 0 ? (
              selectedUnitLayanan.map((item, index) => (
                <option key={index} value={item.nama_layanan}>
                  {item.nama_layanan}
                </option>
              ))
            ) : (
              layanan.map((item) => (
                <option key={item.uuid} value={item.nama_layanan}>
                  {item.nama_layanan}
                </option>
              ))
            )}
          </select>
          )}
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
        <div className="flex justify-center mt-4">
          <button
            onClick={handleFilter}
            className="bg-[#5D8047] hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Saran;
