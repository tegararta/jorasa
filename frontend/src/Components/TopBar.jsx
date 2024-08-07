import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPassword from './EditPassword'; // Pastikan nama dan jalur ini benar

function TopBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:5000/userOn/', {
          credentials: 'include'
        });

        console.log(response); // Cetak respons untuk debug

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error(error); // Cetak kesalahan untuk debug
      }
    };

    fetchUsername();
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

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'DELETE',
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
  
      const data = await response.json();
      console.log(data); // Cetak respons untuk debug
  
      // Redirect ke halaman login atau halaman lain setelah logout
      navigate('/login');
    } catch (error) {
      console.error(error); // Cetak kesalahan untuk debug
    }
  };
  
  if (!username) {
    return <div className='flex py-6 px-10 items-center ml-auto mr-2 text-[#416829] font-semibold'>Not found</div>;
  }

  return (
    <div className=''>
      <div className="bg-white py-6 px-10 flex items-center justify-between">
        <div className="flex items-center ml-auto ">
          <span className="mr-2 text-[#416829] font-semibold">
            Halo, {username}
          </span>
          <div className="relative">
            <img
              src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Pic.png"
              alt="fotouser"
              className="rounded-full w-10 h-10 cursor-pointer"
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
                  <li 
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={logout}>Logout</li>
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
