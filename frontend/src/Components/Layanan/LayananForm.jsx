import React from 'react';

const LayananForm = ({ Addlayanan, handleNewLayananChange, handleAddLayanan }) => (
  <div className="w-2/5 bg-white mb-auto rounded-lg shadow-xl p-10 mt-60">
    <h1 className="bg-[#A8D1A1] m-19 px-4 py-2 rounded-3xl text-2xl font-bold mb-6 text-gray-800">Tambah Layanan</h1>
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
    </form>
  </div>
);

export default LayananForm;
