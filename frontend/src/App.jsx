import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';
import Home from './pages/Home/Home';
import Donate from './pages/Donate/Donate';
import PatientDetails from './pages/PatientDetails/PatientDetails';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PatientForm from './pages/Admin/PatientForm';
import EditSiteContent from './pages/Admin/EditSiteContent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const token = localStorage.getItem('adminToken');
  
  if (!isLoggedIn || !token) {
    // Clear any stale data
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          
          {/* Admin Routes */}
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
          <Route path="/admin/edit-content" element={
            <ProtectedRoute>
              <EditSiteContent />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </PatientProvider>
  );
}

export default App;