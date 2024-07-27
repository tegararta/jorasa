import React, { useState, useEffect } from 'react';

function UnitKerja() {
  const [unitKerja, setUnitKerja] = useState([]);
  const [editingUnitKerja, setEditingUnitKerja] = useState(null);
  const [newUnit, setNewUnit] = useState({ id: Date.now(), name: '', layanan: [''] });

  useEffect(() => {
    const storedUnitKerja = localStorage.getItem('unitKerja');
    if (storedUnitKerja) {
      const parsedUnitKerja = JSON.parse(storedUnitKerja).map(unit => ({
        ...unit,
        layanan: unit.layanan || []
      }));
      setUnitKerja(parsedUnitKerja);
    }
  }, []);

  const handleAddUnitKerja = () => {
    const updatedUnitKerja = [...unitKerja, newUnit];
    setUnitKerja(updatedUnitKerja);
    localStorage.setItem('unitKerja', JSON.stringify(updatedUnitKerja));
    setNewUnit({ id: Date.now(), name: '', layanan: [''] });
  };

  const handleInputChange = (e, id, index, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setUnitKerja(unitKerja.map(unit =>
        unit.id === id
          ? {
              ...unit,
              [name]: name === 'name' ? value : unit[name],
              layanan: name !== 'name' ? unit.layanan.map((layanan, idx) => idx === index ? value : layanan) : unit.layanan
            }
          : unit
      ));
    } else {
      if (name === 'name') {
        setNewUnit({ ...newUnit, [name]: value });
      } else {
        const newLayanan = [...newUnit.layanan];
        newLayanan[index] = value;
        setNewUnit({ ...newUnit, layanan: newLayanan });
      }
    }
  };

  const handleAddLayananField = (isEditing, id) => {
    if (isEditing) {
      setUnitKerja(unitKerja.map(unit =>
        unit.id === id
          ? { ...unit, layanan: [...unit.layanan, ''] }
          : unit
      ));
    } else {
      setNewUnit({ ...newUnit, layanan: [...newUnit.layanan, ''] });
    }
  };

  const handleSaveEdit = () => {
    setEditingUnitKerja(null);
    localStorage.setItem('unitKerja', JSON.stringify(unitKerja));
  };

  const handleEditUnitKerja = (id) => {
    setEditingUnitKerja(id);
  };

  const handleDeleteUnitKerja = (id) => {
    const updatedUnitKerja = unitKerja.filter(unit => unit.id !== id);
    setUnitKerja(updatedUnitKerja);
    localStorage.setItem('unitKerja', JSON.stringify(updatedUnitKerja));
  };

  return (
    <div className="container mx-auto p-4 bg-[#A8D1A1] rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Daftar Unit Kerja</h1>
      <div className="mb-4 bg-white p-4 rounded shadow-md">
        <input
          type="text"
          name="name"
          placeholder="Nama Unit Kerja"
          value={newUnit.name}
          onChange={(e) => handleInputChange(e)}
          className="border rounded px-2 py-1 mb-2 w-full"
        />
        {newUnit.layanan.map((layanan, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name={`layanan${index}`}
              placeholder={`Layanan ${index + 1}`}
              value={layanan}
              onChange={(e) => handleInputChange(e, null, index)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        ))}
        <div className="flex justify-between mt-2">
          <button onClick={() => handleAddLayananField(false)} className="bg-[#416829] hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
            Tambah Layanan
          </button>
          <button onClick={handleAddUnitKerja} className="bg-[#416829] hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
            Tambah Unit Kerja
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
          {unitKerja.map(unit => (
            <React.Fragment key={unit.id}>
              <tr>
                <td rowSpan={unit.layanan.length + 1} className="p-2 border-t">
                  {editingUnitKerja === unit.id ? (
                    <input
                      type="text"
                      name="name"
                      value={unit.name}
                      onChange={(e) => handleInputChange(e, unit.id, null, true)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    unit.name
                  )}
                </td>
                <td className="p-2 border-t">
                  {editingUnitKerja === unit.id ? (
                    unit.layanan.map((layanan, index) => (
                      <div key={index} className="mb-2">
                        <input
                          type="text"
                          name={`layanan${index}`}
                          value={layanan}
                          onChange={(e) => handleInputChange(e, unit.id, index, true)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </div>
                    ))
                  ) : (
                    unit.layanan.map((layanan, index) => (
                      <div key={index} className="mb-2">
                        {layanan}
                      </div>
                    ))
                  )}
                </td>
                <td rowSpan={unit.layanan.length + 1} className="p-2 border-t text-center">
                  {editingUnitKerja === unit.id ? (
                    <>
                      <div className="mb-2">
                        <button onClick={() => handleAddLayananField(true, unit.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                          Tambah Layanan
                        </button>
                      </div>
                      <button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-2 rounded">
                        Simpan
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditUnitKerja(unit.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteUnitKerja(unit.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Hapus
                      </button>
                    </>
                  )}
                </td>
              </tr>
              {/* Adding empty rows for each layanan */}
              {unit.layanan.map((_, index) => (
                <tr key={index}>
                  <td></td> {/* Empty cell for alignment */}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UnitKerja;
