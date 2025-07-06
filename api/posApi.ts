import axios from 'axios';

const posApi = axios.create({
    baseURL: '/api',
    withCredentials: false,  
});


export default posApi;