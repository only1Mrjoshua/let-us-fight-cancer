import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.admin.login(username, password);
      
      // Store token and login state
      localStorage.setItem('adminToken', response.access_token);
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminUsername', username);
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-gray hover:text-primary-dark transition-colors mb-8 font-body text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Site
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark font-heading">Admin Login</h1>
          <p className="text-neutral-gray font-body text-sm mt-2">
            Manage patients and donations
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-body"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-semibold text-dark mb-2 font-body">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark transition-colors font-body"
              placeholder="Enter username"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-2 font-body">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark transition-colors font-body pr-12"
                placeholder="Enter password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray hover:text-dark transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            className="w-full bg-primary-dark text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all font-body shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <p className="text-xs text-neutral-gray text-center mt-6 font-body">
          Secure admin access
        </p>
      </motion.div>
    </main>
  );
};

export default AdminLogin;