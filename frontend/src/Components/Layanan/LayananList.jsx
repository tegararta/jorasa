import React from 'react';

const LayananList = ({
  layanan,
  searchTerm,
  handleSearch,
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  handleMenu,
  handleDelete,
}) => {
  const filteredLayanan = layanan
    .filter((layanan) => layanan.nama_layanan.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.nama_layanan.localeCompare(b.nama_layanan));

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentLayanan = filteredLayanan.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-white mb-auto rounded-lg shadow-xl p-6">
      <h1 className="bg-[#A8D1A1] m-19 flex px-4 py-2 rounded-3xl p-0.5 text-2xl font-bold mb-6 text-gray-800">Daftar Layanan</h1>
      <input
        type="text"
        placeholder="Cari layanan..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="overflow-x-auto">
        <table className=" border-separate border border-slate-500 min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-relaxed">
              <th className="border border-slate-600 py-3 px-6 text-left">No</th>
              <th className="border border-slate-600 py-3 px-6 text-left">Nama Layanan</th>
              <th className="border border-slate-600 py-3 px-6 text-left">Banyak Ulasan</th>
              <th className="border border-slate-600 py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentLayanan.map((layanan, index) => (
              <tr key={layanan.uuid} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="border border-slate-700 py-3 px-6 text-left">{startIndex + index + 1}</td>
                <td className="border border-slate-700 py-3 px-6 text-left whitespace-nowrap">{layanan.nama_layanan}</td>
                <th className="border border-slate-900 py-3 px-6 text-left">99</th>
                <td className="border border-slate-700 py-3 px-6 text-left whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-200"
                    onClick={() => handleMenu(layanan.uuid)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(layanan.uuid)}
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
  );
};

export default LayananList;
