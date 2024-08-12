import React from 'react';

const LayananModal = ({ editLayanan, handleEditChange, handleEdit, setShowMenu }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Layanan</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="block text-gray-700 font-bold mb-2">Nama Layanan</label>
        <input
          type="text"
          name="nama_layanan"
          value={editLayanan.nama_layanan}
          onChange={handleEditChange}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleEdit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={() => setShowMenu(false)}
          className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Batal
        </button>
      </form>
    </div>
  </div>
);

export default LayananModal;
