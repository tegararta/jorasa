import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Sidebar = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (item, path) => {
    setSelected(item);
    navigate(path); // Arahkan ke halaman yang sesuai
    setIsOpen(false); // Tutup menu setelah klik pada mobile
  };

  return (
    <div className="relative">
      {/* Button untuk membuka sidebar di mobile */}
      <div className="lg:hidden justify-center ">
        <button onClick={toggleMenu}>
        {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`bg-[#A8D1A1] overflow-y-auto p-6 w-[250px] h-screen shadow-lg fixed top-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:transform-none lg:static lg:translate-x-0`}>
        <button onClick={toggleMenu}>
          {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}  
        </button>
        <div className="flex items-center justify-center mb-4">
          <img src="/icon/pemda.png" alt="logo" className="h-17 w-16" />
          <h1 className="text-2xl font-extrabold ml-5 text-[#416829]">JoRasa</h1>
        </div>
        <div className="mb-8">
          <hr className="border-t-2 border-[#416829] mx-4" />
        </div>
        <ul className="flex flex-col gap-4 pl-4 pr-4">
          <li onClick={() => handleClick("Dashboard", "/dashboard")}>
            <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "Dashboard" && "bg-[#A8D1A1]"}`}>
              <img src="/icon/home.png" alt="Beranda" className="w-6 h-6" />
              <span>Dashboard</span>
            </div>
          </li>
          {user && user.role === "admin" && (
            <li onClick={() => handleClick("Unit Kerja", "/unitkerja")}>
              <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "Unit Kerja" && "bg-[#A8D1A1]"}`}>
                <img src="/icon/building.png" alt="building" className="w-6 h-6" />
                <span>Unit Kerja</span>
              </div>
            </li>
          )}
          {user && user.role === "user" && (
            <li onClick={() => handleClick("Layanan", "/layanan")}>
              <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "Layanan" && "bg-[#A8D1A1]"}`}>
                <img src="/icon/building.png" alt="building" className="w-6 h-6" />
                <span>Layanan</span>
              </div>
            </li>
          )}
          <li>
            <h1 className="text-md font-bold mt-8">Survey</h1>
          </li>
          {user && user.role === "user" && (
            <li onClick={() => handleClick("Buat Survey", "/buatsurvey")}>
              <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "Buat Survey" && "bg-[#A8D1A1]"}`}>
                <img src="/icon/list.png" alt="survey" className="w-6 h-6" />
                <span>Buat Survey</span>
              </div>
            </li>
          )}
          <li onClick={() => handleClick("List Survey", "/listsurvey")}>
            <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "List Survey" && "bg-[#A8D1A1]"}`}>
              <img src="/icon/list.png" alt="survey" className="w-6 h-6" />
              <span>List Survey</span>
            </div>
          </li>
          <li>
            <h1 className="text-md font-bold mt-8">Laporan</h1>
          </li>
          <li onClick={() => handleClick("Kotak Saran", "/saran")}>
            <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "Kotak Saran" && "bg-[#A8D1A1]"}`}>
              <img src="/icon/suggest.png" alt="suggest" className="w-6 h-6" />
              <span>Laporan Saran</span>
            </div>
          </li>
          <li onClick={() => handleClick("Laporan Survey", "/laporan-survey")}>
            <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "Laporan Survey" && "bg-[#A8D1A1]"}`}>
              <img src="/icon/report.png" alt="report" className="w-6 h-6" />
              <span>Laporan Survey</span>
            </div>
          </li>
          <li>
            <h1 className="text-md font-bold mt-8">Data</h1>
          </li>
          <li onClick={() => handleClick("Responden", "/dataresponden")}>
            <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-green-100 transition-all duration-300 ${selected === "Responden" && "bg-[#A8D1A1]"}`}>
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
