import axios from 'axios';

const api = axios.create(
{
    baseURL: 'http://10.0.0.103:1712'
});

export default api;