import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBars } from '@fortawesome/free-solid-svg-icons';

function Survey({ urlSurvey, respondenData }) {
  const [surveyData, setSurveyData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ratings, setRatings] = useState({});
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/survey/${urlSurvey}`);
        setSurveyData(response.data);

        // Initialize ratings for each question
        const initialRatings = {};
        response.data.pertanyaans.forEach((_, index) => {
          initialRatings[index] = 3;
        });
        setRatings(initialRatings);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData();
  }, [urlSurvey]);

  const handleRatingChange = (rating) => {
    setRatings({
      ...ratings,
      [currentQuestion]: rating,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < surveyData.pertanyaans.length) {
        setCurrentQuestion(currentQuestion + 1);
    }
};


  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetRating = () => {
    if (currentQuestion < surveyData.pertanyaans.length) {
      setRatings({
        ...ratings,
        [currentQuestion]: 3,
      });
    } else {
      setSuggestion('');
    }
  };

  const handleSuggestionChange = (event) => {
    setSuggestion(event.target.value);
  };

  const collectResults = () => {
    const results = {
      nama: respondenData.nama,
      nohp: respondenData.nohp,
      usia: respondenData.usia,
      layanan: respondenData.layanan,
      id_survey: respondenData.id_survey,
      user: respondenData.user,
      ratings: ratings,
      suggestion: suggestion,
    };

    return results;
  };

  const submitSurvey = async () => {
    const results = collectResults();
  
    console.log(results);
    // Validasi data
    if (!results.nama || !results.nohp || !results.usia || !results.layanan || !results.id_survey) {
      console.error('Data responden tidak lengkap');
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/responden/create', results, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
  
      // Menampilkan pesan kesalahan
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
      }
    }
  };
  

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  };

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#A8D1A1]">
      {isSubmitted ? (
        <div className="text-center">
          <img src="assets/sukses.png" alt="Success" className="mx-auto mb-4" />
          <div className="bg-[#416829] text-white px-4 py-3 rounded-full relative" role="alert">
            <strong className="font-medium">Jawaban Anda berhasil disimpan, terima kasih!</strong>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow mt-4">
          <button onClick={togglePopup} className="mb-4">
            <FontAwesomeIcon icon={faBars} className="text-2xl text-gray-800" />
          </button>
          <h1 className="text-lg font-bold">Kondisi Pelayanan</h1>
          {currentQuestion < surveyData.pertanyaans.length ? (
            <>
              <h2 className="text-lg font-medium mb-2 text-center">
                {surveyData.pertanyaans[currentQuestion].pertanyaan}
              </h2>

              <div className="flex items-center justify-center mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label
                    key={rating}
                    className={`cursor-pointer mr-4 ${
                      ratings[currentQuestion] >= rating
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`rating-${currentQuestion}`}
                      value={rating}
                      checked={ratings[currentQuestion] === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="hidden"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className={`${
                        ratings[currentQuestion] >= rating
                          ? 'text-yellow-500'
                          : 'text-gray-400'
                      } text-2xl`}
                    />
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                {currentQuestion > 0 && (
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={prevQuestion}
                  >
                    Sebelumnya
                  </button>
                )}
                {currentQuestion < surveyData.pertanyaans.length - 1 ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={nextQuestion}
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={nextQuestion}
                  >
                    Selanjutnya
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={resetRating}
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-medium mb-2 text-center">
                Kritik dan saran Anda untuk meningkatkan layanan kami
              </h2>
              <textarea
                className="w-full p-2 border rounded-md resize-none mb-4"
                rows="4"
                value={suggestion}
                onChange={handleSuggestionChange}
              />
              <div className="flex justify-center">
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={prevQuestion}
                >
                  Sebelumnya
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={submitSurvey}
                >
                  Kirim
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={resetRating}
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Popup Data Diri */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Data Diri</h2>
            <ul>
              <li><strong>Nama         :</strong> {respondenData.nama}</li>
              <li><strong>No HP        :</strong> {respondenData.noHp}</li>
              <li><strong>Umur         :</strong> {respondenData.umur}</li>
              <li><strong>Jenis kelamin:</strong> {respondenData.jenisKelamin}</li>
              <li><strong>Layanan      :</strong> {respondenData.layanan}</li>
            </ul>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={togglePopup}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;
