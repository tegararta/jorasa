import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import EditPassword from './EditPassword'; // Pastikan nama dan jalur ini benar

function TopBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/token', { withCredentials: true });
        const { accessToken } = response.data;

        const userResponse = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        if (userResponse.data.length > 0) {
          setUser(userResponse.data[0]); // Akses elemen pertama dari array
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

  
const logout = () => {
  // Clear the token from localStorage
  localStorage.removeItem('token');
  
  // Clear cookies using js-cookie
  Cookies.remove('refreshToken'); // Replace 'yourCookieName' with the actual name of your cookie

  // Optionally, call the API to invalidate the session on the server
  axios.delete('http://localhost:5000/users/logout', { withCredentials: true })
    .then(() => {
      // Redirect to login after logout
      navigate('/login');
    })
    .catch(error => {
      console.error('Error during logout:', error);
      // Redirect to login even if there is an error during logout
      navigate('/login');
    });
};

  if (!user) {
    return <div className='flex py-6 px-10 items-center ml-auto mr-2 text-[#416829] font-semibold'>Not found</div>;
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
