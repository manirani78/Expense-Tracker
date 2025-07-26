import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper to get token from localStorage and add auth header
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/auth/signin`, credentials);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/signup`, data);
  return res.data;
};

export const getExpenses = async () => {
  const res = await axios.get(`${API_URL}/expenses`, { headers: authHeader() });
  return res.data;
};

export const getExpenseById = async (id) => {
  const res = await axios.get(`${API_URL}/expenses/${id}`, { headers: authHeader() });
  return res.data;
};

export const addExpense = async (data) => {
  const res = await axios.post(`${API_URL}/expenses`, data, { headers: authHeader() });
  return res.data;
};

export const updateExpense = async (id, data) => {
  const res = await axios.put(`${API_URL}/expenses/${id}`, data, { headers: authHeader() });
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await axios.delete(`${API_URL}/expenses/${id}`, { headers: authHeader() });
  return res.data;
};
