import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Survey() {
  const questions = [
    {
      text: 'Bagaimana pengalaman Anda dengan layanan kami?',
    },
    {
      text: 'Seberapa puas Anda dengan kecepatan respon tim kami?',
    },
    {
      text: 'Apakah Anda merekomendasikan layanan kami kepada orang lain?',
    },
  ];

  const saran = [
    {
      text: 'Kritik dan saran Anda untuk meningkatkan layanan kami',
      type: 'textarea',
    },
  ];

  const initialRatings = {};
  questions.forEach((_, index) => {
    initialRatings[index] = 3;
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ratings, setRatings] = useState(initialRatings);
  const [feedback, setFeedback] = useState('');
  const [suggestion, setSuggestion] = useState(''); // State for suggestion input
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (rating) => {
    setRatings({
      ...ratings,
      [currentQuestion]: rating,
    });
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const resetRating = () => {
    if (currentQuestion < questions.length) {
      setRatings({
        ...ratings,
        [currentQuestion]: 3,
      });
    } else {
      setSuggestion('');
    }
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSuggestionChange = (event) => {
    setSuggestion(event.target.value);
  };

  const collectResults = () => {
    const results = {
      ratings: ratings,
      feedback: feedback,
      suggestion: suggestion, // Include suggestion in the results
    };
    console.log('Survey Results:', results);
  };

  const submitSurvey = () => {
    collectResults();
    setIsSubmitted(true);
    // Uncomment the code below if you want to reset the form after submission
    // setTimeout(() => {
    //   setIsSubmitted(false);
    //   setRatings(initialRatings); 
    //   setFeedback('');
    //   setSuggestion('');
    //   setCurrentQuestion(0);
    // }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#A8D1A1]">
        {isSubmitted ? (
            <div className="text-center">
              <img src="assets/sukses.png" alt="Success" className="mx-auto mb-4" />
              <div className="bg-[#416829] text-white px-4 py-3 rounded-full relative" role="alert">
                <strong className="font-medium">Jawaban Anda berhasil disimpan, terima kasih!</strong>
              </div>
            </div>  
        ) : (
          <div className="bg-white p-4 rounded-lg shadow">
            {currentQuestion < questions.length ? (
              <>
                <h2 className="text-lg font-medium mb-2 text-center">
                  {questions[currentQuestion].text}
                </h2>

                <div className="flex items-center justify-center">
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
                  {currentQuestion < questions.length - 1 ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      onClick={nextQuestion}
                    >
                      Selanjutnya
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      onClick={nextQuestion} // Go to the suggestion input
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
                  {saran[0].text}
                </h2>
                <textarea
                  className="w-full p-2 border rounded-md resize-none"
                  rows="4"
                  value={suggestion}
                  onChange={handleSuggestionChange}
                />
                <div className="mt-4 flex justify-center">
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
    </div>
  );
}

export default Survey;