import axios from 'axios';
import { getAuthToken } from '@/store/auth.store';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = getAuthToken();          // selector
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
