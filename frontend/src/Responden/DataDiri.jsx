import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DataDiri({surveyUuid, onSubmit}) {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("62");
  const [umur, setUmur] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [layanan, setLayanan] = useState([]);
  const [selectedLayanan, setSelectedLayanan] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const navigate = useNavigate();

  const getLayanan = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/survey/${surveyUuid}`);
      const layanan = response.data.user.unit_kerjas[0].layanans;
      setLayanan(layanan)
      
    } catch (error) {
      console.error(error);
    }
  }  
  useEffect(() => {

    getLayanan();
  }, []);

  useEffect(() => {
    // Memeriksa apakah semua field telah diisi
    setIsFormComplete(
      nama.trim() !== "" &&
      noHp.trim() !== "" &&
      umur.trim() !== "" &&
      jenisKelamin !== "" &&
      selectedLayanan !== ""
    );
  }, [nama, noHp, umur, jenisKelamin, selectedLayanan]);

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleNoHpChange = (event) => {
    const value = event.target.value.replace(/^62/, "");
    if (value.match(/^[0-9]*$/) && value.length <= 12) {
      setNoHp("62" + value);
    }
  };

  const handleUmurChange = (event) => {
    const value = event.target.value;
    if (value.match(/^[0-9]*$/) && value.length <= 2) {
      setUmur(value);
    }
  };

  const handleJenisKelaminChange = (event) => {
    setJenisKelamin(event.target.value);
  };

  const handleLayananChange = (event) => {
    setSelectedLayanan(event.target.value);
  };

  const handleSubmit = () => {
    if (isFormComplete) {
      const respondenData = {
        nama,
        noHp,
        umur,
        jenisKelamin,
        layanan: selectedLayanan,
      };

      // Kirim data ke SurveyPage
      onSubmit(respondenData);
    } else {
      alert("Harap lengkapi semua field sebelum melanjutkan.");
    }
  };

  return (
    <div className="bg-[#A8D1A1] min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md p-8 w-96">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#416829] p-2 rounded-md text-center">Data Responden</h2>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
            Masukkan Nama
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={handleNamaChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="noHp" className="block text-gray-700 text-sm font-bold mb-2">
            Masukkan No. HP
          </label>
          <input
            type="text"
            id="noHp"
            value={noHp}
            onChange={handleNoHpChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="umur" className="block text-gray-700 text-sm font-bold mb-2">
            Masukkan Umur
          </label>
          <input
            type="text"
            id="umur"
            value={umur}
            onChange={handleUmurChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="layanan" className="block text-gray-700 text-sm font-bold mb-2">
            Layanan
          </label>
          <select
            id="layanan"
            value={selectedLayanan}
            onChange={handleLayananChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Layanan</option>
            {layanan.map((service) => (
              <option key={service.id} value={service.id}>
                {service.nama_layanan}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="jenisKelamin" className="block text-gray-700 text-sm font-bold mb-2">
            Pilih Jenis Kelamin
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="laki-laki"
              name="jenisKelamin"
              value="laki-laki"
              checked={jenisKelamin === "laki-laki"}
              onChange={handleJenisKelaminChange}
              className="mr-2"
            />
            <label htmlFor="laki-laki" className="mr-4">
              Laki-laki
            </label>
            <input
              type="radio"
              id="perempuan"
              name="jenisKelamin"
              value="perempuan"
              checked={jenisKelamin === "perempuan"}
              onChange={handleJenisKelaminChange}
              className="mr-2"
            />
            <label htmlFor="perempuan">Perempuan</label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className={`bg-[#416829] hover:bg-[#A1C19C] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${!isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormComplete}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataDiri;
