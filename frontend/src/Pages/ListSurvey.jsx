import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import QRCode from 'qrcode.react';

const ListSurvey = () => {
  const [surveys, setSurveys] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [openSurveyIndex, setOpenSurveyIndex] = useState(null);
  const [showSurveyLink, setShowSurveyLink] = useState(false);
  const [selectedSurveyLink, setSelectedSurveyLink] = useState('');
  const [confirmDelete, setConfirmDelete] = useState({ show: false, index: null });

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('http://localhost:5000/survey/');
      setSurveys(response.data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };
  useEffect(() => {

    fetchSurveys();
  }, []);

  const toggleDropdown = (index) => {
    setOpenSurveyIndex(openSurveyIndex === index ? null : index);
  };

  const confirmDeletion = (index) => {
    setConfirmDelete({ show: true, index });
  };

  const deleteSurvey = async (index) => {
    const surveyToDelete = surveys[index];
    const uuid = surveyToDelete.uuid;

    try {
        await axios.delete(`http://localhost:5000/survey/delete/${uuid}`);
        const updatedSurveys = [...surveys];
        updatedSurveys.splice(index, 1);
        setSurveys(updatedSurveys);
        setConfirmDelete({ show: false, index: null });
    } catch (error) {
        console.error("Failed to delete survey:", error);
        // Anda bisa menambahkan notifikasi kesalahan di sini
    }
};

  const showLink = (link) => {
    setSelectedSurveyLink(link);
    setShowSurveyLink(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#FFFFFF] p-4 rounded-md mb-4 shadow-lg">
        <h2 className="text-lg font-bold text-center mb-2 bg-[#A8D1A1] p-2 rounded-md" style={{ color: '#416829' }}>
          Daftar Survey
        </h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              {user && user.role === "admin" && (
                <th className="py-2 px-4 border-b">Unit Kerja</th>
              )}
              <th className="py-2 px-4 border-b">Judul Survey</th>
              <th className="py-2 px-4 border-b">Jumlah Pertanyaan</th>
              <th className="py-2 px-4 border-b">Tanggal</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {surveys.length > 0 ? (
              surveys.map((survey, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                    {user && user.role === "admin" && (
                    <td className="py-2 px-4 border-b">{survey.user.unit_kerjas[0]?.nama_unit || 'N/A'}</td>
                    )}
                    <td className="py-2 px-4 border-b">{survey.judul}</td>
                    <td className="py-2 px-4 border-b text-center">{survey.pertanyaans.length}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(survey.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="bg-[#416829] hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full text-sm"
                        >
                          {openSurveyIndex === index ? 'Tutup' : 'Lihat Detail'}
                        </button>
                        <button
                          onClick={() => confirmDeletion(index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full text-sm"
                        >
                          Hapus
                        </button>
                        <button
                          onClick={() => showLink(`http://localhost:5000/survey/${survey.url}`)}
                          className="bg-[#416829] hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full text-sm"
                        >
                          Tampilkan Link
                        </button>
                      </div>
                    </td>
                  </tr>
                  {openSurveyIndex === index && (
                    <tr>
                      <td colSpan="5" className="py-2 px-4 border-b">
                        <ul className="list-disc pl-5">
                          {survey.pertanyaans.map((question, qIndex) => (
                            <li key={qIndex}>{question.pertanyaan}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 border-b text-center">Tidak ada survey.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showSurveyLink && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-bold mb-2 bg-[#A8D1A1] p-2 rounded-md" style={{ color: '#416829' }}>
              Link dan QR Code Survey
            </h2>
            <p className="mt-4">Berikut adalah link untuk mengakses survei Anda:</p>
            <a href={selectedSurveyLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {selectedSurveyLink}
            </a>
            <div className="flex justify-center mt-4 mb-4">
              <QRCode value={selectedSurveyLink} size={200} />
            </div>
            <button
              onClick={() => setShowSurveyLink(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      {confirmDelete.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-bold mb-2 bg-red-200 p-2 rounded-md" style={{ color: '#b00' }}>
              Konfirmasi Hapus
            </h2>
            <p className="mt-4">Apakah Anda yakin ingin menghapus survei ini?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => deleteSurvey(confirmDelete.index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full text-sm"
              >
                Ya
              </button>
              <button
                onClick={() => setConfirmDelete({ show: false, index: null })}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-full text-sm"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSurvey;
