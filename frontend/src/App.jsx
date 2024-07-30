import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Beranda, Dashboard, Saran, DetailSaran, BuatSurvey, DataResponden, TentangKami, EditProfile, EditPassword, LaporanSurvey, UnitKerja, SurveyLink } from './Pages';
import { Sidebar, TopBar } from './Components';
import { Survey, DataDiri } from './Responden';
import './App.css';
import { AuthProvider } from '../src/auth/AuthContext';
import PrivateRoute from '../src/auth/ProtectedRoute';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar className="sidebar " />
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
      <PrivateRoute>
        <Layout><Dashboard /></Layout>
      </PrivateRoute>
    )
  },
  {
    path: "/editpassword",
    element: (
      <PrivateRoute>
        <Layout><EditPassword /></Layout>
      </PrivateRoute>
    )
  },
  {
    path: "/saran",
    element: (
      <PrivateRoute>
        <Layout><Saran /></Layout>
      </PrivateRoute>
    )
  },
  {
    path: "/detailsaran",
    element: (
      <PrivateRoute>
        <Layout><DetailSaran /></Layout>
      </PrivateRoute>
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
      <PrivateRoute>
        <Layout><BuatSurvey /></Layout>
      </PrivateRoute>
    )
  },
  {
    path: "/unitkerja",
    element: (
      <PrivateRoute>
        <Layout><UnitKerja /></Layout>
      </PrivateRoute>
    )
  },
  {
    path: "/dataresponden",
    element: (
      <PrivateRoute>
        <Layout><DataResponden /></Layout>
      </PrivateRoute>
    )
  },
  {
    path: "/laporan-survey",
    element: (
      <PrivateRoute>
        <Layout><LaporanSurvey /></Layout>
      </PrivateRoute>
    )
  },
  {
    path: "/SurveyLink",
    element: (
      <PrivateRoute>
        <Layout><SurveyLink /></Layout>
      </PrivateRoute>
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
      <div className='m-auto bg-white'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;