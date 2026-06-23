import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, Edit, Trash2, LogOut, ArrowLeft, Heart, DollarSign, Activity, FileText } from 'lucide-react';
import { api } from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch patients from backend
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await api.adminPatients.getAll();
      setPatients(data);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin');
  };

  const totalRaised = patients.reduce((sum, p) => sum + (p.amountRaised || 0), 0);
  const totalNeeded = patients.reduce((sum, p) => sum + (p.amountNeeded || 0), 0);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await api.adminPatients.delete(id);
        // Remove from local state
        setPatients(patients.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete patient: ' + err.message);
      }
    }
  };

  return (
    <main className="min-h-screen bg-neutral-light">
      {/* Admin Nav */}
      <nav className="bg-white shadow-sm border-b border-neutral-light sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-neutral-gray hover:text-primary-dark transition-colors font-body text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                View Site
              </button>
              <h1 className="text-xl font-bold text-dark font-heading">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-body text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <Users className="w-8 h-8 text-primary-dark mb-3" />
            <p className="text-2xl font-bold text-dark font-heading">{patients.length}</p>
            <p className="text-neutral-gray font-body">Total Patients</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <DollarSign className="w-8 h-8 text-primary-dark mb-3" />
            <p className="text-2xl font-bold text-dark font-heading">{formatCurrency(totalRaised)}</p>
            <p className="text-neutral-gray font-body">Total Raised</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <Activity className="w-8 h-8 text-primary-dark mb-3" />
            <p className="text-2xl font-bold text-dark font-heading">{formatCurrency(totalNeeded)}</p>
            <p className="text-neutral-gray font-body">Total Needed</p>
          </motion.div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dark font-heading">All Patients</h2>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin/edit-content')}
              className="flex items-center gap-2 bg-primary-medium text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all font-body shadow-lg"
            >
              <FileText className="w-5 h-5" />
              Edit Site Content
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin/add-patient')}
              className="flex items-center gap-2 bg-primary-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all font-body shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Patient
            </motion.button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-gray font-body">Loading patients...</p>
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-neutral-gray mx-auto mb-3" />
              <p className="text-neutral-gray font-body">No patients yet. Add your first patient!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-light">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-dark font-body">Patient</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-dark font-body hidden md:table-cell">Cancer Type</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-dark font-body hidden md:table-cell">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-dark font-body hidden lg:table-cell">Raised</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-dark font-body hidden lg:table-cell">Needed</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-dark font-body">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-b border-neutral-light hover:bg-neutral-light transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={patient.image}
                            alt={patient.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-dark font-body">{patient.name}</p>
                            <p className="text-sm text-neutral-gray font-body">{patient.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="px-3 py-1 bg-primary-light rounded-full text-xs font-semibold text-primary-dark font-body">
                          {patient.cancerType}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${
                          patient.treatmentStatus === 'Urgent' 
                            ? 'bg-red-100 text-red-600' 
                            : patient.treatmentStatus === 'In Treatment'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {patient.treatmentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell text-dark font-body">
                        {formatCurrency(patient.amountRaised || 0)}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell text-dark font-body">
                        {formatCurrency(patient.amountNeeded || 0)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(`/admin/edit-patient/${patient.id}`)}
                            className="p-2 text-primary-dark hover:bg-primary-light rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(patient.id, patient.name)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;