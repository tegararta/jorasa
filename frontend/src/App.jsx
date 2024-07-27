import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Beranda, Dashboard, Saran, DetailSaran, BuatSurvey, DataResponden, TentangKami, EditProfile, EditPassword } from './Pages';
import Sidebar from './Components/SidebarDiv';
import TopBar from './Components/TopBar';
import Survey from './Responden/Survey';
import DataDiri from './Responden/DataDiri';
import UnitKerja from './Pages/UnitKerja';
import LaporanSurvey from './Pages/LaporanSurvey';
import SurveyLink from './Pages/SurveyLink';

const Layout = ({ children }) => {
  return (
    <div className="flex h-auto">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <TopBar />
        <div className="flex-grow p-4 bg-gray-100 h-screen">
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
    element: <Layout><Dashboard /></Layout>
  },
  {
    path: "/editpassword",
    element: <Layout><EditPassword /></Layout>
  },
  {
    path: "/saran",
    element: <Layout><Saran /></Layout>,
  },
  {
    path: "/detailsaran",
    element: <Layout><DetailSaran /></Layout>,
  },
  {
    path: "/SurveyJoRasa",
    element: <Survey/>,
  },
  {
    path: "/survey",
    element: <DataDiri/>,
  },
  {
    path: "/buatsurvey",
    element: <Layout><BuatSurvey/></Layout>,
  },
  {
    path: "/unitkerja",
    element: <Layout><UnitKerja/></Layout>,
  },
  {
    path: "/dataresponden",
    element: <Layout><DataResponden/></Layout>,
  },
  {
    path: "/laporan-survey",
    element: <Layout><LaporanSurvey/></Layout>,
  },
  {
    path: "/SurveyLink",
    element: <Layout><SurveyLink/></Layout>,
  },
  {
    path: "/TentangKami",
    element: <TentangKami/>,
  },
]);

const App = () => {
  return (
    <div className='m-auto bg-white'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
