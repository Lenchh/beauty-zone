import axios from 'axios';
import nProgress from 'nprogress';
import '../common/nprogress/nprogress-custom.css';
import { store } from '../featchers/store';
import { logOutUser } from '../featchers/slices/authSlice';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let activeRequests = 0;

instance.interceptors.request.use(
  (config) => {
    activeRequests++;
    if (activeRequests === 1) {
      nProgress.start();
    }
    if (!config.url?.includes('login') && !config.url?.includes('register')) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      nProgress.done();
    }
    return response;
  },
  (error) => {
    nProgress.done();
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.setItem('isSessionExpired', 'true');
      window.location.href = '#/login';
      store.dispatch(logOutUser());
    }
    return Promise.reject(error);
  }
);

export default instance;
