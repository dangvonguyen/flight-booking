import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 giây
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface RequestConfig {
  params?: Record<string, any>;
  responseType?: 'json' | 'blob';
}

// Các hàm helper
export const get = <T>(url: string, config?: RequestConfig): Promise<T> => {
  return api.get(url, config);
};

export const post = <T>(url: string, data: any, config?: RequestConfig): Promise<T> => {
  return api.post(url, data, config);
};

export const put = <T>(url: string, data: any, config?: RequestConfig): Promise<T> => {
  return api.put(url, data, config);
};

export const del = <T>(url: string, config?: RequestConfig): Promise<T> => {
  return api.delete(url, config);
};

// Custom error handler
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Lỗi từ API
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra';
    return errorMessage;
  }
  // Lỗi khác
  return 'Có lỗi xảy ra, vui lòng thử lại sau';
};

export default api; 