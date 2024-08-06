import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Beranda, Dashboard, Saran, DetailSaran, BuatSurvey, DataResponden, TentangKami, EditPassword, LaporanSurvey, UnitKerja, SurveyLink } from './Pages';
import { Sidebar, TopBar } from './Components';
import { Survey, DataDiri } from './Responden';
import './App.css';
import { AuthProvider } from './auth/AuthContext'; // Pastikan path benar
import PrivateRoute from './auth/ProtectedRoute'; // Pastikan path benar

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar className="sidebar" />
      <div className="flex flex-col flex-grow">
        <TopBar className="topbar" />
        <div className="flex-grow p-4 bg-gray-100 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Beranda />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: (
        <Layout><Dashboard /></Layout>
    )
  },
  {
    path: "/editpassword",
    element: (
        <Layout><EditPassword /></Layout>
    )
  },
  {
    path: "/saran",
    element: (
        <Layout><Saran /></Layout>
    )
  },
  {
    path: "/detailsaran",
    element: (
        <Layout><DetailSaran /></Layout>
    )
  },
  {
    path: "/SurveyJoRasa",
    element: <Survey />
  },
  {
    path: "/survey",
    element: <DataDiri />
  },
  {
    path: "/buatsurvey",
    element: (
        <Layout><BuatSurvey /></Layout>
    )
  },
  {
    path: "/unitkerja",
    element: (
        <Layout><UnitKerja /></Layout>
    )
  },
  {
    path: "/dataresponden",
    element: (
        <Layout><DataResponden /></Layout>
    )
  },
  {
    path: "/laporan-survey",
    element: (
        <Layout><LaporanSurvey /></Layout>
    )
  },
  {
    path: "/SurveyLink",
    element: (
        <Layout><SurveyLink /></Layout>
    )
  },
  {
    path: "/TentangKami",
    element: <TentangKami />
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
