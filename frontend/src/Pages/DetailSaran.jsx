import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchSaran, updateSaranStatus } from '../auth/Saranslice';
import { useSelector, useDispatch } from 'react-redux';
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
  IconButton,
} from '@mui/material';
import { FaUser } from 'react-icons/fa';
import { CheckCircle, Cancel } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DetailSaran = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const { unitKerja, layanan, startDate: initialStartDate, endDate: initialEndDate } = location.state || {};
  const [selectedStatus, setSelectedStatus] = useState('semua');
  const [startDate, setStartDate] = useState(initialStartDate ? new Date(initialStartDate) : null);
  const [endDate, setEndDate] = useState(initialEndDate ? new Date(initialEndDate) : null);
  const [filteredData, setFilteredData] = useState([]);
  const rowsPerPage = 10; // Jumlah baris per halaman
  const [modalBiodata, setModalBiodata] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchSaran())
      .unwrap()
      .then((response) => {
        const mappedData = response.map((item) => {
          return {
            lembaga: user.role === 'admin' ? item.survey.user.unit_kerjas[0].nama_unit : '',
            layanan: item.layanan,
            tanggal: new Date(item.createdAt).toLocaleDateString(),
            uuidsaran: item.sarans[0]?.uuid,
            saran: item.sarans[0]?.saran,
            status: item.sarans[0]?.status,
            nama: item.nama,
            nomor: item.nohp,
            usia: item.usia,
            jenisKelamin: item.jenisKelamin,
          };
        });
        setFilteredData(mappedData);
      })
      .catch((error) => {
        console.error('Error fetching saran:', error);
      });
  }, [dispatch, user]);

  const showModal = (item) => {
    setSelectedItem(item);
    setModalBiodata(true); // Show modal
  };

  const closeLayananModal = () => {
    setModalBiodata(false); // Hide modal
  };

  const handleStatusChange = (uuidsaran, currentStatus) => {
    const newStatus = !currentStatus;
  
    dispatch(updateSaranStatus({ uuidsaran, status: newStatus }))
      .unwrap()
      .then(() => {
        // Fetch updated data
        dispatch(fetchSaran())
          .unwrap()
          .then((response) => {
            const mappedData = response.map((item) => {
              return {
                lembaga: user.role === 'admin' ? item.survey.user.unit_kerjas[0].nama_unit : '',
                layanan: item.layanan,
                tanggal: new Date(item.createdAt).toLocaleDateString(),
                uuidsaran: item.sarans[0]?.uuid,
                saran: item.sarans[0]?.saran,
                status: item.sarans[0]?.status,
                nama: item.nama,
                nomor: item.nohp,
                usia: item.usia,
                jenisKelamin: item.jenisKelamin,
              };
            });
            setFilteredData(mappedData);
          })
          .catch((error) => {
            console.error('Error fetching saran:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating saran status:', error);
      });
  
    const endpoint = newStatus
    ? 'Dibatalkan'
    : 'Saran sudah diterima';
    toast.success(endpoint);
  };

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

    return filteredData.filter((item) => {
      const matchesStatus =
        selectedStatus === 'semua'
          ? true
          : selectedStatus === 'true'
            ? !item.status
            : item.status;

      const matchesDate = isWithinDateRange(item.tanggal);
      const matchesUnitKerja = unitKerja ? item.lembaga === unitKerja : true;
      const matchesLayanan = layanan ? item.layanan === layanan : true;
      return matchesStatus && matchesDate && matchesUnitKerja && matchesLayanan;
    });
  };

  const startIndex = (1 - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

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
                <MenuItem value="true">Terlaksana</MenuItem>
                <MenuItem value="false">Belum Terlaksana</MenuItem>
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
                <TableRow className="bg-[#A8D1A1] text-center">
                  <TableCell>No.</TableCell>
                  {user && user.role === "admin" && (
                    <TableCell>Lembaga</TableCell>
                  )}
                  <TableCell>Layanan</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Saran</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Responden</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData().slice(startIndex, endIndex).map((item, index) => (
                  <TableRow key={startIndex + index}>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    {user && user.role === "admin" && (
                      <TableCell>{item.lembaga}</TableCell>
                    )}
                    <TableCell>{item.layanan}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.saran}</TableCell>
                    <TableCell>
                      <IconButton
                        color={item.status ? 'default' : 'success'}
                        onClick={() => handleStatusChange(item.uuidsaran, item.status)}
                      >
                        {item.status ? <Cancel /> : <CheckCircle />}
                      </IconButton>
                    </TableCell>
                    <TableCell className='justify-center'>
                      <IconButton 
                      onClick={() => showModal(item)}
                      color='primary'>
                        <FaUser />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {modalBiodata && selectedItem && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
                  <div className="bg-[#A8D1A1] w-full rounded-t-lg p-4">
                    <h2 className="text-2xl font-semibold text-black">Detail Responden</h2>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      <li><strong>Nama:</strong> {selectedItem.nama}</li>
                      <li><strong>No HP:</strong> {selectedItem.nomor}</li>
                      <li><strong>Umur:</strong> {selectedItem.usia}</li>
                      <li><strong>Jenis Kelamin:</strong> {selectedItem.jenisKelamin}</li>
                    </ul>
                    <div className="flex justify-center mt-4 ">
                      <Button
                        onClick={closeLayananModal}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400"
                      >
                        Tutup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSaran;
