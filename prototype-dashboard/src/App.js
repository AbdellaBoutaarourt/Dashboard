import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHome from './Pages/DashboardHome';
import DashboardLayout from './Pages/DashboardLayout';

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
      </Routes>
    </Router>
  );
}

export default App;
