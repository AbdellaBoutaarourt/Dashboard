import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardHome from './Pages/DashboardHome';
import SubjectsPage from './Pages/SubjectsPage';
import DashboardLayout from './Pages/DashboardLayout';
import StatisticsPage from './Pages/StatisticsPage';
import StudentPage from './Pages/StudentPage';
import LoginPage from './Pages/LoginPage';
import AddPointPage from './Pages/AddPointPage';

function App() {

  const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
  return (
    <div className=" bg-gray-100 min-h-screen"> <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vakken"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SubjectsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StudentPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistieken"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StatisticsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-point"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddPointPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router >
    </div >


  );
}

export default App;
