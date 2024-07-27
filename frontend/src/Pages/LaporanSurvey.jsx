import React, { useState } from 'react';

const LaporanSurvey = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(2);

  const data = [
    {
      unitKerja: 'Unit Kerja A',
      layanan: [
        { name: 'Layanan 1', rating: { 1: 100, 2: 0, 3: 23, 4: 98, 5: 87 } },
        { name: 'Layanan 2', rating: { 1: 80, 2: 10, 3: 40, 4: 70, 5: 90 } },
      ],
    },
    {
      unitKerja: 'Unit Kerja B',
      layanan: [
        { name: 'Layanan 1', rating: { 1: 90, 2: 20, 3: 35, 4: 95, 5: 85 } },
        { name: 'Layanan 2', rating: { 1: 100, 2: 30, 3: 45, 4: 85, 5: 95 } },
      ],
    },
    // Add more data as needed for testing pagination
  ];

  // Calculate indices for current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentData = data.slice(indexOfFirstEntry, indexOfLastEntry);

  // Update number of entries per page
  const handleEntriesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setEntriesPerPage(value);
      setCurrentPage(1); // Reset to first page when entries per page change
    }
  };

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-center text-lg font-bold mb-4">Laporan Survey</h2>
      <div className="flex justify-end mb-4">
        <label htmlFor="entries" className="mr-2">
          Show
        </label>
        <input
          type="number"
          id="entries"
          className="w-16 border rounded"
          value={entriesPerPage}
          onChange={handleEntriesChange}
        />
        <span className="ml-2">entries</span>
      </div>
      <table className="w-full table-auto">
        <thead className="bg-[#A8D1A1]">
          <tr>
            <th className="px-4 py-2 text-center">Unit Kerja</th>
            <th className="px-4 py-2 text-center">Layanan</th>
            <th className="px-4 py-2 text-center">★</th>
            <th className="px-4 py-2 text-center">★★</th>
            <th className="px-4 py-2 text-center">★★★</th>
            <th className="px-4 py-2 text-center">★★★★</th>
            <th className="px-4 py-2 text-center">★★★★★</th>
            <th className="px-4 py-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            item.layanan.map((layanan, layananIndex) => (
              <tr key={`${index}-${layananIndex}`}>
                {layananIndex === 0 ? (
                  <td className="px-4 py-2 border text-center" rowSpan={item.layanan.length}>
                    {item.unitKerja}
                  </td>
                ) : null}
                <td className="px-4 py-2 border text-center">{layanan.name}</td>
                <td className="px-4 py-2 border text-center">{layanan.rating[1]}</td>
                <td className="px-4 py-2 border text-center">{layanan.rating[2]}</td>
                <td className="px-4 py-2 border text-center">{layanan.rating[3]}</td>
                <td className="px-4 py-2 border text-center">{layanan.rating[4]}</td>
                <td className="px-4 py-2 border text-center">{layanan.rating[5]}</td>
                <td className="px-4 py-2 border text-center">
                  {Object.values(layanan.rating).reduce((sum, value) => sum + value, 0)}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={currentPage === Math.ceil(data.length / entriesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LaporanSurvey;
