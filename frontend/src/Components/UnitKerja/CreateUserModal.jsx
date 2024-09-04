import React from 'react';

const CreateUserModal = ({ showModal, setShowModal, newUser, handleNewUserChange, handleAddUser }) => {
  return (
    showModal && (
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
            {/* ... (Other input fields) */}
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
    )
  );
};

export default CreateUserModal;
