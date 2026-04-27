import axios from 'axios';

const url = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Default to local backend if env variable not set
const api = axios.create({
    // backend run on 5000 port
    baseURL: 'url', 
    headers: {
    'Content-Type': 'application/json' 
} });

// Request Interceptor: Taaki har baar token manually na bhejna pade
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;