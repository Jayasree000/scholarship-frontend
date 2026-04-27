import axios from 'axios';

// Get the backend URL depending on environment
// For local development, point to the Spring Boot default port 8081
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
