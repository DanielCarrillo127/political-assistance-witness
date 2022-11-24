import axios from 'axios';
const token = localStorage.getItem('TOKEN');

export const AxiosWithAuth = axios.create({
  headers: { 'authorization': `${token}` }
});