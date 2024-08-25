import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLayanan } from '../auth/Layananslice'; // Pastikan path ini sesuai dengan lokasi file slice
import { toast } from 'react-toastify';
import LayananList from '../Components/Layanan/LayananList';
import LayananForm from '../Components/Layanan/LayananForm';
import LayananModal from '../Components/Layanan/Modal/LayananModal';
import axios from 'axios';

const Layanan = () => {
  const dispatch = useDispatch();
  
  // Mengambil data layanan dari Redux store
  const { layanan, isLoading, isError, msg } = useSelector((state) => state.layanan);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, uuid: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [Addlayanan, setAddLayanan] = useState({
    nama_layanan: '',
  });
  const [editLayanan, setEditLayanan] = useState({
    uuid: '',
    nama_layanan: '',
  });
  const [modal, setModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Mengambil data layanan saat komponen pertama kali di-render
  useEffect(() => {
    dispatch(fetchLayanan());
  }, [dispatch]);

  const handleNewLayananChange = (e) => {
    setAddLayanan({
      ...Addlayanan,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddLayanan = async () => {
    try {
      await axios.post('http://localhost:5000/layanan/create', Addlayanan);
      setAddLayanan({
        nama_layanan: '',
      });
      toast.success('Berhasil menambahkan Layanan!');
      dispatch(fetchLayanan()); // Ambil ulang data layanan setelah menambah layanan baru
      setModal(false); // Tutup modal setelah menambah layanan
    } catch (error) {
      console.error(error);
      toast.error('Failed to add Layanan.');
    }
  };

  const handleMenu = async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/layanan/${uuid}`);    
      setEditLayanan(response.data); // Menyimpan data yang diambil ke dalam state editLayanan
      setShowMenu(true); // Menampilkan modal edit setelah data berhasil diambil
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch Layanan details.');
    }
  };

  const handleEditChange = (e) => {
    const updatedLayanan = {
      ...editLayanan,
      [e.target.name]: e.target.value,
    };
    setEditLayanan(updatedLayanan);
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/layanan/${editLayanan.uuid}`, editLayanan);
      setEditLayanan({
        uuid: '',
        nama_layanan: '',
      });
      setShowMenu(false);
      toast.success('Layanan updated successfully!');
      dispatch(fetchLayanan()); // Ambil ulang data layanan setelah mengedit layanan
    } catch (error) {
      console.error(error);
      toast.error('Failed to update Layanan.');
    }
  };

  const confirmDeleteUser = async () => {
    console.log("sukses");
    
    try {
      toast.success('Layanan deleted successfully!');
      await axios.delete(`http://localhost:5000/layanan/${confirmDelete.uuid}`);
      dispatch(fetchLayanan()); // Ambil ulang data layanan setelah menghapus layanan
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete Layanan.');
    }finally {
      setConfirmDelete({ show: false, uuid: null });
    }
  };

  const viewADD = () => {
    setModal(!modal);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
  };

  const handleDeleteUser = (uuid) => {
    console.log(uuid);
    setConfirmDelete({ show: true, uuid });
  };

  // Handling loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {msg}</div>;
  }

  return (
    <div className="flex min-h-screen justify-between">
      
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

      <LayananList
        layanan={layanan}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handleMenu={handleMenu}
        handleDeleteUser={handleDeleteUser}
        viewADD={viewADD}
      />
      {modal && (
        <LayananForm
          Addlayanan={Addlayanan}
          handleNewLayananChange={handleNewLayananChange}
          handleAddLayanan={handleAddLayanan}
          closeModal={() => setModal(false)}
        />
      )}
      
      {showMenu && (
        <LayananModal
          editLayanan={editLayanan}
          handleEditChange={handleEditChange}
          handleEdit={handleEdit}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
};

export default Layanan;
