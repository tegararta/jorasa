import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Notifikasi from '../Components/Notifikasi/Notifikasi';
import LayananList from '../Components/Layanan/LayananList';
import LayananForm from '../Components/Layanan/LayananForm';
import LayananModal from '../Components/Layanan/Modal/LayananModal';

const Layanan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [layanan, setLayanan] = useState([]);
  const [Addlayanan, setAddLayanan] = useState({
    nama_layanan: '',
  });
  const [editLayanan, setEditLayanan] = useState({
    uuid: '',
    nama_layanan: '',
  });
  const [modal, setModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const getLayanan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/layanan');
      setLayanan(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      toast.success('Layanan added successfully!');
      getLayanan();
      setModal(false); // Close modal after adding Layanan
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
      getLayanan();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update Layanan.');
    }
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm("Anda yakin ingin menghapus Layanan ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/layanan/${uuid}`);
        toast.success('Layanan deleted successfully!');
        getLayanan();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete Layanan.');
      }
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

  useEffect(() => {
    getLayanan();
  }, []);

  return (
    <div className="flex min-h-screen justify-between">
      <LayananList
        layanan={layanan}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handleMenu={handleMenu}
        handleDelete={handleDelete}
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
      <Notifikasi />
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
