import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Install library ini jika belum terinstal

const SurveyLink = () => {
  const surveyLink = 'https://example.com/survey'; // Ganti dengan link survei yang sebenarnya

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#FFFFFF] p-4 rounded-md shadow-lg text-center">
        <h2 className="text-lg font-bold mb-2 bg-[#A8D1A1] p-2 rounded-md" style={{ color: '#416829' }}>
          Link dan QR Code Survey
        </h2>
        <p className="mt-4">Berikut adalah link untuk mengakses survei Anda:</p>
        <a href={surveyLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {surveyLink}
        </a>
        <div className="flex justify-center mt-4 mb-4">
          <QRCode value={surveyLink} size={200} />
        </div>
      </div>
    </div>
  );
};

export default SurveyLink;
