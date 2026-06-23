// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    ...options.headers,
  };

  // Don't set Content-Type for FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Something went wrong');
  }

  return data;
};

// API methods
export const api = {
  // Admin
  admin: {
    login: (username, password) =>
      apiCall('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),
    verifyToken: () =>
      apiCall('/api/admin/verify-token'),
  },

  // Patients (Public)
  patients: {
    getAllPublic: () =>
      apiCall('/api/patients/public'),
    getOnePublic: (id) =>
      apiCall(`/api/patients/public/${id}`),
  },

  // Patients (Admin)
  adminPatients: {
    getAll: () =>
      apiCall('/api/patients'),
    getOne: (id) =>
      apiCall(`/api/patients/${id}`),
    create: (patientData) =>
      apiCall('/api/patients', {
        method: 'POST',
        body: JSON.stringify(patientData),
      }),
    update: (id, patientData) =>
      apiCall(`/api/patients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(patientData),
      }),
    delete: (id) =>
      apiCall(`/api/patients/${id}`, {
        method: 'DELETE',
      }),
  },

  // Site Content
  siteContent: {
    getStoryOfHope: () =>
      apiCall('/api/site-content/story-of-hope'),
    updateStoryOfHope: (data) =>
      apiCall('/api/site-content/story-of-hope', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Upload
  upload: {
    image: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return apiCall('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
    },
    video: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return apiCall('/api/upload/video', {
        method: 'POST',
        body: formData,
      });
    },
  },
};