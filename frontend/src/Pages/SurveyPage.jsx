import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Survey from '../Responden/Survey';
import DataDiri from '../Responden/DataDiri';

const SurveyPage = () => {
  const { uuid } = useParams(); // Mengambil parameter uuid dari URL
  const [respondenData, setRespondenData] = useState(null);

  console.log(respondenData);
  

  return (
    <div>
      {!respondenData ? (
        <DataDiri urlSurvey={uuid} onSubmit={(data) => setRespondenData(data)} />
      ) : (
        <Survey urlSurvey={uuid} respondenData={respondenData} />
      )}
    </div>
  );
};

export default SurveyPage;
