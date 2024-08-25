import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLayanan } from '../auth/Layananslice';
import { FaEye, FaTrash, FaUserEdit } from 'react-icons/fa';

const UnitKerja = () => {
  const dispatch = useDispatch();
  const { layanan } = useSelector((state) => state.layanan);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState({ show: false, uuid: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confPassword: '',
    email: '',
    role: 'user',
    nama_unit: '',
    alamat: '',
  });

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };


  useEffect(() => {
    dispatch(fetchLayanan());
    getUsers();
  }, [dispatch]);

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
      await axios.post("http://localhost:5000/users/create", newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setNewUser({
        username: '',
        password: '',
        confPassword: '',
        email: '',
        role: 'user',
        nama_unit: '',
        alamat: '',
      });
      setShowModal(false);
      toast.success('Berhasil Membuat Unit Kerja!');
      // Refresh user list
      setShowModal(false)
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      toast.success('Gagal Membuat Unit Kerja!');
      console.error("Error creating user: ", error);
    }
  };

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${confirmDelete.uuid}`);
      // Refresh user list
      const response = await axios.get("http://localhost:5000/users");
      toast.success('Berhasil Menghapus Pengguna!');
      setUsers(response.data);
    } catch (error) {
      toast.error('Gagal Menghapus Pengguna!');
      console.error("Error deleting user: ", error);
    } finally {
      setConfirmDelete({ show: false, uuid: null });
    }
  };
  
  const handleUpdateUser = async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${uuid}`);
      const user = response.data;
      setSelectedUser(user);
      setShowModalUpdate(true);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateUserSubmit = async () => {
    console.log(selectedUser);
    
    try {
      await axios.patch(`http://localhost:5000/users/update/${selectedUser.uuid}`, selectedUser);
      toast.success('Berhasil Mengupdate Pengguna!');
      setShowModalUpdate(false);
      // Refresh user list
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      toast.error('Gagal Mengupdate Pengguna!');
      console.error("Error updating user: ", error);
    }
  };

  const handleShowLayanan = (unit) => {
    setSelectedUnit(unit);
  };

  const handleDeleteUser = (uuid) => {
    setConfirmDelete({ show: true, uuid });
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

      {showModalUpdate && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Update Pengguna</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateUserSubmit(); }}>
              <div className="mb-4">
                <label className="block text-gray-700">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={selectedUser.username}
                  onChange={handleEditUserChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleEditUserChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role:</label>
                <select
                  name="role"
                  value={selectedUser.role}
                  onChange={handleEditUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {selectedUser.unit_kerjas.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700">Nama Unit:</label>
                  <input
                    type="text"
                    name="nama_unit"
                    value={selectedUser.unit_kerjas[0].nama_unit}
                    onChange={(e) => {
                      const newUnitKerjas = [...selectedUser.unit_kerjas];
                      newUnitKerjas[0].nama_unit = e.target.value;
                      setSelectedUser((prevState) => ({ ...prevState, unit_kerjas: newUnitKerjas }));
                    }}
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
              )}
              {selectedUser.unit_kerjas.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700">Alamat:</label>
                  <input
                    type="text"
                    name="alamat"
                    value={selectedUser.unit_kerjas[0].alamat}
                    onChange={(e) => {
                      const newUnitKerjas = [...selectedUser.unit_kerjas];
                      newUnitKerjas[0].alamat = e.target.value;
                      setSelectedUser((prevState) => ({ ...prevState, unit_kerjas: newUnitKerjas }));
                    }}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowModalUpdate(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {/* Confirmation Modal */}
      {confirmDelete.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-center text-lg font-bold mb-2 bg-red-200 p-2 rounded-md" style={{ color: '#b00' }}>
              Konfirmasi Hapus
            </h2>
            <p className="mb-4 text-center">Menghapus berarti layanan terkait ikut terhapus, apakah setuju?</p>
            <div className="flex justify-center space-x-4 ">
              <button
                onClick={confirmDeleteUser}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              >
                Setuju
              </button>
              <button
                onClick={() => setConfirmDelete({ show: false, uuid: null })}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600"
              >
                Batal
              </button>
            </div>
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
                  filteredLayanan.map((layanan, index) => (
                    <li key={layanan.uuid} className="border-b py-2">
                      <span>{index + 1}. </span>
                      {layanan.nama_layanan}
                    </li>
                  ))
                ) : (
                  <p>Tidak ada layanan tersedia untuk unit kerja ini.</p>
                )}
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeLayananModal}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md mt-4  ">
        <thead className="bg-[#A8D1A1]">
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Unit Kerja</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Alamat</th>
            <th className="py-2 px-4 border-">Role</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.uuid} className=' text-center'>
              <td className="py-2 px-4 border-b">{startIndex + index + 1}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                {user.unit_kerjas.length > 0
                  ? user.unit_kerjas.map((unit, idx) => (
                    <div key={idx}>{unit.nama_unit}</div>
                  ))
                  : 'Administator'}
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.unit_kerjas[0]?.alamat || "Pusat"}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleShowLayanan(user.unit_kerjas[0]?.nama_unit)}
                    className="bg-green-500 text-white py-1 px-3 rounded-md shadow-md hover:bg-green-600 mr-2"
                  >
                    <FaEye className="inline-block mr-1" />
                  </button>
                )}
                <button
                  onClick={() => handleUpdateUser(user.uuid)}
                  className="bg-teal-500 text-white py-1 px-3 rounded-md shadow-md hover:bg-teal-600"
                >
                  <FaUserEdit className="inline-block" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.uuid)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-600 ml-2"
                >
                  <FaTrash className="inline-block mr-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value={5}>5 baris</option>
          <option value={10}>10 baris</option>
          <option value={15}>15 baris</option>
        </select>
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Sebelumnya
          </button>
          <button
            disabled={endIndex >= filteredUsers.length}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitKerja;
