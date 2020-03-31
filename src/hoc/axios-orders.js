import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger-a3bdd.firebaseio.com/'
});

export default axiosInstance;