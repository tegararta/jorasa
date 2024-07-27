import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="bg-[#A8D1A1] flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-[1280px] bg-white relative overflow-hidden rounded-lg shadow-lg">
        <div className="relative flex flex-col lg:flex-row">
          {/* Image Container */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <img className="w-1/2 h-auto object-cover" alt="Login Background" src="/assets/asset_login.png" />
          </div>
          {/* Form Container */}
          <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col bg-[#E2F4DF] justify-center">
            <div className="text-[#416829] text-4xl font-extrabold mb-8 text-center">
              JORASA
            </div>

            <div className="flex flex-col space-y-4 mb-8">
              <div className="relative bg-[#80a668] rounded-full flex items-center">
                <img
                  className="w-5 h-5 absolute top-1/2 left-6 transform -translate-y-1/2"
                  alt="Nama Icon"
                  src="/assets/image8.png"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nama"
                  className="w-full h-12 bg-transparent text-white text-lg pl-16 pr-4 rounded-full outline-none placeholder:text-white placeholder:opacity-70"
                />
              </div>

              <div className="relative bg-[#80a668] rounded-full flex items-center">
                <img
                  className="w-5 h-5 absolute top-1/2 left-6 transform -translate-y-1/2"
                  alt="Sandi Icon"
                  src="/assets/image9.png"
                />
                <input
                  type="password" // Ganti type menjadi password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sandi"
                  className="w-full h-12 bg-transparent text-white text-lg pl-16 pr-4 rounded-full outline-none placeholder:text-white placeholder:opacity-70"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Link to="/dashboard" className="bg-[#416829] hover:bg-[#A8D1A1] text-white font-bold py-2 px-6 rounded-full">
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
