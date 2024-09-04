import React from 'react';
import { Link } from 'react-router-dom';

function TentangKami() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center px-9">
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

        <div className="flex flex-col md:flex-row gap-8 items-center mt-20">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="assets/asset_about.png"
            alt="Tentang Kami"
            className="w-3/4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg mb-4 text-gray-700">
            JoRasa adalah sebuah platform survei online yang dirancang
            khusus untuk mengumpulkan dan menganalisis umpan balik dari
            masyarakat Kabupaten Jombang.
          </p>
          <p className="text-lg mb-4 text-gray-700">
            Tujuan kami adalah memberikan wadah bagi warga Jombang untuk
            mengungkapkan pendapat, aspirasi, dan masukan mereka mengenai
            layanan dari unit kerja yang ada.
          </p>
          <p className="text-lg mb-4 text-gray-700">
            Kami percaya bahwa dengan melibatkan suara masyarakat,
            Kabupaten Jombang dapat berkembang menjadi daerah yang lebih maju
            dan sejahtera.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TentangKami;