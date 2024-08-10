import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UnitKerja from './UnitKerja';

const Layanan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [layanan, setLayanan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [Addlayanan, setAddlayanan] = useState({
    nama_layanan: "",
  });

  useEffect(() => {
    const getLayanan = async () => {
      try {
        const layananResponse = await axios.get("http://localhost:5000/layanan/");
        setLayanan(layananResponse.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getLayanan();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleRowsPerPageChange = (e) => setRowsPerPage(parseInt(e.target.value, 10));

  const handleNewLayananChange = (e) => {
    const { name, value } = e.target;
    setAddlayanan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddLayanan = async () => {
    try {
      await axios.post("http://localhost:5000/layanan/create", Addlayanan, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setShowModal(false);
      setAddlayanan({ nama_layanan: "" });
      const response = await axios.get("http://localhost:5000/layanan/");
      setLayanan(response.data);
    } catch (error) {
      console.error("Error creating layanan: ", error);
    }
  };

  const filteredLayanan = layanan
    .filter((layanan) => layanan.nama_layanan.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.nama_layanan.localeCompare(b.nama_layanan));

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentLayanan = filteredLayanan.slice(startIndex, endIndex);

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-8 flex space-x-8">
      {/* Left Side: Display Layanan */}
      <div className="w-3/5 bg-[#A8D1A1] rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Layanan - {UnitKerja}</h1>
        <input
          type="text"
          placeholder="Cari layanan..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-relaxed">
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Nama Layanan</th>
                <th className="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentLayanan.map((layanan, index) => (
                <tr key={layanan.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{startIndex + index + 1}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{layanan.nama_layanan}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-200"
                      // onClick={() => handleEdit(layanan.uuid)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <label className="mr-2 text-gray-700">Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-lg shadow-md transition duration-200 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              Prev
            </button>
            <span className="text-gray-700">{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= filteredLayanan.length}
              className={`py-2 px-4 rounded-lg shadow-md transition duration-200 ${endIndex >= filteredLayanan.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Layanan */}
      <div className="w-2/5 bg-[#A8D1A1] rounded-lg shadow-md p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tambah Layanan Baru</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleAddLayanan(); }}>
          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700 mb-2">Nama Layanan:</label>
            <input
              type="text"
              name="nama_layanan"
              value={Addlayanan.nama_layanan}
              onChange={handleNewLayananChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Masukkan nama layanan"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Layanan;
