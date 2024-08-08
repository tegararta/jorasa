import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnitKerja = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confPassword: '',
    email: '',
    role: 'user',
    nama_unit: '',
    alamat: '',
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/akun");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:5000/akun/create", newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setShowModal(false);
      setNewUser({
        username: '',
        password: '',
        confPassword: '',
        email: '',
        role: 'user',
        nama_unit: '',
        alamat: '',
      });
      // Refresh user list
      const response = await axios.get("http://localhost:5000/akun");
      setUsers(response.data);
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  const handleDeleteUser = async (uuid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/akun/${uuid}`);
        // Refresh user list
        const response = await axios.get("http://localhost:5000/akun");
        setUsers(response.data);
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    }
  };

  const filteredUsers = users
    .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.username.localeCompare(b.username)); // Sorting users alphabetically

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <div className="flex justify-between items-center mb-4">
        <input 
          type="text" 
          placeholder="Search user..." 
          value={searchTerm} 
          onChange={handleSearch} 
          className="border border-gray-300 rounded-lg p-2 w-full max-w-sm"
        />
        <button 
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Buat Akun
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Create New User</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div className="mb-4">
                <label className="block text-gray-700">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleNewUserChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password:</label>
                <input
                  type="password"
                  name="confPassword"
                  value={newUser.confPassword}
                  onChange={handleNewUserChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role:</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nama Unit:</label>
                <input
                  type="text"
                  name="nama_unit"
                  value={newUser.nama_unit}
                  onChange={handleNewUserChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Alamat:</label>
                <input
                  type="text"
                  name="alamat"
                  value={newUser.alamat}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Tambah
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Unit Kerja</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.uuid}>
              <td className="py-2 px-4 border-b">{startIndex + index + 1}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                {user.unit_kerjas.length > 0
                  ? user.unit_kerjas.map((unit, idx) => (
                      <div key={idx}>{unit.nama_unit}</div>
                    ))
                  : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleDeleteUser(user.uuid)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <select 
          value={rowsPerPage} 
          onChange={handleRowsPerPageChange}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <div className="text-gray-700">
          {startIndex + 1} - {endIndex > filteredUsers.length ? filteredUsers.length : endIndex} of {filteredUsers.length}
        </div>
        <div>
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="bg-blue-500 text-white py-1 px-3 rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            &lt;
          </button>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={endIndex >= filteredUsers.length}
            className="bg-blue-500 text-white py-1 px-3 rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-300 ml-2"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitKerja;
