import axios from 'axios';
import { BASE_URL } from '../constant';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

export default axiosInstance;