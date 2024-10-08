import React, { useState } from 'react';
import axios from 'axios';

function EditPassword({ uuid, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Kata sandi baru dan konfirmasi kata sandi tidak cocok');
      return;
    }
    
    try {
      const response = await axios.patch(`http://localhost:5000/users/update/${uuid}`, {
        sandilama: currentPassword,
        password: newPassword,
        confPassword: confirmPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Kata sandi berhasil diperbarui');
        onClose(); // Tutup form setelah pengiriman
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Gagal memperbarui kata sandi');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Ubah Kata Sandi</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Kata Sandi Saat Ini
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#416829] hover:bg-[#000000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Simpan Perubahan
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-2"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPassword;
