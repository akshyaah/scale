import axios from 'axios';

const api = axios.create({
  baseURL: '', // Proxied through Vite server configuration to http://localhost:5000
});

// Automatically inject JWT token into requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ==========================================
// AUTHENTICATION OPERATIONS
// ==========================================

export const authLogin = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const authMe = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

export const authLogout = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};

// ==========================================
// ADMIN DASHBOARD / STATS
// ==========================================

export const adminGetStats = async () => {
  const response = await api.get('/api/admin/stats');
  return response.data;
};

// ==========================================
// ADMIN OPPORTUNITY CRUD OPERATIONS
// ==========================================

export const adminGetOpportunities = async (params = {}) => {
  const response = await api.get('/api/admin/opportunities', { params });
  return response.data;
};

export const adminGetOpportunityById = async (id) => {
  const response = await api.get(`/api/admin/opportunities/${id}`);
  return response.data;
};

export const adminCreateOpportunity = async (data) => {
  const response = await api.post('/api/admin/opportunities', data);
  return response.data;
};

export const adminUpdateOpportunity = async (id, data) => {
  const response = await api.put(`/api/admin/opportunities/${id}`, data);
  return response.data;
};

export const adminDeleteOpportunity = async (id) => {
  const response = await api.delete(`/api/admin/opportunities/${id}`);
  return response.data;
};

// ==========================================
// ADMIN TREND CRUD OPERATIONS
// ==========================================

export const adminGetTrends = async (params = {}) => {
  const response = await api.get('/api/admin/trends', { params });
  return response.data;
};

export const adminCreateTrend = async (data) => {
  const response = await api.post('/api/admin/trends', data);
  return response.data;
};

export const adminUpdateTrend = async (id, data) => {
  const response = await api.put(`/api/admin/trends/${id}`, data);
  return response.data;
};

export const adminDeleteTrend = async (id) => {
  const response = await api.delete(`/api/admin/trends/${id}`);
  return response.data;
};

// ==========================================
// ADMIN FUNDING CRUD OPERATIONS
// ==========================================

export const adminGetFunding = async (params = {}) => {
  const response = await api.get('/api/admin/funding', { params });
  return response.data;
};

export const adminCreateFunding = async (data) => {
  const response = await api.post('/api/admin/funding', data);
  return response.data;
};

export const adminUpdateFunding = async (id, data) => {
  const response = await api.put(`/api/admin/funding/${id}`, data);
  return response.data;
};

export const adminDeleteFunding = async (id) => {
  const response = await api.delete(`/api/admin/funding/${id}`);
  return response.data;
};

// ==========================================
// ADMIN USER QUERIES OPERATIONS
// ==========================================

export const adminGetQueries = async () => {
  const response = await api.get('/api/admin/queries');
  return response.data;
};

export const adminDeleteQuery = async (id) => {
  const response = await api.delete(`/api/admin/queries/${id}`);
  return response.data;
};

// ==========================================
// PUBLIC OPERATIONS
// ==========================================

export const publicGetOpportunities = async (params = {}) => {
  const response = await api.get('/api/public/opportunities', { params });
  return response.data;
};

export const publicGetOpportunityById = async (id) => {
  const response = await api.get(`/api/public/opportunities/${id}`);
  return response.data;
};

export const publicGetTrends = async (params = {}) => {
  const response = await api.get('/api/public/trends', { params });
  return response.data;
};

export const publicGetFunding = async (params = {}) => {
  const response = await api.get('/api/public/funding', { params });
  return response.data;
};

export const publicSubmitQuery = async (data) => {
  const response = await api.post('/api/public/query', data);
  return response.data;
};

// ==========================================
// AI ENGINES
// ==========================================

export const publicAnalyzeStartup = async (data) => {
  const response = await api.post('/api/public/analyze-startup', data);
  return response.data;
};

export const publicPlanFinance = async (data) => {
  const response = await api.post('/api/public/plan-finance', data);
  return response.data;
};

export const publicOptimizeResource = async (data) => {
  const response = await api.post('/api/public/optimize-resource', data);
  return response.data;
};

// ==========================================
// CO-FOUNDER CHAT
// ==========================================

export const publicSendChatMessage = async (message, sessionId) => {
  const response = await api.post('/api/public/chat', { message, sessionId });
  return response.data;
};

export const publicGetChatHistory = async (sessionId) => {
  const response = await api.get(`/api/public/chat/history/${sessionId}`);
  return response.data;
};

export const publicClearChatHistory = async (sessionId) => {
  const response = await api.post(`/api/public/chat/clear/${sessionId}`);
  return response.data;
};

export default api;
