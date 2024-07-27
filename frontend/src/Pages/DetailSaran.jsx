import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  IconButton, // Import IconButton
} from '@mui/material';
import { CheckCircle, Cancel, Edit } from '@mui/icons-material'; // Import Cancel and Edit icons
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const data = [
  {
    no: 1,
    lembaga: 'Lembaga A',
    layanan: 'Layanan A',
    tanggal: '2023-03-01',
    saran: 'Saran A',
    terlaksana: true,
  },
  {
    no: 2,
    lembaga: 'Lembaga B',
    layanan: 'Layanan B',
    tanggal: '2023-03-02',
    saran: 'Saran B',
    terlaksana: false,
  },
  // Add more data as needed
];

const DetailSaran = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unitKerja, layanan, startDate: initialStartDate, endDate: initialEndDate } = location.state || {};
  
  const [selectedStatus, setSelectedStatus] = useState('semua');
  const [startDate, setStartDate] = useState(initialStartDate ? new Date(initialStartDate) : null);
  const [endDate, setEndDate] = useState(initialEndDate ? new Date(initialEndDate) : null);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filterData = () => {
      const isWithinDateRange = (date) => {
        const selectedDate = new Date(date);
        const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
        const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        if (start && end) {
          return selectedDate >= start && selectedDate <= end;
        } else if (start) {
          return selectedDate >= start;
        } else if (end) {
          return selectedDate <= end;
        } else {
          return true;
        }
      };

      const filtered = data.filter((item) => {
        const matchesStatus =
          selectedStatus === 'semua'
            ? true
            : selectedStatus === 'terlaksana'
            ? item.terlaksana
            : !item.terlaksana;

        const matchesDate = isWithinDateRange(item.tanggal);
        const matchesUnitKerja = unitKerja ? item.lembaga === unitKerja : true;
        const matchesLayanan = layanan ? item.layanan === layanan : true;

        return matchesStatus && matchesDate && matchesUnitKerja && matchesLayanan;
      });

      setFilteredData(filtered);
    };

    filterData();
  }, [selectedStatus, unitKerja, layanan, startDate, endDate]);

  const handleStatusChange = (index) => {
    const updatedData = [...filteredData];
    updatedData[index].terlaksana = !updatedData[index].terlaksana;
    setFilteredData(updatedData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <div className="bg-[#FFFFFF] p-4 rounded-md mb-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="rounded-md"
              >
                <MenuItem value="semua">Semua</MenuItem>
                <MenuItem value="terlaksana">Terlaksana</MenuItem>
                <MenuItem value="belum terlaksana">Belum Terlaksana</MenuItem>
              </Select>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Kembali
            </Button>
          </div>

          <div className="flex mb-4">
            <div className="mr-4">
              <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                Tanggal Awal
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
                Tanggal Akhir
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>

          <div className="bg-white rounded-md shadow-md p-4">
            <Table>
              <TableHead>
                <TableRow className="bg-[#A8D1A1]">
                  <TableCell>No.</TableCell>
                  <TableCell>Lembaga</TableCell>
                  <TableCell>Layanan</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Saran</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.no}>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.lembaga}</TableCell>
                    <TableCell>{item.layanan}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.saran}</TableCell>
                    <TableCell>
                      <IconButton
                        color={item.terlaksana ? 'success' : 'default'}
                        onClick={() => handleStatusChange(index)}
                      >
                        {item.terlaksana ? <CheckCircle /> : <Cancel />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSaran;
