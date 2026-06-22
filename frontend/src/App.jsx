import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';
import Home from './pages/Home/Home';
import Donate from './pages/Donate/Donate';
import PatientDetails from './pages/PatientDetails/PatientDetails';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PatientForm from './pages/Admin/PatientForm';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected route component
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function App() {
  return (
    <PatientProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/add-patient" element={
            <ProtectedRoute>
              <PatientForm isEditing={false} />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-patient/:id" element={
            <ProtectedRoute>
              <PatientForm isEditing={true} />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </PatientProvider>
  );
}

export default App;