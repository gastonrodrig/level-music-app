import axios from 'axios';
import { BASE_URL } from '@env';

// Cliente Axios configurado con interceptores para manejar errores CORS
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📤 Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.message === 'Network Error') {
      console.error('🔴 CORS/Network Error - El backend rechazó la conexión');
      console.error('🔍 Verifica CORS en tu backend NestJS');
      console.error(`🌐 URL intentada: ${error.config?.url}`);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
