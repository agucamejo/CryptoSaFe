//Configura un cliente Axios para realizar solicitudes HTTP a la API de baseURL
import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});

export const postTransaction = (transactionData) => {
  return apiClient.post('/transactions', transactionData); //Crea una transacción usando los datos recibidos
};

export const getTransactionsByUserId = (userId) => {
  return apiClient.get(`/transactions?q={"user_id": "${userId}"}`); //Obtiene todas las transacciones asociadas al ID de usuario que recibe
};

export const getTransactionDetails = (transactionId) => {
  return apiClient.get(`/transactions/${transactionId}`); //Obtener detalles de una transacción específica.
};

export const deleteTransaction = (transactionId) => {
  return apiClient.delete(`/transactions/${transactionId}`); //Elimina una transacción según su ID.
};

export const updateTransaction = (transactionId, updatedData) => {
  return apiClient.patch(`/transactions/${transactionId}`, updatedData); //Actualiza una transacción específica con los datos proporcionados.
};