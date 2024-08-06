import React, { useState, useEffect } from 'react';

function Layanan() {
  const [unitKerja, setUnitKerja] = useState([]);
  const [newLayanan, setNewLayanan] = useState({ id: Date.now(), layanan: [''] });
  const [userUnitKerja, setUserUnitKerja] = useState({});

  useEffect(() => {
    const storedUnitKerja = localStorage.getItem('unitKerja');
    if (storedUnitKerja) {
      const parsedUnitKerja = JSON.parse(storedUnitKerja);
      setUnitKerja(parsedUnitKerja);
    } else {
      const dummyUnitKerja = [
        {
          id: 1,
          name: 'Unit Kerja 1',
          layanan: ['Layanan 1', 'Layanan 2']
        },
        {
          id: 2,
          name: 'Unit Kerja 2',
          layanan: ['Layanan 3', 'Layanan 4']
        }
      ];
      setUnitKerja(dummyUnitKerja);
      localStorage.setItem('unitKerja', JSON.stringify(dummyUnitKerja));
    }

    // Simulasi pengambilan unit kerja dari user yang login
    const user = {
      id: 1,
      name: 'John Doe',
      unitKerja: {
        id: 1,
        name: 'Unit Kerja 1'
      }
    };
    setUserUnitKerja(user.unitKerja);
  }, []);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newLayananList = [...newLayanan.layanan];
    newLayananList[index] = value;
    setNewLayanan({ ...newLayanan, layanan: newLayananList });
  };

  const handleAddLayananField = () => {
    setNewLayanan({ ...newLayanan, layanan: [...newLayanan.layanan, ''] });
  };

  const handleSimpanLayanan = () => {
    const updatedUnitKerja = unitKerja.map(unit =>
      unit.id === userUnitKerja.id
        ? {
          ...unit,
          layanan: [...unit.layanan, ...newLayanan.layanan.filter(layanan => layanan !== '')]
        }
        : unit
    );

    // If the unit kerja doesn't exist in the table, add it
    if (!updatedUnitKerja.some(unit => unit.id === userUnitKerja.id)) {
      updatedUnitKerja.push({
        id: userUnitKerja.id,
        name: userUnitKerja.name,
        layanan: newLayanan.layanan.filter(layanan => layanan !== '')
      });
    }

    setUnitKerja(updatedUnitKerja);
    localStorage.setItem('unitKerja', JSON.stringify(updatedUnitKerja));
    setNewLayanan({ id: Date.now(), layanan: [''] });
  };

  const handleEditUnitKerja = (id) => {
    // handle edit logic here if needed
  };

  const handleDeleteUnitKerja = (id) => {
    const updatedUnitKerja = unitKerja.filter(unit => unit.id !== id);
    setUnitKerja(updatedUnitKerja);
    localStorage.setItem('unitKerja', JSON.stringify(updatedUnitKerja));
  };

  return (
    <div className="container mx-auto p-4 bg-[#A8D1A1] rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Daftar Layanan</h1>
      <div className="mb-4 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Unit Kerja yang Login</h2>
        <div className="mb-4">
          <p>{userUnitKerja.name}</p>
        </div>
        <h2 className="text-xl font-bold mb-2">Tambah Layanan</h2>
        {newLayanan.layanan.map((layanan, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name={`layanan${index}`}
              placeholder={`Layanan ${index + 1}`}
              value={layanan}
              onChange={(e) => handleInputChange(e, index)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        ))}
        <div className="flex justify-between mt-2">
          <button onClick={handleAddLayananField} className="bg-[#416829] hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
            Tambah Layanan
          </button>
          <button onClick={handleSimpanLayanan} className="bg-[#416829] hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
            Simpan Layanan
          </button>
        </div>
      </div>
      <table className="w-full mt-4 bg-white border-collapse rounded shadow-md">
        <thead>
          <tr>
            <th className="p-2 text-left bg-[#E9F4E7] border-b">Nama Unit Kerja</th>
            <th className="p-2 text-left bg-[#E9F4E7] border-b">Layanan</th>
            <th className="p-2 text-center bg-[#E9F4E7] border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {unitKerja.length > 0 ? (
            unitKerja.map(unit => (
              <React.Fragment key={unit.id}>
                <tr>
                  <td className="p-2 border-t">
                    {unit.name}
                  </td>
                  <td className="p-2 border-t">
                    {unit.layanan.map((layanan, index) => (
                      <div key={index} className="mb-2">
                        {layanan}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border-t text-center">
                    <button onClick={() => handleEditUnitKerja(unit.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUnitKerja(unit.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                      Hapus
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-2 text-center">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Layanan;
