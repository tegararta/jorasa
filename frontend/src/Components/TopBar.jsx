import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logOut, reset } from "../auth/Authslice";
import EditPassword from './EditPassword'; 

function TopBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
  
  }, [user]);

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
  
  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const logout = async () => {
    dispatch(logOut());
    dispatch(reset());
    deleteCookie();
    navigate("/login");
  };
  
  if (!user) {
    return <div className='flex py-6 px-10 items-center ml-auto mr-2 text-gray-500 font-semibold'>Not found</div>;
  }

  return (
    <nav className="bg-white py-4 shadow-md bg-transparent  border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center backdrop-blur-3xl">
        <div className="flex items-center ml-auto">
          <span className="mr-2 text-gray-600 font-semibold">
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
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleEditPassword}
                  >
                    Ubah Kata Sandi
                  </li>
                  <li 
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={logout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {showEditPassword && <EditPassword uuid={user.uuid} onClose={handleCloseEditPassword} />}
    </nav>
  );
}

export default TopBar;