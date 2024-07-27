import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BuatSurvey() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempQuestion, setTempQuestion] = useState('');
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, { question: newQuestion }]);
      setNewQuestion('');
    }
  };

  const editQuestion = (index) => {
    setEditingIndex(index);
    setTempQuestion(questions[index].question);
  };

  const saveQuestion = (index) => {
    if (tempQuestion.trim() !== '') {
      const updatedQuestions = [...questions];
      updatedQuestions[index].question = tempQuestion;
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

  const createSurvey = () => {
    // Logika pembuatan survey
    navigate('/SurveyLink'); // Arahkan ke halaman link QR code
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#FFFFFF] p-4 rounded-md mb-4 shadow-lg">
        <h2 className="text-lg font-bold text-center mb-2 bg-[#A8D1A1] p-2 rounded-md" style={{ color: '#416829' }}>
          Form Buat Survey
        </h2>
        <div className="mb-4 mt-5">
          <input
            type="text"
            placeholder="Masukkan Pertanyaan"
            className="border rounded-md py-2 px-3 w-full"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button onClick={addQuestion} className="bg-[#416829] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
            Tambah Pertanyaan
          </button>
        </div>
      </div>
      <div className="bg-[#FFFFFF] p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-center bg-[#A8D1A1] p-2 rounded-md" style={{ color: '#416829' }}>List Pertanyaan</h2>
        <table className="min-w-full bg-white">
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={tempQuestion}
                      onChange={(event) => setTempQuestion(event.target.value)}
                      className="border rounded-md py-2 px-3 w-full"
                    />
                  ) : (
                    <p>{question.question}</p>
                  )}
                </td>
                <td className="py-2 px-4 border-b flex justify-end space-x-2">
                  {editingIndex === index ? (
                    <button onClick={() => saveQuestion(index)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                      Simpan
                    </button>
                  ) : (
                    <button onClick={() => editQuestion(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                      Edit
                    </button>
                  )}
                  <button onClick={() => deleteQuestion(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td colSpan="2" className="py-2 px-4 border-b text-center">Tidak ada pertanyaan.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button onClick={createSurvey} className="bg-[#416829] hover:bg-[#000000] text-white font-bold py-2 px-4 rounded-full">
            Buat Survey
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuatSurvey;
