import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login, Beranda, Dashboard, Saran, DetailSaran, BuatSurvey, DataResponden, TentangKami, EditPassword, LaporanSurvey, UnitKerja, Layanan, SurveyLink, ListSurvey } from './Pages';
import { Survey, DataDiri } from './Responden';
import SurveyPage from './Pages/SurveyPage';
import './App.css';
import { Layout } from './Components'; // Pastikan path benar

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/editpassword" element={<Layout><EditPassword /></Layout>} />
        <Route path="/saran" element={<Layout><Saran /></Layout>} />
        <Route path="/detailsaran" element={<Layout><DetailSaran /></Layout>} />
        <Route path="/SurveyJoRasa/:uuid" element={<SurveyPage />} />
        <Route path="/survey" element={<DataDiri />} />
        <Route path="/buatsurvey" element={<Layout><BuatSurvey /></Layout>} />
        <Route path="/unitkerja" element={<Layout><UnitKerja /></Layout>} />
        <Route path="/layanan" element={<Layout><Layanan /></Layout>} />
        <Route path="/dataresponden" element={<Layout><DataResponden /></Layout>} />
        <Route path="/laporan-survey" element={<Layout><LaporanSurvey /></Layout>} />
        <Route path="/SurveyLink" element={<Layout><SurveyLink /></Layout>} />
        <Route path="/TentangKami" element={<TentangKami />} />
        <Route path="/ListSurvey" element={<Layout><ListSurvey/></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
