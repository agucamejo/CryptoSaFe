import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});

export const postTransaction = (transactionData) => {
  return apiClient.post('/transactions', transactionData);
};

export const getTransactionsByUserId = (userId) => {
  return apiClient.get(`/transactions?q={"user_id": "${userId}"}`);
};

export const getTransactionDetails = (transactionId) => {
  return apiClient.get(`/transactions/${transactionId}`);
};

export const deleteTransaction = (transactionId) => {
  return apiClient.delete(`/transactions/${transactionId}`);
};

export const updateTransaction = (transactionId, updatedData) => {
  return apiClient.patch(`/transactions/${transactionId}`, updatedData);
};