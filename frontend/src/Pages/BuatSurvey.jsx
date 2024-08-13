import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const createSurvey = () => {
    if (surveyTitle.trim() === '' || questions.length === 0) {
      alert('Judul survey dan pertanyaan tidak boleh kosong');
      return;
    }

    const newSurvey = { title: surveyTitle, questions };
    const storedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    localStorage.setItem('surveys', JSON.stringify([...storedSurveys, newSurvey]));

    navigate('/listsurvey'); // Arahkan ke halaman daftar survey
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen container mx-auto gap-6 p-6">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-xl p-6 lg:w-1/2">
        <h2 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-green-500 to-rose-700 p-2 rounded-md text-white">
          Form Buat Survey
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
        <h2 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-red-700 to-red-900 p-2 rounded-md text-white">
          List Pertanyaan
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center w-1/12">{index + 1}.</td>
                  <td className="py-2 px-4 border-b w-10/12">
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
                  <td className="py-2 px-4 border-b w-1/12 flex justify-end space-x-2">
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
                  <td colSpan="3" className="py-2 px-4 border-b text-center">Tidak ada pertanyaan.</td>
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
