import React from 'react';

const LayananForm = ({ Addlayanan, handleNewLayananChange, handleAddLayanan, closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
    <div className="bg-white rounded-lg shadow-xl p-10 w-2/5 z-50">
      <h2 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-[#4a993d] to-[#A8D1A1] p-2 rounded-md text-white">Tambah Layanan</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="block text-gray-700 font-bold mb-2">Nama Layanan</label>
        <input
          type="text"
          name="nama_layanan"
          value={Addlayanan.nama_layanan}
          onChange={handleNewLayananChange}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAddLayanan}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Batal
        </button>
      </form>
    </div>
  </div>
);

export default LayananForm;
