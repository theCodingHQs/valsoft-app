// utils/apiClient.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import storage from './auth';

const apiClient = axios.create({
  baseURL: 'https://valsoft.in/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach token
apiClient.interceptors.request.use(async (config) => {
  const token = await storage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default apiClient;
