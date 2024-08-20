import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

function DataResponden() {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState(new Set());

  useEffect(() => {
    // Fetch user data from your database
    // fetch('/api/users') 
    //   .then(response => response.json())
    //   .then(data => setUsers(data));

    const dummyUsers = [
      { id: 1, name: 'Agnes Graham', age: 25, phone: '08123456789', gender: 'Perempuan', service: 'Layanan A', unit: 'Unit 1', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Amos Nienow', age: 30, phone: '08234567890', gender: 'Laki-laki', service: 'Layanan B', unit: 'Unit 2', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, name: 'Archie Kertzmann', age: 28, phone: '08545678901', gender: 'Laki-laki', service: 'Layanan A', unit: 'Unit 3', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 4, name: 'Carla Emmerich', age: 27, phone: '08356789012', gender: 'Perempuan', service: 'Layanan C', unit: 'Unit 1', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 5, name: 'Chelsea Barton I', age: 29, phone: '08767890123', gender: 'Perempuan', service: 'Layanan B', unit: 'Unit 2', avatar: 'https://i.pravatar.cc/150?img=5' },
      // Add more dummy users here...
    ];
    setUsers(dummyUsers);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    if (checked) {
      setCheckedUsers(new Set(currentUsers.map(user => user.id)));
    } else {
      setCheckedUsers(new Set());
    }
  };

  const handleCheckboxChange = (userId) => {
    const newCheckedUsers = new Set(checkedUsers);
    if (newCheckedUsers.has(userId)) {
      newCheckedUsers.delete(userId);
    } else {
      newCheckedUsers.add(userId);
    }
    setCheckedUsers(newCheckedUsers);
    setAllChecked(currentUsers.length === newCheckedUsers.size);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#FFFFFF] p-4 rounded-md mb-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Data Responden</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search user..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:ring-1"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 font-bold text-center">Name</th>
              <th className="p-3 font-bold text-center">Umur</th>
              <th className="p-3 font-bold text-center">No. Telp</th>
              <th className="p-3 font-bold text-center">Jenis Kelamin</th>
              <th className="p-3 font-bold text-center">Layanan</th>
              {user && user.role === "admin" && (
                <th className="p-3 font-bold text-center">Unit Kerja</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td className="p-3 text-center">{user.name}</td>
                <td className="p-3 text-center">{user.age}</td>
                <td className="p-3 text-center">{user.phone}</td>
                <td className="p-3 text-center">{user.gender}</td>
                <td className="p-3 text-center">{user.service}</td>
                {user && user.role === "admin" && (

                  <td className="p-3 text-center">{user.unit}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Rows per page:
            <select className="ml-2">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </p>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-l-md text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="px-3 py-2">{`${currentPage} of ${Math.ceil(filteredUsers.length / usersPerPage)}`}</span>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-r-md text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataResponden;
