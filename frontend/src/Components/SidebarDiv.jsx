import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleClick = (item, path) => {
    setSelected(item);
    navigate(path); // Arahkan ke halaman yang sesuai
  };

  return (
    <div className="bg-[#A8D1A1] p-10 w-auto h-auto shadow-lg justify-between">
      <div>
        <div className="flex items-center justify-center mb-4">
          <img
            src="/icon/pemda.png"
            alt="logo"
            className="h-17 w-16"
          />
          <h1 className="text-2xl font-extrabold ml-5 text-[#416829]">JoRasa</h1>
        </div>
        <div className="mb-8">
          <hr className="border-t-2 border-[#416829] mx-4" />
        </div>
        <ul className="flex flex-col gap-4 pl-4 pr-4">
          <li onClick={() => handleClick("Dashboard", "/dashboard")}>
            <div
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${
                selected === "Dashboard" && "bg-[#A8D1A1]"
              }`}
            >
              <img src="/icon/home.png" alt="Beranda" className="w-6 h-6" />
              <span>Dashboard</span>
            </div>
          </li>
          <li onClick={() => handleClick("Unit Kerja", "/unitkerja")}>
            <div
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${
                selected === "Unit Kerja" && "bg-[#A8D1A1]"
              }`}
            >
              <img src="/icon/building.png" alt="building" className="w-6 h-6" />
              <span>Unit Kerja (admin)</span>
            </div>
          </li>
          <li onClick={() => handleClick("Layanan", "/layanan")}>
            <div
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${
                selected === "Layanan" && "bg-[#A8D1A1]"
              }`}
            >
              <img src="/icon/building.png" alt="building" className="w-6 h-6" />
              <span>Layanan (user)</span>
            </div>
          </li>
          <li>
            <h1 className="text-md font-bold mt-8">Survey</h1>
          </li>
          <li onClick={() => handleClick("Buat Survey", "/buatsurvey")}>
            <div
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${
                selected === "Buat Survey" && "bg-[#A8D1A1]"
              }`}
            >
              <img src="/icon/list.png" alt="survey" className="w-6 h-6" />
              <span>Buat Survey (user)</span>
            </div>
          </li>
          <li>
            <h1 className="text-md font-bold mt-8">Laporan</h1>
          </li>
          <li onClick={() => handleClick("Kotak Saran", "/saran")}>
            <div
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${
                selected === "Kotak Saran" && "bg-[#A8D1A1]"
              }`}
            >
              <img src="/icon/suggest.png" alt="suggest" className="w-6 h-6" />
              <span>Laporan Saran</span>
            </div>
          </li>
          <li onClick={() => handleClick("Laporan Survey", "/laporan-survey")}>
            <div
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${
                selected === "Laporan Survey" && "bg-[#A8D1A1]"
              }`}
            >
              <img src="/icon/report.png" alt="report" className="w-6 h-6" />
              <span>Laporan Survey</span>
            </div>
          </li>
          <li>
            <h1 className="text-md font-bold mt-8">Data</h1>
          </li>
          <li onClick={() => handleClick("Responden", "/dataresponden")}>
            <div
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${
                selected === "Responden" && "bg-[#A8D1A1]"
              }`}
            >
              <img src="/icon/users.png" alt="users" className="w-6 h-6" />
              <span>Responden</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
