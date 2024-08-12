import React from 'react';

const LayananModal = ({ selectedUnit, filteredLayanan, closeLayananModal }) => {
  return (
    selectedUnit && (
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
    )
  );
};

export default LayananModal;
