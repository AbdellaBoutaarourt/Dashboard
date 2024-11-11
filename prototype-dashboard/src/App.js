import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHome from './Pages/DashboardHome';
import SubjectsPage from './Pages/SubjectsPage';
import DashboardLayout from './Pages/DashboardLayout';
import StatisticsPage from './Pages/StatisticsPage';


function App() {
  return (
    <Router>
      <Routes>
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
          path="/statistieken"
          element={
            <DashboardLayout>
              <StatisticsPage />
            </DashboardLayout>
          }
        />

      </Routes>
    </Router >
  );
}

export default App;
