import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnitKerja = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [layanan, setLayanan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
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
    const getUsersAndLayanan = async () => {
      try {
        const [usersResponse, layananResponse] = await Promise.all([
          axios.get("http://localhost:5000/akun"),
          axios.get("http://localhost:5000/layanan/")
        ]);
        setUsers(usersResponse.data);
        setLayanan(layananResponse.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getUsersAndLayanan();
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
    const confirmDelete = window.confirm("Anda yakin ingin menghapus pengguna ini?");
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

  const handleShowLayanan = (unit) => {
    setSelectedUnit(unit);
  };

  const closeLayananModal = () => {
    setSelectedUnit(null);
  };

  const filteredLayanan = layanan.filter(layanan =>
    selectedUnit && layanan.unit_kerja && layanan.unit_kerja.nama_unit === selectedUnit
  );

  const filteredUsers = users
    .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.username.localeCompare(b.username)); // Sorting users alphabetically

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Pengguna</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari pengguna..."
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

      {/* Modal for creating new user */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Buat Pengguna Baru</h2>
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
                <label className="block text-gray-700">Konfirmasi Password:</label>
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

              {/* Conditionally render Nama Unit and Alamat fields */}
              {newUser.role !== 'admin' && (
                <>
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
                </>
              )}

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

      {/* Modal for viewing layanan */}
      {selectedUnit && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Detail Layanan - {selectedUnit}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Layanan:</h3>
              <ul>
                {filteredLayanan.length > 0 ? (
                  filteredLayanan.map((layanan) => (
                    <li key={layanan.id}>{layanan.nama_layanan}</li>
                  ))
                ) : (
                  <li>Tidak ada layanan terkait unit ini.</li>
                )}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeLayananModal}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Nama Unit</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentUsers.map((user) => (
              <tr key={user.uuid} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.username}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.role}</td>
                <td className="py-3 px-6 text-left">{user.nama_unit}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => handleShowLayanan(user.nama_unit)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600 mr-2"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.uuid)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded-lg shadow-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            Prev
          </button>
          <span className="mx-2">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= filteredUsers.length}
            className={`py-2 px-4 rounded-lg shadow-md ${endIndex >= filteredUsers.length ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitKerja;

