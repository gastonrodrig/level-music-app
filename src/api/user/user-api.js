import { apiClient } from '../../shared/utils/api-client';

export const userApi = {
  get: (url, config) => apiClient.get(`/user/${url}`, config),
  post: (url, data, config) => apiClient.post(`/user/${url}`, data, config),
  put: (url, data, config) => apiClient.put(`/user/${url}`, data, config),
  delete: (url, config) => apiClient.delete(`/user/${url}`, config),
};
