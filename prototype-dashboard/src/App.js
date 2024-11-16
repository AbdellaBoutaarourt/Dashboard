import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHome from './Pages/DashboardHome';
import SubjectsPage from './Pages/SubjectsPage';
import DashboardLayout from './Pages/DashboardLayout';
import StatisticsPage from './Pages/StatisticsPage';
import StudentPage from './Pages/StudentPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <div className=" bg-gray-100 min-h-screen"> <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/login"
          element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          }
        />
        <Route
          path="/"
          element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          }
        />
        <Route
          path="/vakken"
          element={
            <DashboardLayout>
              <SubjectsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/students"
          element={
            <DashboardLayout>
              <StudentPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/statistieken"
          element={
            <DashboardLayout>
              <StatisticsPage />
            </DashboardLayout>
          }
        />

      </Routes>
    </Router >
    </div>


  );
}

export default App;
