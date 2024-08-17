import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Survey from '../Responden/Survey';
import { DataDiri } from '../Responden';

const SurveyPage = () => {
  const { uuid } = useParams(); // Mengambil parameter uuid dari URL
  const [respondenData, setRespondenData] = useState(null);

  

  return (
    <div>
      {!respondenData ? (
        <DataDiri surveyUuid={uuid} onSubmit={(data) => setRespondenData(data)} />
      ) : (
        <Survey surveyUuid={uuid} respondenData={respondenData} />
      )}
    </div>
  );
};

export default SurveyPage;
