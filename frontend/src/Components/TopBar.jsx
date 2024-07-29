import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPassword from './EditPassword'; // Pastikan nama dan jalur ini benar

function TopBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length > 0) {
          setUser(response.data[0]); // Akses elemen pertama dari array
        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEditPassword = () => {
    setShowMenu(false);
    setShowEditPassword(true);
  };

  const handleCloseEditPassword = () => {
    setShowEditPassword(false); 
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className=''>
      <div className="bg-white py-6 px-10 flex items-center justify-between">
        <div className="flex items-center ml-auto ">
          <span className="mr-2 text-[#416829] font-semibold">
            Halo, {user.username}
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
