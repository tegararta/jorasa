import React from 'react';
import { Link } from 'react-router-dom';

const Beranda = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center px-9 shadow-md py-6">
          <img src="/assets/logo.png" alt="Logo" className="h-12 w-auto" />
          <div className="flex gap-10">
            <Link to="/" className="text-[#416829] font-bold hover:text-[#A8D1A1] transition duration-300 ease-in-out">
              Beranda
            </Link>
            <Link to="/TentangKami" className="text-[#416829] font-bold hover:text-[#A8D1A1] transition duration-300 ease-in-out">
              Tentang Kami
            </Link>
            <Link to="/login" className="text-[#416829] font-bold hover:text-[#A8D1A1] transition duration-300 ease-in-out">
              Masuk
            </Link>
          </div>
        </div>

        <div className="flex items-center mt-16 px-8 py-5">
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-bold text-[#416829]">Selamat Datang di</h1>
            <h2 className="text-6xl font-extrabold text-[#416829] mt-4">JoRasa</h2>

            <div className="mt-4">
              <p className="text-gray-700 text-lg">
                Sebuah platform survei yang dirancang untuk mengumpulkan
                <br />
                dan menganalisis umpan balik dari masyarakat Kabupaten Jombang.
              </p>
            </div>

            <div className="mt-8">
              <Link to="/login" className="bg-[#416829] hover:bg-[#A8D1A1] text-white font-bold py-2 px-4 rounded-full">
                Masuk 
              </Link>
            </div>
          </div>

          <div className="flex-none ml-4">
            <img src="/assets/asset_landing.png" alt="Gambar" style={{ width: '526px', height: 'auto' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;