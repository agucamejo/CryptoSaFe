import axios from 'axios';

function apiClient() {
  return axios.create({
    baseURL: 'https://labor3-d60e.restdb.io/rest/',
    headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'}
  });
}

export default {
  login(credentials) {
    const { id } = credentials;
    
    return apiClient().post('/login', { user_id: id});
  },
};

