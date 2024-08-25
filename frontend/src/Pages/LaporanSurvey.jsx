import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LaporanSurvey = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/responden/');
        const fetchedData = response.data;

        const processedData = fetchedData.reduce((acc, item) => {
          // Cek apakah item.survey dan item.survey.user terdefinisi
          if (item.survey && item.survey.user) {
            const unit = item.survey.user.unit_kerjas[0]?.nama_unit || 'Unknown Unit';
            const layanan = item.layanan;
            const ratings = item.jawabans.reduce((acc, jwb) => {
              acc[jwb.bintang] = (acc[jwb.bintang] || 0) + 1;
              return acc;
            }, {});

            const existingItem = acc.find(l => l.layanan === layanan && l.unit === unit);
            if (existingItem) {
              for (let i = 1; i <= 5; i++) {
                existingItem.rating[i] = (existingItem.rating[i] || 0) + (ratings[i] || 0);
              }
            } else {
              acc.push({
                unit,
                layanan,
                rating: ratings,
              });
            }
          }
          return acc;
        }, []);

        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentData = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleEntriesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setEntriesPerPage(value);
      setCurrentPage(1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const groupedData = currentData.reduce((acc, item) => {
    const existingGroup = acc.find(group => group.unit === item.unit);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      acc.push({
        unit: item.unit,
        items: [item],
      });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-center text-lg font-bold mb-4">Laporan Survey</h2>
      <div className="flex justify-end mb-4">
        <label htmlFor="entries" className="mr-2">Show</label>
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
            {user?.role === "admin" && <th className="px-4 py-2 text-center">Unit Kerja</th>}
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
          {groupedData.map((group, groupIndex) => (
            group.items.map((item, index) => (
              <tr key={index}>
                {user?.role === "admin" && index === 0 && (
                  <td
                    className="px-4 py-2 border text-center"
                    rowSpan={group.items.length}
                  >
                    {group.unit}
                  </td>
                )}
                <td className="px-4 py-2 border text-center">{item.layanan}</td>
                <td className="px-4 py-2 border text-center">{item.rating[1] || 0}</td>
                <td className="px-4 py-2 border text-center">{item.rating[2] || 0}</td>
                <td className="px-4 py-2 border text-center">{item.rating[3] || 0}</td>
                <td className="px-4 py-2 border text-center">{item.rating[4] || 0}</td>
                <td className="px-4 py-2 border text-center">{item.rating[5] || 0}</td>
                <td className="px-4 py-2 border text-center">
                  {Object.values(item.rating).reduce((sum, value) => sum + value, 0)}
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
