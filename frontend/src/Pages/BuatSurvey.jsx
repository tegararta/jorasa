import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

function BuatSurvey() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [surveyTitle, setSurveyTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempQuestion, setTempQuestion] = useState('');
  const navigate = useNavigate();

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, newQuestion]);
      setNewQuestion('');
    }
  };

  const editQuestion = (index) => {
    setEditingIndex(index);
    setTempQuestion(questions[index]);
  };

  const saveQuestion = (index) => {
    if (tempQuestion.trim() !== '') {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = tempQuestion;
      setQuestions(updatedQuestions);
      setTempQuestion('');
      setEditingIndex(null);
    }
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    if (editingIndex === index) {
      setEditingIndex(null);
      setTempQuestion('');
    }
  };

  const createSurvey = async () => {
    if (surveyTitle.trim() === '' || questions.length === 0) {
      alert('Judul survey dan pertanyaan tidak boleh kosong');
      return;
    }

    const uniqueUrl = uuidv4(); // Generate a unique URL

    const newSurvey = { 
      url: uniqueUrl, 
      judul: surveyTitle, 
      pertanyaan: questions 
    };

    try {
      const response = await axios.post('http://localhost:5000/survey/create', newSurvey, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        alert('Survey berhasil dibuat!');
        navigate('/listsurvey'); 
      } else {
        alert('Gagal membuat survey.');
      }
    } catch (error) {
      console.error('Error creating survey:', error);
      alert('Terjadi kesalahan saat membuat survey.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen container mx-auto gap-6 p-6">
      {/* Form Section */}
      <div className="bg-white mb-10 rounded-lg shadow-xl p-9 lg:w-1/2">
        <h2 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-[#4a993d] to-[#A8D1A1] p-2 rounded-md text-white">
          Form Buat Survey
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Masukkan Pertanyaan"
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-700"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button onClick={addQuestion} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out">
            Tambah Pertanyaan
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-lg shadow-xl p-6 lg:w-1/2">
        <h2 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-[#4a993d] to-[#A8D1A1] p-2 rounded-md text-white">
          Judul Survey
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Masukkan Judul Survey"
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-700"
            value={surveyTitle}
            onChange={(event) => setSurveyTitle(event.target.value)}
          />
        </div>
        <h2 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-[#A8D1A1] to-[#4a993d] p-2 rounded-md text-white">
          List Pertanyaan
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-relaxed'>
            <th className="border border-slate-600 py-3 px-6 text-center">No</th>  
            <th className="border border-slate-600 py-3 px-6 text-center">Pertanyaan</th>
            <th className="border border-slate-600 py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
            <tbody className='text-gray-600 '>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="border border-slate-700 py-3 px-6 text-center">{index + 1}.</td>
                  <td className="border border-slate-700 py-3 px-6 text-center">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={tempQuestion}
                        onChange={(event) => setTempQuestion(event.target.value)}
                        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-700"
                      />
                    ) : (
                      <p>{question}</p>
                    )}
                  </td>
                  <td className="border border-slate-700 py-3 px-6 text-center whitespace-nowrap">
                    {editingIndex === index ? (
                      <button onClick={() => saveQuestion(index)} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md">
                        Simpan
                      </button>
                    ) : (
                      <button onClick={() => editQuestion(index)} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md">
                        Edit
                      </button>
                    )}
                    <button onClick={() => deleteQuestion(index)} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td colSpan="3" className="border border-slate-700 py-3 px-6 text-center">Tidak ada pertanyaan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={createSurvey} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out">
            Buat Survey
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuatSurvey;
