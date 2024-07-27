import React, { useState } from 'react';
import EditPassword from './EditPassword'; // Pastikan nama dan jalur ini benar

function TopBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false); // State to show EditPassword component

  const user = {
    name: 'John Doe',
    profilePicture: 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg',
  };

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEditPassword = () => {
    setShowMenu(false); // Tutup menu
    setShowEditPassword(true); // Tampilkan komponen EditPassword
  };

  const handleCloseEditPassword = () => {
    setShowEditPassword(false); // Tutup komponen EditPassword
  };

  return (
    <div className=''>
      <div className="bg-white py-6 px-10 flex items-center justify-between">
        <div className="flex items-center ml-auto ">
          <span className="mr-2 text-[#416829] font-semibold">
            Halo, {user.name}
          </span>
          <div className="relative">
            <img
              src={user.profilePicture}
              alt="fotouser"
              className="rounded-full w-8 h-8 cursor-pointer"
              onClick={handleProfileClick}
            />
            {showMenu && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md w-48">
                <ul className="p-2">
                  <li
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={handleEditPassword}
                  >
                    Ubah Kata Sandi
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {showEditPassword && <EditPassword onClose={handleCloseEditPassword} />}
    </div>
  );
}

export default TopBar;
