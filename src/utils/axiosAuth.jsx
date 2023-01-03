import axios from 'axios';


export const AxiosWithAuth = axios.create({
  headers: { 'authorization': `${localStorage.getItem('TOKEN')}` }
});