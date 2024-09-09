import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Beranda = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar />
      
      {/* Konten utama */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:mt-16 mt-8 lg:px-8 py-5">
          {/* Konten teks */}
          <div className="flex-1 text-center lg:text-left mb-8 lg:mb-7">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#416829]">Selamat Datang di</h2>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-[#416829] mt-4">JoRasa</h2>

            <p className="text-gray-700 text-lg mt-4">
              Sebuah platform survei yang dirancang untuk mengumpulkan
              <br className="hidden lg:block" />
              dan menganalisis umpan balik dari masyarakat Kabupaten Jombang.
            </p>

            <div className="mt-8">
              <Link to="/login" className="bg-[#416829] hover:bg-[#A8D1A1] text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out">
                Masuk
              </Link>
            </div>
          </div>

          {/* Gambar */}
          <div className="flex-none">
            <img
              src="/assets/asset_landing.png"
              alt="Gambar Landing"
              className='w-auto h-auto rounded-lg transform hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
