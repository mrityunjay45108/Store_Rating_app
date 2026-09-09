import axios from 'axios';

const getBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // In production (Vercel deployment), default to deployed Render backend
  if (process.env.NODE_ENV === 'production') {
    return 'https://store-rating-app-dvad.onrender.com/api';
  }
  // In local development
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;