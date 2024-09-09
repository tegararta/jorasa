import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Menggunakan icon untuk menu

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/assets/logo.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10">
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

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#416829] focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <HiX className="w-8 h-8" /> : <HiMenuAlt3 className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <Link to="/" className="block py-2 px-4 text-[#416829] font-bold hover:bg-[#F0F4F1] transition duration-300" onClick={toggleMenu}>
            Beranda
          </Link>
          <Link to="/TentangKami" className="block py-2 px-4 text-[#416829] font-bold hover:bg-[#F0F4F1] transition duration-300" onClick={toggleMenu}>
            Tentang Kami
          </Link>
          <Link to="/login" className="block py-2 px-4 text-[#416829] font-bold hover:bg-[#F0F4F1] transition duration-300" onClick={toggleMenu}>
            Masuk
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
