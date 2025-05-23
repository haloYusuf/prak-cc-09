// src/hooks/useAxiosInterceptor.js
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const useAxiosInterceptor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Contoh: Tambahkan header otorisasi hanya untuk permintaan ke API tertentu
        // Ganti '/api/secured' dengan prefix URL API Anda yang membutuhkan token
        if (config.url && config.url.startsWith('/api/secured')) {
          const token = localStorage.getItem('accessToken'); // Asumsikan Anda menyimpan token di localStorage
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        console.log(`[Axios Request] to ${config.url} from path: ${location.pathname}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Contoh: Redirect ke halaman login jika menerima status 401 Unauthorized
        // Pastikan ini tidak terjadi jika pengguna sudah di halaman login untuk menghindari loop
        if (error.response && error.response.status === 401 && location.pathname !== '/login') {
          console.log('[Axios Response Error] Unauthorized request, redirecting to login...');
          navigate('/login'); // Gunakan navigate dari React Router Dom untuk redirect
        }
        return Promise.reject(error);
      }
    );

    // Fungsi cleanup untuk menghapus interceptor saat komponen unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [location.pathname, navigate]); // Dependensi: aktifkan kembali hook jika pathname atau navigate berubah
};

export default useAxiosInterceptor;